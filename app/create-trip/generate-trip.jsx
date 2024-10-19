import { View, Text, Image, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import { chatSession } from "../../configs/AiModel";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "../../configs/FirebaseConfig";
import { getAuth } from "@firebase/auth";

const auth = getAuth(app);

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      router.replace("/auth/sign-in");
    }
  }, []);

  const generateAiTrip = async () => {
    setLoading(true);

    const FINAL_PROMPT = `Generate Travel Plan for Location: ${
      tripData?.locationInfo?.name
    }, for ${tripData.totalNoOfNights + 1} day and ${
      tripData.totalNoOfNights
    } Night for ${tripData.traveler?.title} with a ${
      tripData.budget
    } budget with a Flight details, Flight Price and Booking URL, Hotels options list with Hotel names, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and places to visit nearby with Place name, Place Details, Place Image URL, Geo Coordinates, Ticket pricing, Time to travel each of the location for ${
      tripData.totalNoOfNights + 1
    } day and ${
      tripData.totalNoOfNights
    } night with each day plan with best time to visit in JSON format.     flight -> (a) details -> 1. airline 2. flightNumber 3. departureAirport 4. arrivalAirport, 5. departureDate 6. departureTime 7. arrivalDate 8. arrivalTime  (b) price (c) bookingUrl     hotel -> 1. name 2. address 3. price 4. imageUrl 5. geoCoordinates -> (a) latitude (b) longitude 6. rating 7. description     dayPlan -> 1. day 2. schedule -> (a) time (b) activity (c) location (d) details (e) imageUrl (f) geoCoordinates -> (i) latitude (ii) longitude (g) estimatePricing      The JSON should be in this particular format and there should only be JSON in response nothing else (No Notes at the end) and in the pricing the amount and currency should be a common string.`;

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());

    const tripResp = await JSON.parse(result.response.text());
    setLoading(false);

    const docId = Date.now().toString();
    const response = await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user.email,
      aiTripPlan: tripResp,
      tripData: JSON.stringify(tripData),
      docId: docId,
    });

    setTripData({});
    ToastAndroid.show("Trip Generated!", ToastAndroid.LONG);
    router.replace("/mytrip");
  };

  useEffect(() => {
    tripData && generateAiTrip();
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          textAlign: "center",
        }}
      >
        Please Wait...
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        We are working to generate your dream trip...
      </Text>

      <Image
        source={require("../../assets/images/plane.gif")}
        style={{
          width: "100%",
          height: 300,
          objectFit: "contain",
        }}
      />

      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Do not Go Back
      </Text>
    </View>
  );
}
