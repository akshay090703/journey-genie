import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [userPreferences, setUserPreferences] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/auth/sign-in");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    try {
      const parsedTrip = JSON.parse(trip);
      setTripDetails(parsedTrip);
    } catch (error) {
      console.error("Error parsing trip:", error);
    }
  }, []);

  useEffect(() => {
    if (tripDetails && tripDetails.tripData) {
      try {
        setUserPreferences(JSON.parse(tripDetails.tripData));
      } catch (error) {
        console.error("Error parsing tripData:", error);
      }
    }
  }, [tripDetails]);

  const handleDeleteTrip = async () => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "UserTrips", tripDetails.docId));
            router.replace("/mytrip");
          } catch (error) {
            console.error("Error deleting trip:", error);
          }
        },
      },
    ]);
  };

  return (
    tripDetails && (
      <ScrollView>
        <Image
          source={{
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
                fontSize: 25,
                fontFamily: "outfit-bold",
                width: "80%",
              }}
            >
              {userPreferences.locationInfo?.name}
            </Text>

            <TouchableOpacity onPress={handleDeleteTrip}>
              <MaterialIcons name="delete" size={30} color={Colors.RED} />
            </TouchableOpacity>
          </View>

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
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 16,
              color: Colors.GRAY,
            }}
          >
            💰 {userPreferences.budget}
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
