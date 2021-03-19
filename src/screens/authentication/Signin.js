import React, { useState, useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {StyleSheet, View, Dimensions, SafeAreaView, Text, TouchableOpacity, Keyboard,  TouchableWithoutFeedback, ActivityIndicator} from "react-native";
import Input from "../../components/Input";
import theme from '../theme';
import * as Google from 'expo-google-app-auth';
import FirebaseConfig from "../../backend/FirebaseConfig";
import firebase from "firebase";
import Toast from 'react-native-toast-message';
import { FontAwesome5 } from '@expo/vector-icons';


const { width, height } = Dimensions.get("screen");

export default ({route, navigation}) => {

  let database = FirebaseConfig();
  const [isSelected, setSelection] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let nextScreen = route.params?.nextScreen;
  let cartData = route.params?.cartData

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  const checkExists = async (id) => {
    console.log('checkExists ' + id)
    var exist;
    //console.log(email)
    // database.database().ref('/userInfo/' + id)
    // .once('value', (snapshot) => {
    //   console.log('snapshot')
    //   console.log(snapshot)
    //   if(snapshot === null){
    //     console.log('Dont exists')
    //     return false
    //   }else {
    //     console.log('exists')
    //    return true
    //   }
    // });
    let snapshot = await database.database().ref('/userInfo/' + id).once('value')
    if(snapshot.val() == null){
        console.log('Dont exists')
        return false
    }else {
      console.log('exists')
      console.log(snapshot)
       return true
    }
   // return exist;
  }

  const onSignIn = (googleUser) => {
    setLoading(true)
    console.log('Google Auth Response', googleUser.user.email);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    // var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    //   //unsubscribe();
    //   // Check if we are already signed-in Firebase with the correct user.
    //   if (!isUserEqual(googleUser, firebaseUser)) {
    //     // Build Firebase credential with the Google ID token.
        
    //   } else {
    //     console.log('User already signed-in Firebase.');
    //   }
    // });
    var credential = firebase.auth.GoogleAuthProvider.credential( googleUser.idToken, googleUser.accessToken);
    console.log('SLOW! 1')
    // Sign in with credential from the Google user.
    //console.log(credential)
    firebase.auth().signInWithCredential(credential).then(function(result){
      // await checkExists(result.user.uid)
      setLoading(false)
      console.log('SLOW! 2')
      checkExists(result.user.uid).then(exits =>{
        console.log(exits)
        console.log('it works!')
        if(exits){
          if (nextScreen != undefined){
            navigation.replace(nextScreen, {cartData: cartData, userId: result.user.uid});  
          }else{
            navigation.navigate('home');
          }
          
        } else {
          console.log('do not exists - NEW')
          let tmpData = {
            uid: result.user.uid,
            email: result.additionalUserInfo.profile.email,
            profilePicture: result.additionalUserInfo.profile.picture,
            firstName: result.additionalUserInfo.profile.given_name,
            lastName: result.additionalUserInfo.profile.family_name,
          }
          navigation.navigate('registeraddress', {user: tmpData});
        }
      })
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });    
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '521700687251-ibr2frei8m4qt676cbacitvtuclrk290.apps.googleusercontent.com',
        iosClientId: '521700687251-ddk861rstv5dia1t3k4boggkj3b18mnm.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onSignIn(result)
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const checklogin = () => {
    if(email != '' && password != ''){
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (nextScreen != undefined){
          navigation.replace(nextScreen, {cartData: cartData, userId:user.uid});  
        }else{
          navigation.popToTop()
        }
        
      })
      .catch(error => console.log(error))
    } else {
      Toast.show({
        type: 'error',
        text1: 'Attention! 👋',
        text2: 'Fields can not be empty !',
        position: 'bottom',
        topOffset: 60,
        bottomOffset: 80,
      });
    }
    
  }
  

  // const checkAuth = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //       if(user){
  //         navigation.goBack();
  //       }
  //   })
  // }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
      { loading ? 
          <ActivityIndicator style={styles.activity}  size='large' color = { theme.COLORS.PRIMARY } />  
        : <></> }
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
            <Input icon="md-mail" placeholder="Email" keyboardType="email-address" textContentType="emailAddress" value={email} onChangeText={email => setEmail(email)}/> 
            <Input icon="key" placeholder="Password" secureEntry={true} textContentType="password" value={password} onChangeText={pass => setPassword(pass)}/>
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
          <TouchableOpacity style={styles.button} onPress={() => checklogin()}> 
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
          <View style={{margin: 5}}></View>
            <FontAwesome5.Button style={styles.button} name="google" onPress={() => signInWithGoogleAsync()}
              iconStyle={{marginLeft: 60}} borderRadius={15}//any other customization you want, like borderRadius, color, or size
            >
              <Text style={styles.text}>Log In With Google</Text>
            </FontAwesome5.Button>
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
