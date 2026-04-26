import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import { useEffect, useState } from "react";
  
  export default function BrowseScreen({ route, navigation }) {
    const { category } = route.params;
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const json = await res.json();
  
        setData(json.meals);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }
  
    if (error) {
      return (
        <View style={styles.center}>
          <Text>Gagal memuat data</Text>
        </View>
      );
    }
  
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Detail", {
                id: item.idMeal,
              })
            }
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    card: {
      marginBottom: 12,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      elevation: 3,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 10,
    },
    title: {
      marginLeft: 10,
      fontWeight: "bold",
      flexShrink: 1,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });