import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment";
import { TouchableOpacity } from "react-native";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShown: true,
      headerTransparent: true,
    });
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
          marginTop: 20,
        }}
      >
        Review your trip
      </Text>

      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Before generating your trip, please review yout selections
        </Text>

        {/* Location selection */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
          <Text
            style={{
              fontSize: 30,
            }}
          >
            📍
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Destination
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        {/* Date selection */}
        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
          <Text
            style={{
              fontSize: 30,
            }}
          >
            🗓️
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Travel Date
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {moment(tripData?.startDate).format("DD MMM") +
                " To " +
                moment(tripData?.endDate).format("DD MMM") +
                " "}
              ({tripData?.totalNoOfNights} nights)
            </Text>
          </View>
        </View>

        {/* Travel info selection */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
          <Text
            style={{
              fontSize: 30,
            }}
          >
            👨‍🚀
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Who is Traveling?
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {tripData?.traveler?.title}
            </Text>
          </View>
        </View>

        {/* Budget info selection */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            💰
          </Text>
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Budget
            </Text>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 80,
        }}
        // onPress={() => onClickContinue()}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Build My Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
