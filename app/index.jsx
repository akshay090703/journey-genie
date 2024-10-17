import 'react-native-get-random-values';
import { Text, View } from "react-native";
import Login from "../components/Login";
import { auth } from "../configs/FirebaseConfig";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function Index() {
  const user = auth.currentUser;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
        'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
      });
      setFontsLoaded(true);
    }
  
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {user ? <Redirect href={"/mytrip"} /> : <Login />}
    </View>
  );
}
