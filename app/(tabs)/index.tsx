import CardBar from "@/components/card-bar/card-bar";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Datos de ejemplo - reemplaza con tus datos reales
  const featuredBars = [
    { id: "1", name: "Bar 1", description: "Descripción 1" },
    { id: "2", name: "Bar 2", description: "Descripción 2" },
    { id: "3", name: "Bar 3", description: "Descripción 3" },
  ];

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeTitle}>¡Bienvenido a Sed!</Text>
        <Text style={styles.subtitle}>
          Explora los mejores lugares de Rosario para tomar algo.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Destacados del día de hoy</Text>
        {featuredBars.length === 0 ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{
              margin: 100,

              alignItems: "center",
            }}
          />
        ) : (
          <FlatList
            data={featuredBars}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => <CardBar data={item} />}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 8,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
});
