import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
  const [trips, setTrips] = useState(userTrips); // Manage state for user trips
  const currentTripData = JSON.parse(trips[0]?.tripData);
  const router = useRouter();

  const handleCardPress = (index) => {
    const selectedTrip = trips[index];
    const updatedTrips = trips.filter((_, i) => i !== index); // Remove the pressed trip from its current position
    setTrips([selectedTrip, ...updatedTrips]); // Add it to the front of the array
  };

  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        {currentTripData?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${currentTripData.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={{
              width: "100%",
              height: 240,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/placeholder.jpg")}
            style={{
              width: "100%",
              height: 240,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        )}
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
            }}
          >
            {currentTripData.locationInfo?.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              {moment(currentTripData.startDate).format("DD MMM YYYY")}
            </Text>

            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              🚌 {currentTripData.traveler.title}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 13,
              borderRadius: 15,
              marginTop: 10,
            }}
            onPress={() =>
              router.push({
                pathname: "/trip-details",
                params: {
                  trip: JSON.stringify(trips[0]), // Use the updated trips array
                  currentTripData: currentTripData,
                },
              })
            }
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: "center",
                fontFamily: "outfit-medium",
                fontSize: 15,
              }}
            >
              See Your Plan
            </Text>
          </TouchableOpacity>

          {trips.map((trip, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(index)}
            >
              <UserTripCard trip={trip} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
