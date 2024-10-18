import { View, Text, Image, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getPhotoRef } from "../../services/GooglePlaceApi";
import { Colors } from "../../constants/Colors";

export default function PlaceCard({ plan, idx }) {
  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    getPhotoReference();
  }, []);

  const getPhotoReference = async () => {
    const result = await getPhotoRef(plan.location);
    // console.log(result.results[0].photos[0].photo_reference);

    setPhotoRef(result.results[0].photos[0].photo_reference);
  };

  return (
    <View
      key={idx}
      style={{
        backgroundColor: Colors.LIGHT_BLUE,
        padding: 15,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        marginTop: 20,
      }}
    >
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{
          width: "100%",
          height: 120,
          borderRadius: 15,
          objectFit: "cover",
        }}
      />
      <View
        style={{
          marginTop: 5,
        }}
      ></View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        {plan.activity}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 14,
          color: Colors.GRAY,
        }}
      >
        {plan.details}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              marginTop: 5,
            }}
          >
            📍 Location:{" "}
            <Text
              style={{
                fontFamily: "outfit-bold",
              }}
            >
              {plan.location}
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              marginTop: 5,
            }}
          >
            🎟️ Estimate Costs:{" "}
            <Text
              style={{
                fontFamily: "outfit-bold",
              }}
            >
              {plan.estimatePricing}
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              marginTop: 5,
            }}
          >
            ⏱️ Time To Travel:{" "}
            <Text
              style={{
                fontFamily: "outfit-bold",
              }}
            >
              {plan.time}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 8,
            borderRadius: 7,
          }}
          onPress={() => {
            // const mapsLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${plan.geoCoordinates.latitude},${plan.geoCoordinates.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
            const mapsLink = `https://www.google.com/maps/search/?api=1&query=${plan.geoCoordinates.latitude},${plan.geoCoordinates.longitude}`;
            Linking.openURL(mapsLink)
              .then(() => console.log("Opened Google Maps"))
              .catch((err) => console.error("Error opening Google Maps:", err));
          }}
        >
          <Ionicons name="navigate" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
