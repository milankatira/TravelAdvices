import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo icons or another icon library
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationData } from "../store/action/locationSlice";
import { fetchPlaces } from "../store/action/placeSlice";

const travelAppUI = () => {
  const { places, loading, error } = useSelector((state: any) => state.place);
  const { data } = useSelector((state: any) => state.location);
  console.log(data, "data");
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);

      if (searchTerm) {
        setIsSearching(true);
      } else {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      dispatch(fetchPlaces(debouncedTerm));
    }
  }, [debouncedTerm]);

  const getCoordinated = async (data) => {
   const d= await dispatch(fetchLocationData(data)).unwrap();
   console.log(d,"DD")
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => getCoordinated(item.description)}
    >
      <Text style={styles.itemText}>{item.description}</Text>
    </TouchableOpacity>
  );
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
            onChangeText={setSearchTerm}
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

        {isSearching && (
          <View style={styles.floatingContainer}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            {!loading && !error && (
              <FlatList
                data={places?.predictions}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        )}
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
    borderWidth: 3,
  },
  destinationName: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },

  floatingContainer: {
    marginHorizontal: 20,
    position: "absolute",
    top: 80, // This should be the sum of the searchContainer's height and marginTop
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 1, // Make sure this view floats above all others
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    maxHeight: 200, // Set a max height if you like
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  // ... add more styles for other elements like rating, price, bottom tab navigator
});

export default travelAppUI;
