import { View, Text, Image, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image
        source={require("../../assets/profile.jpeg")}
        style={styles.image}
      />

        <Text style={styles.name}>Novry Nanda</Text>
        <Text style={styles.subtitle}>D3 Sistem Informasi</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>NIM</Text>
          <Text style={styles.value}>2410501123</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Kelas</Text>
          <Text style={styles.value}>A</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Tema</Text>
          <Text style={styles.value}>ResepKita</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>API Credit</Text>
        <Text style={styles.api}>www.themealdb.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",

    elevation: 5, // shadow android
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "gray",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 3,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    color: "#333",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  api: {
    color: "blue",
    marginTop: 3,
  },
});