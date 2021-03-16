import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback} from "react-native";
import Input from "../../components/Input";
import theme from '../theme';

const { width, height } = Dimensions.get("screen");

export default ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Delivery Address',
    })
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={{ width: "100%" }}>
            <View style={styles.headerContainer}>
                <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>Delivery Address</Text>
                </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View>
            <Input icon="ios-location-sharp" placeholder="Address" keyboardType="default" textContentType="fullStreetAddress"/>
            <Input icon="map" placeholder="Province" keyboardType="default" textContentType="addressState"/>
            <Input icon="map" placeholder="Country" keyboardType="default" textContentType="countryName"/>
            <Input icon="ios-location-sharp" placeholder="Postal Code" keyboardType="default" textContentType="postalCode"/>
            </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.text}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <Text>© Team South - 2021</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 40,
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  button: {
    backgroundColor: theme.COLORS.PRIMARY,
    padding: 10,
    width: width / 1.2,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  text: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
    fontWeight: "600",
  },
  headerContainer: {
    width: "100%",
    padding: 10,
    marginVertical: 25,
  },
  headerTitleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
