import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type == "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelection = () => {
    if (startDate && endDate && startDate <= endDate) {
      const totalNoOfNights = endDate.diff(startDate, "days");

      setTripData({
        ...tripData,
        startDate: startDate,
        endDate: endDate,
        totalNoOfNights: totalNoOfNights,
      });

      router.push("/create-trip/select-budget");
    } else {
      ToastAndroid.show(
        "Please select both start and end date",
        ToastAndroid.LONG
      );
      return;
    }
  };

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
        Travel Dates
      </Text>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextStyle={{
            color: Colors.WHITE,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 35,
        }}
        onPress={onDateSelection}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            textAlign: "center",
            color: Colors.WHITE,
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
