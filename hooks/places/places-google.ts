import { GOOGLE_API_KEY } from "@/constants/env";

export default async function placesGoogle(
  latitude: number,
  longitude: number,
) {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": String(GOOGLE_API_KEY),
        "X-Goog-FieldMask": "places.displayName,places.location,places.id",
      },
      body: JSON.stringify({
        includedTypes: ["bar"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude,
              longitude,
            },
            radius: 1500.0,
          },
        },
      }),
    },
  );
  const data = await response.json();
  const mappedPlaces = mapPlacesToMarkers(data.places);
  return mappedPlaces;
}

function mapPlacesToMarkers(places: any[]) {
  return places.map((place) => ({
    id: place.id,
    title: place.displayName.text,
    coordinates: {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
    },
  }));
}
