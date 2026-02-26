import placesGoogle from "@/hooks/places/places-google";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type ScreenMarker = {
  id: string;
  x: number;
  y: number;
  place: any;
};

export default function TabTwoScreen() {
  const [places, setPlaces] = useState<any[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const mapRef = useRef<MapView>(null);
  const [screenMarkers, setScreenMarkers] = useState<ScreenMarker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const router = useRouter();
  const [mapSize, setMapSize] = useState({
    width: 0,
    height: 0,
  });

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission denied");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    console.log("Location", loc);
    setLocation(loc);
  }
  useEffect(() => {
    async function fetchLocation() {
      await getCurrentLocation();
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    if (mapReady) {
      updateVisibleMarkers();
    }
  }, [mapReady]);

  useEffect(() => {
    function mapChange() {
      if (mapReady) {
        updateVisibleMarkers();
      }
    }
    mapChange();
  }, [mapReady, places]);

  useEffect(() => {
    if (location !== null) {
      async function fetchPlaces() {
        try {
          const response = await placesGoogle(
            location?.coords.latitude as number,
            location?.coords.longitude as number,
          );
          setPlaces(response);
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      }
      fetchPlaces();
    }
  }, [location]);

  const handleMarkerClick = (marker: any) => {
    router.push({
      pathname: "/modal",
      params: { id: String(marker.id) },
    });
  };

  function projectToScreen(
    lat: number,
    lng: number,
    bounds: any,
    size: { width: number; height: number },
  ) {
    const latRange = bounds.northEast.latitude - bounds.southWest.latitude;

    const lngRange = bounds.northEast.longitude - bounds.southWest.longitude;

    const x = ((lng - bounds.southWest.longitude) / lngRange) * size.width;

    const y = ((lat - bounds.southWest.latitude) / latRange) * size.height;

    return { x, y };
  }

  const updateVisibleMarkers = async () => {
    if (!mapRef.current) return;

    const bounds = await mapRef.current.getMapBoundaries();

    const markers = places.map((place) => {
      const { x, y } = projectToScreen(
        place.coordinates.latitude,
        place.coordinates.longitude,
        bounds,
        mapSize,
      );

      return {
        id: place.id,
        x,
        y,
        place,
      };
    });
    setScreenMarkers(markers);
  };

  return (
    <View style={{ flex: 1 }}>
      {location !== null ? (
        <>
          <MapView
            style={{ flex: 1 }}
            ref={mapRef}
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              setMapSize({ width, height });
            }}
            onMapReady={() => {
              setMapReady(true);
            }}
            onRegionChange={() => {
              if (mapReady) {
                updateVisibleMarkers();
              }
            }}
            region={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {places.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.coordinates.latitude,
                  longitude: place.coordinates.longitude,
                }}
                onPress={() => handleMarkerClick(place)}
                titleVisibility="hidden"
              ></Marker>
            ))}
          </MapView>
          {
            <View pointerEvents="none">
              {screenMarkers?.map(({ id, x, y, place }) => (
                <View
                  key={id}
                  style={{
                    position: "absolute",
                    left: x - 60,
                    bottom: y - 30,
                    transitionDuration: "300ms",
                  }}
                >
                  <View style={styles.label}>
                    <Text
                      style={{ color: "white", fontWeight: "bold" }}
                      numberOfLines={1}
                    >
                      {place.title}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          }
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
  },

  label: {
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 4,
    maxWidth: 180,
  },

  pin: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: 4,
  },
});
