import BarDetail from "@/components/barDetail/bar-detail";
import getPlaceDetails from "@/hooks/places/detail-place";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function ModalScreen() {
  const [details, setDetails] = useState<any>();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      try {
        async function fetchDetails() {
          const detailData = await getPlaceDetails(id);
          setDetails(detailData);
        }
        fetchDetails();
      } catch (error) {
        throw new Error(`Error fetching place details: ${error}`);
      }
    }
  }, []);

  return (
    <>
      {!details ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <BarDetail key={details.id} data={details} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
