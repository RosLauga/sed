import { GOOGLE_API_KEY } from "@/constants/env";
import { Image, StyleSheet, Text, View } from "react-native";

export default function BarDetail({ data }: any) {
  const photoUrl =
    `https://places.googleapis.com/v1/${data.photos[0].name}/media` +
    `?maxWidthPx=800&key=${GOOGLE_API_KEY}`;

  const openStatus = data.regularOpeningHours.openNow;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUrl }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text style={styles.title}>{data.displayName.text}</Text>
      <Text style={openStatus ? styles.openStatus : styles.closeStatus}>
        {openStatus ? "Abierto" : "Cerrado"}
      </Text>
      <Text style={styles.address}>{data.formattedAddress}</Text>
      {data.regularOpeningHours.weekdayDescriptions.map(
        (h: string, i: number) => (
          <Text key={i}>{h}</Text>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: "#666",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  openStatus: {
    fontSize: 14,
    backgroundColor: "#15802e",
    marginBottom: 10,
    textAlign: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    maxWidth: 100,
    fontWeight: "bold",
    color: "#fff",
  },
  closeStatus: {
    fontSize: 14,
    backgroundColor: "#ac1f2d",
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 1,
    textAlign: "center",
    maxWidth: 100,
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
