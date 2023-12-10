import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "../components/Slider";

type Props = {
  navigation;
};
const App = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/main_bg.png")}
        style={styles.imageBackground}
      >
        <Slider />
        {/* <View style={styles.textContainer}>
          <Text style={styles.headerText}>Explore the beauty of journey.</Text>
          <Text style={styles.subText}>
            Travel often involves embarking on exciting adventures and engaging
            in thrilling activities.
          </Text>
        </View> */}

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust as needed for status bar
    paddingBottom: 20,
  },
  textContainer: {
    marginTop: '80%',
    width: "100%",
    padding: 20,
  },
  headerText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#00A7E1",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 50, // Adjust as needed for your UI design
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default App;
