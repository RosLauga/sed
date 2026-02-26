import { GOOGLE_API_KEY } from "@/constants/env";

export default async function getPlaceDetails(placeId: string) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": String(GOOGLE_API_KEY),
        "X-Goog-FieldMask": `displayName,formattedAddress,rating,userRatingCount,photos,regularOpeningHours,websiteUri`,
        "Accept-Language": "es",
      },
    },
  );
  const data = await response.json();
  return data;
}
