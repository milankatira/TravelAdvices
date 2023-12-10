import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo icons or another icon library
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const travelAppUI = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="black" />
        <Text style={styles.location}>London, UK</Text>
        <Ionicons name="notifications" size={24} color="black" />
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Where do you want to travel?</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={{
              width: "90%",
              borderWidth: 0,
            }}
            placeholder="Indonesia, Bali, beach..."
          />
          <Ionicons
            style={{
              width: "10%",
            }}
            name="search"
            size={20}
            color="grey"
          />
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Explore Categories</Text>
        <FlatList
          horizontal
          data={[{ key: "Camping" }, { key: "Mountain" }, { key: "City" }]} // Add more categories as needed
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Text>{item.key}</Text>
            </TouchableOpacity>
          )}
        />

        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust to your notch height or status bar height
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  location: {
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBox: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    shadowColor: "#0055", // Color of the shadow
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.1, // Opacity of the shadow
    shadowRadius: 8, // Shadow blur radius
    elevation: 5, // Elevation for Android
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  destinationItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  destinationImage: {
    width: 100,
    height: 200,
    borderWidth:3
  },
  destinationName: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  // ... add more styles for other elements like rating, price, bottom tab navigator
});

export default travelAppUI;
