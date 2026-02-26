import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default async function getLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});

      setLocation(loc);
    }

    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) text = errorMsg;
  else if (location) text = JSON.stringify(location);
  console.log(location);
  return location;
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
