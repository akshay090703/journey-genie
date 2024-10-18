export const getPhotoRef = async (placeName) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      placeName
    )}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
  );

  const result = await res.json();
  //   console.log(result);

  return result;
};
