import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function FavoritesScreen() {
  const { state, dispatch } = useContext(FavoritesContext);

  const favorites = state.favorites;

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Belum ada favorit</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.strMealThumb }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.strMeal}</Text>

            {/* 🔥 tombol hapus */}
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                dispatch({
                  type: "REMOVE",
                  payload: item.idMeal,
                })
              }
            >
              <Text style={styles.buttonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});