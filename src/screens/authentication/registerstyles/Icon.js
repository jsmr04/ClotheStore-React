import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Entypo } from '@expo/vector-icons'; 

const { width, height } = Dimensions.get("screen");

const Icon = ({ name, size, color, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <Entypo name={name} size={size || 18} color={color || "#555"} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width,
    paddingLeft: 20,
    position: "absolute",
    top: 100,
    left: 0,
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0)",
    alignSelf: "flex-start",
    flex: 0.1,
  },
});

export default Icon;