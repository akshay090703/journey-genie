import { View, Text } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { useRouter } from "expo-router";

export default function mytrip() {
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();

  return (
    <View style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.WHITE,
      height: '100%',
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
        }}>My Trip</Text>
        <Ionicons name="add-circle" size={45} color="black" onPress={() => router.push('/create-trip/search-place')} />
      </View>

      {userTrips?.length==0 ? (
        <StartNewTripCard />
      ) : null}
    </View>
  );
}
