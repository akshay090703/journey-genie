import { View, Text, Linking } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";

export default function FlightInfo({ flightData }) {
  //   console.log(flightData);

  return (
    <View
      style={{
        marginTop: 20,
        borderWidth: 2,
        borderColor: Colors.LIGHT_GRAY,
        padding: 10,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          ✈️ Flight
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 7,
            width: 100,
            borderRadius: 7,
            marginTop: 7,
          }}
          onPress={() => {
            const mapsLink = flightData.bookingUrl;
            Linking.openURL(mapsLink)
              .then(() => console.log("Opened Booking Link"))
              .catch((err) =>
                console.error("Error opening Booking Link:", err)
              );
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "outfit",
            }}
          >
            Book Here
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
          marginTop: 7,
        }}
      >
        Airline: {flightData?.details.airline}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
        }}
      >
        Price: {flightData?.price}
      </Text>
    </View>
  );
}
