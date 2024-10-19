import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import moment from "moment";
import { Colors } from "../../constants/Colors";

export default function Profile() {
  const router = useRouter();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  useEffect(() => {
    // Check user authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // console.log(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [navigation, auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      ToastAndroid.show("User successfully logged out!", ToastAndroid.LONG);
      router.replace("/auth/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.profileHeader}>
            <Image
              source={require("../../assets/images/user-placeholder.jpg")}
              style={styles.profileImage}
            />
            <Text style={styles.welcomeText}>
              Welcome, {user.displayName || "User"}!
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Email: {user.email}</Text>
            {user.phoneNumber && (
              <Text style={styles.detailsText}>Phone: {user.phoneNumber}</Text>
            )}
            <Text style={styles.detailsText}>UID: {user.uid}</Text>
            <Text style={styles.detailsText}>
              Account Created:{" "}
              {moment(user.metadata.creationTime).format("DD MMM YYYY")}
            </Text>
            <Text style={styles.detailsText}>
              Last Sign-In:{" "}
              {moment(user.metadata.lastSignInTime).format("DD MMM YYYY")}
            </Text>
            {/* Add any other user-related information here */}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noUserText}>No user is logged in.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  profileHeader: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    marginTop: 100,
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  detailsContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  noUserText: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  logoutButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
