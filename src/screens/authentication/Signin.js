import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {StyleSheet, View, Dimensions, SafeAreaView, Text, TouchableOpacity, Keyboard,  TouchableWithoutFeedback} from "react-native";
import Input from "../../components/Input";
import theme from '../theme';

const { width, height } = Dimensions.get("screen");


export default ({navigation}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={{ width: "100%", marginTop: 20}}>
            <View style={styles.headerContainer}>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>Please Sign In</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View>
            <Input icon="md-mail" placeholder="Email" keyboardType="email-address" textContentType="emailAddress"/> 
            <Input icon="key" placeholder="Password" secureEntry={true} textContentType="password"/>
            <BouncyCheckbox
            textDecoration={true}
            isChecked={false}
            value={isSelected}
            textColor="#000"
            borderColor={theme.COLORS.PRIMARY}
            fillColor= {theme.COLORS.PRIMARY}
            text="Remember me"
            onValueChange={setSelection}
            style={styles.checkbox}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text>Don't have an account?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('register')}}>
            <Text style={styles.text}>Register</Text>
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
    marginVertical: 40,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
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
