import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import colorsGuide from "../config/colorsGuide";
import axios from "axios";
import { useSelector } from "react-redux";
import MovieItem from "../components/MovieItem";
import CustomButton from "../components/CustomButton";

const Favorites = ({ navigation }) => {
  const [allMovies, setallMovies] = useState([]);
  const [favoritesMovies, setFavoritesMovies] = useState([]);
  const [moviesFetchFlag, setmMviesFetchFlag] = useState(false);
  const ids = useSelector((state) => state.favorites.ids);

  const getAllMovies = async () => {
    const res = await axios(
      "https://api.themoviedb.org/3/movie/popular?api_key=247082c0fd9674d69377c506d2b38e04&amp;amp;language=en-US&amp;amp;page=1"
    );
    setallMovies(res.data.results);
    setFavoritesMovies(allMovies.filter((item) => ids.includes(item.id)));
    setmMviesFetchFlag(true);
  };

  const renderItem = ({ item }) => {
    return (
      <MovieItem
        key={item.id}
        name={item?.original_title}
        poster={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
        onPress={() => {
          navigation.navigate("MovieDetails", fintMovieById(item?.id));
        }}
      />
    );
  };

  const fintMovieById = (id) => {
    return allMovies.filter((item) => item?.id === id);
  };

  useEffect(() => {
    getAllMovies();
  }, [moviesFetchFlag]);

  return (
    <View style={styles.container}>
      {favoritesMovies?.length > 0 ? (
        <>
          <Text style={styles.text}>YOUR FAVORITES</Text>
          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={favoritesMovies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>NO FAVORITES MOVIES PLEASE ADD..</Text>
          <View style={styles.buttonsContainer}>
            <CustomButton
              style={{
                borderWidth: 1,
                borderColor: colorsGuide.white,
              }}
              color={colorsGuide.black}
              title="Go To Movies List"
              icon="list"
              backgroundColor={colorsGuide.white}
              iconSize={20}
              onPress={() => navigation.navigate("MoviesList")}
            />
            <CustomButton
              color="white"
              title="Go Home"
              icon="home"
              backgroundColor={colorsGuide.blackWithOpacity}
              iconSize={20}
              onPress={() => navigation.navigate("Home")}
              style={{ borderColor: colorsGuide.white, borderWidth: 1 }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorsGuide.black,
    paddingTop: 80,
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "80%",
    paddingVertical: 40,
    display: "flex",
    justifyContent: "space-between",
  },
});
