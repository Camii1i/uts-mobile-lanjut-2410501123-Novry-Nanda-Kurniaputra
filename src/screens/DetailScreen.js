import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function DetailScreen({ route }) {
  const { id } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const json = await res.json();

      setData(json.meals[0]);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = () => {
    let list = [];

    for (let i = 1; i <= 20; i++) {
      const ing = data[`strIngredient${i}`];
      const meas = data[`strMeasure${i}`];

      if (ing && ing.trim() !== "") {
        list.push(`${ing} - ${meas}`);
      }
    }

    return list;
  };
  
  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text>Gagal memuat data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: data.strMealThumb }} style={styles.image} />

      <Text style={styles.title}>{data.strMeal}</Text>

      <Text style={styles.subtitle}>
        {data.strCategory} - {data.strArea}
      </Text>

      <Text style={styles.section}>Bahan:</Text>
      {getIngredients().map((item, index) => (
        <Text key={index}>• {item}</Text>
      ))}

      <Text style={styles.section}>Instruksi:</Text>
      <Text>{data.strInstructions}</Text>

      {/* 🔥 tombol favorit */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          dispatch({
            type: "ADD",
            payload: data,
          })
        }
      >
        <Text style={styles.buttonText}>Tambah ke Favorit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    color: "gray",
    marginBottom: 10,
  },
  section: {
    fontWeight: "bold",
    marginTop: 10,
  },
  button: {
    backgroundColor: "orange",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});