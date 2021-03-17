import React, { useState, useLayoutEffect } from "react";
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, SafeAreaView, Keyboard, TouchableWithoutFeedback} from "react-native";
import Input from "../../components/Input";
import theme from "../theme";
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("screen");

export default ({ navigation }) => {

  let [fName, setFname] = useState('');
  let [lName, setLname] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Personal Information",
    });
  });

  const userInformation = () => {
    const tmpData = {
      firstName: fName,
      lastName: lName,
      email: email,
      password: password,
    }
    return tmpData;
  }

  const validate = () => {
    if (password != '' && confirmPassword != '' && fName != '' && lName != '' && email != ''){
      if(password.length >5){
        if (password === confirmPassword){
          return true;
        } else {
          Toast.show({
            type: 'error',
            text1: 'Attention! 👋',
            text2: 'Passwords must match !',
            position: 'bottom',
            topOffset: 60,
            bottomOffset: 80,
          });
          return false;
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Attention! 👋',
          text2: 'Passwords must have at least 6 letters!',
          position: 'bottom',
          topOffset: 60,
          bottomOffset: 80,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Attention! 👋',
        text2: 'Fields can not be empty !',
        position: 'bottom',
        topOffset: 60,
        bottomOffset: 80,
      });
      return false;s
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={{ width: "100%" }}>
            <View style={styles.headerContainer}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>Registration</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View>
            <Input icon="md-person" placeholder="First Name" keyboardType="default" textContentType="name" value={fName} onChangeText={fname => setFname(fname)}/>
            <Input icon="md-person" placeholder="Last Name" keyboardType="default" textContentType="familyName" value={lName} onChangeText={lname => setLname(lname)}/>
            <Input icon="md-mail" placeholder="Email" keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={email => setEmail(email)}/>
            <Input icon="key" placeholder="Password" secureEntry={true} textContentType="newPassword" value={password} onChangeText={pass => setPassword(pass)}/>
            <Input icon="key" placeholder="Confirm Password" secureEntry={true} textContentType="newPassword" value={confirmPassword} onChangeText={cpass => setConfirmPassword(cpass)}/>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
              if(validate()){
                  navigation.navigate("registeraddress", {user: userInformation()});
              } 
            }}
          >
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
        <Text>© Team South - 2021</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
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
