import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";
import { ScrollView } from "react-native";

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [userPreferences, setUserPreferences] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    // console.log(typeof trip);
    // console.log(trip);
    try {
      const parsedTrip = JSON.parse(trip);
      //   console.log("Parsed trip:", parsedTrip);
      setTripDetails((prev) => parsedTrip);
      //   console.log("Trip details: ", tripDetails);
    } catch (error) {
      console.error("Error parsing trip:", error);
    }
    // console.log(trip);
  }, []);

  useEffect(() => {
    if (tripDetails && tripDetails.tripData) {
      try {
        setUserPreferences(JSON.parse(tripDetails?.tripData));
      } catch (error) {
        console.error("Error parsing tripData:", error);
      }

      //   console.log("Day Plan : ", tripDetails?.aiTripPlan?.dayPlan);
    }
  }, [tripDetails]);

  return (
    tripDetails && (
      <ScrollView>
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userPreferences.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userPreferences.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: "100%",
            height: 330,
          }}
        />
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            height: "100%",
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "outfit-bold",
            }}
          >
            {userPreferences.locationInfo?.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 16,
                color: Colors.GRAY,
              }}
            >
              {moment(userPreferences.startDate).format("DD MMM YYYY")}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 16,
                color: Colors.GRAY,
              }}
            >
              - {moment(userPreferences.endDate).format("DD MMM YYYY")}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 16,
              color: Colors.GRAY,
            }}
          >
            🚌 {userPreferences.traveler?.title}
          </Text>

          {/* Flight Info */}
          <FlightInfo flightData={tripDetails?.aiTripPlan?.flight} />

          {/* Hotels List */}
          <HotelList hotelList={tripDetails?.aiTripPlan?.hotel} />

          {/* Trip Day Planner Info */}
          <PlannedTrip details={tripDetails?.aiTripPlan?.dayPlan} />
        </View>
      </ScrollView>
    )
  );
}
