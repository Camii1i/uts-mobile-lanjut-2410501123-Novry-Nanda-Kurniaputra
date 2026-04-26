import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
  } from "react-native";
  import { useEffect, useState } from "react";
  
  export default function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const json = await res.json();
  
        setData(json.categories);
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchData();
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
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Browse", {
                category: item.strCategory,
              })
            }
          >
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.strCategory}</Text>
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
      flex: 1,
      margin: 8,
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
  
      elevation: 3,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    title: {
      marginTop: 8,
      fontWeight: "bold",
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });