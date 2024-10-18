import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from "../../configs/FirebaseConfig";
import { getAuth } from "@firebase/auth";
import UserTripList from "../../components/MyTrips/UserTripList";

const auth = getAuth(app);

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const [num, setNum] = useState(0);

  useEffect(() => {
    user && getMyTrips();
  }, [user]);

  const getMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });

    setUserTrips(trips);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getMyTrips(); // Fetch trips again
    setRefreshing(false); // Stop refreshing
  };

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
          }}
        >
          My Trip
        </Text>
        <Ionicons
          name="add-circle"
          size={45}
          color="black"
          onPress={() => router.push("/create-trip/search-place")}
        />
      </View>

      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}
      {userTrips?.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <UserTripList userTrips={userTrips} />
      )}
    </ScrollView>
  );
}
