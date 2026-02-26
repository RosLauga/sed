import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CardBarProps {
  data: {
    id: string;
    name: string;
    description: string;
    image?: string;
  };
}

export default function CardBar({ data }: CardBarProps) {
  const router = useRouter();

  //   const handlePress = () => {
  //     router.push(`/modal?id=${data.id}`);
  //   };

  return (
    <TouchableOpacity
      style={styles.card}
      //   onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: data.image || "https://via.placeholder.com/100",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
