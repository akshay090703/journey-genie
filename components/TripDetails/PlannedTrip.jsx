import { View, Text, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import PlaceCard from "./PlaceCard";

export default function PlannedTrip({ details }) {
  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    setPlanData(details);
    // console.log("Details: ", details);
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
        }}
      >
        🏕️ Plan Details
      </Text>

      {/* {Object.entries(details).map(([day, schedule]) => (
        <View>
          <Text>{day?.charAt(0).toUpperCase() + day?.slice(1)}</Text>
        </View>
      ))} */}
      {planData.map((dayPlan, index) => (
        <View key={index}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              marginTop: 20,
            }}
          >
            Day {dayPlan.day}
          </Text>

          {dayPlan.schedule.map((plan, idx) => (
            <PlaceCard plan={plan} idx={idx} />
          ))}
        </View>
      ))}
    </View>
  );
}
