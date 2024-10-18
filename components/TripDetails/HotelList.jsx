import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getPhotoRef } from "../../services/GooglePlaceApi";
import HotelCard from "./HotelCard";

export default function HotelList({ hotelList }) {
  //   console.log(hotelList);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        style={{ marginTop: 8 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={hotelList}
        renderItem={({ item, index }) => (
          <HotelCard item={item} index={index} />
        )}
      />
    </View>
  );
}
