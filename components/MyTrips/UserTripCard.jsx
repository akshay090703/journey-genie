import { View, Text, Image } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ trip }) {
  const currentTrip = JSON.parse(trip.tripData);
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      {/* <Image
        source={require("../../assets/images/placeholder.jpg")}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      /> */}

      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${currentTrip.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />

      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          {currentTrip?.locationInfo?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {moment(currentTrip.startDate).format("DD MMM YYYY")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          Traveling: {currentTrip.traveler?.title}
        </Text>
      </View>
    </View>
  );
}
