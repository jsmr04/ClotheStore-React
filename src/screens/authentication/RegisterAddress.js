import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback} from "react-native";
import Input from "../../components/Input";
import theme from '../theme';
import FirebaseConfig from "../../backend/FirebaseConfig";
import firebase from 'firebase'


const { width, height } = Dimensions.get("screen");

export default ({ route, navigation }) => {

  const database = FirebaseConfig();
  const { user } = route.params;
  console.log(user)  

  let [address, setAddress] = useState()
  let [state, setState] = useState()
  let [country, setCountry] = useState()
  let [zip, setZip] = useState()
  

  const saveData = async () => {

    if (user.uid != undefined){
      database.database()
      .ref('/userInfo/' + user.uid)
      .set({
          email: user.email,
          profilePicture: user.profilePicture,
          firstName: user.firstName,
          lastName: user.lastName,
          address: address,
          state: state,
          country: country,
          zip: zip
      }).then(function (snapshot){
        navigation.popToTop();
      })
    } else {
      firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
              database.database()
              .ref('/userInfo/' + result.user.uid)
              .set({
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  address: address,
                  state: state,
                  country: country,
                  zip: zip
              }).then(function (snapshot){
                navigation.popToTop();
              })
            })
            .catch(error => console.log(error))
    }
    
  }

  const checkEmpty = () => {
      if (address != '' && state != '' && country != '' && zip != ''){
        return true
      } else {
        return false
      }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Delivery Address',
      headerLeft: null,
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
            <Input icon="ios-location-sharp" placeholder="Address" keyboardType="default" textContentType="fullStreetAddress" onChangeText={(address) => setAddress(address)}/>
            <Input icon="map" placeholder="Province" keyboardType="default" textContentType="addressState" onChangeText={(state) => setState(state)}/>
            <Input icon="map" placeholder="Country" keyboardType="default" textContentType="countryName" onChangeText={(country) => setCountry(country)}/>
            <Input icon="ios-location-sharp" placeholder="Postal Code" keyboardType="default" textContentType="postalCode" onChangeText={(zip) => setZip(zip)}/>
            </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} 
            onPress={() => {
              if(checkEmpty()){
                saveData()
              } else {
                console.log('There are fields in blank')
              }
              
            }}> 
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
