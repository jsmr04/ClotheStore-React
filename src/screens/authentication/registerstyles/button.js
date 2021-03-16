import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const Button = ({ title, onPress, background }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[
        { backgroundColor: background || "#5a2d82" },
        styles.button,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: width / 2,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Button;