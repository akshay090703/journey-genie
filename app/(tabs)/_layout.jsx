import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from "../../constants/Colors";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen name="mytrip"
        options={{
          tabBarIcon:({color}) => (
            <Ionicons name="location-sharp" size={24} color={color} />
          ),
          tabBarLabel: 'My Trip',
        }}
      />
      <Tabs.Screen name="discover" 
        options={{
          tabBarIcon:({color}) => (
            <Ionicons name="globe" size={24} color={color} />
          ),
          tabBarLabel: 'Discover',
        }}
      />
      <Tabs.Screen name="profile"
        options={{
          tabBarIcon:({color}) => (
            <Ionicons name="people-circle-sharp" size={24} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  );
}
