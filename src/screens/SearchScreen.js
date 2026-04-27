import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async () => {
    // 🔥 VALIDASI
    if (!query || query.length < 3) {
      setErrorMsg("Minimal 3 karakter");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const json = await res.json();

      setData(json.meals || []);
    } catch (err) {
      setErrorMsg("Gagal mencari data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari resep..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <Button title="Cari" onPress={handleSearch} />

      {/* 🔥 error validasi */}
      {errorMsg !== "" && <Text style={styles.error}>{errorMsg}</Text>}

      {loading && <ActivityIndicator />}

      <FlatList
        data={data}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Detail", { id: item.idMeal })
            }
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.image}
              />
              <Text>{item.strMeal}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
  error: {
    color: "red",
    marginVertical: 5,
  },
  card: {
    flexDirection: "row",
    marginVertical: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
});