import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getPhotoRef } from "../../services/GooglePlaceApi";

export default function HotelCard({ item, index }) {
  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    getPhotoReference();
  }, []);

  const getPhotoReference = async () => {
    const result = await getPhotoRef(item?.name);
    // console.log(result.results[0].photos[0].photo_reference);

    setPhotoRef(result.results[0].photos[0].photo_reference);
  };

  return (
    <View
      key={index}
      style={{
        marginRight: 20,
        width: 160,
      }}
    >
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{
          width: 160,
          height: 120,
          borderRadius: 15,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 17,
          }}
        >
          {item?.name}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
            }}
          >
            ⭐ {item?.rating}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
            }}
          >
            💰 {item?.price}
          </Text>
        </View>
      </View>
    </View>
  );
}
