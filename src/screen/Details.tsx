import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo icons or another icon library
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstablishmentsByLatLong } from "../store/action/establishment";
import { fetchLocationData } from "../store/action/locationSlice";
import { fetchPlaces } from "../store/action/placeSlice";

const travelAppUI = () => {
  const { places, loading, error } = useSelector((state: any) => state.place);
  const { data } = useSelector((state: any) => state.establishment);
  const { data: locationData } = useSelector((state: any) => state.location);
  console.log(data?.data, "data");
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);
  const [establishmentType, setEstablishmentType] = useState("restaurants");
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
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
    if (!lat || !long) {
      Alert.alert("Alert Title", "My Alert Msg", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    dispatch(
      fetchEstablishmentsByLatLong({
        establishmentType: establishmentType, // or 'restaurants', 'houses', etc.
        latitude: lat,
        longitude: long,
      })
    );
  }, [lat, long, establishmentType]);

  useEffect(() => {
    if (debouncedTerm) {
      dispatch(fetchPlaces(debouncedTerm));
    }
  }, [debouncedTerm]);

  const getCoordinated = async (data) => {
    const d = await dispatch(fetchLocationData(data)).unwrap();
    setIsSearching(false);
    setlat(d?.lat);
    setlong(d?.lon);
    // if (!d?.lat || !d?.lon) {
    //   Alert.alert("Alert Title", "My Alert Msg", [
    //     { text: "OK", onPress: () => console.log("OK Pressed") },
    //   ]);
    //   return;
    // }
    // await dispatch(
    //   fetchEstablishmentsByLatLong({
    //     establishmentType: "hotels", // or 'restaurants', 'houses', etc.
    //     latitude: d?.lat,
    //     longitude: d?.lon,
    //   })
    // );
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
          data={[
            { key: "hotels" },
            { key: "attractions" },
            { key: "restaurants" },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setEstablishmentType(item.key)}
              style={styles.categoryItem}
            >
              <Text>{item.key}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.destinationContainer}>
          {data?.data?.length > 0 &&
            data?.data?.map((i) => (
              <View style={styles.destinationItem}>
                <View style={styles.cartContainer}>
                  <Text style={styles.destinationText}>
                    {i?.name?.length > 14
                      ? `${i?.name.slice(0, 14)}..`
                      : i?.name}
                  </Text>
                  <Text style={styles.destinationLocation}>
                    {i?.location_string?.length > 18
                      ? `${i?.location_string.slice(0, 18)}..`
                      : i?.location_string}
                  </Text>
                  <Image
                    style={styles.destinationImage}
                    source={{
                      uri: i?.photo?.images?.medium?.url
                        ? i?.photo?.images?.medium?.url
                        : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
                    }}
                  />
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
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
    zIndex: 10, // Make sure this view floats above all others
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
  scrollView: {
    // Styling for the ScrollView
  },
  destinationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  destinationItem: {
    // padding: 20,
    width: "50%",
    // marginVertical: 10,
    // marginHorizontal: 20,
    borderRadius: 15,
  },
  cartContainer: {
    margin: 20,
    // borderWidth: 1,
    borderRadius: 15,
  },
  destinationText: {
    // Style for the destination text
  },
  destinationLocation: {
    // Style for the destination location
  },
  destinationImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 15,
  },
  // ... add more styles for other elements like rating, price, bottom tab navigator
});

export default travelAppUI;
