import React, {useLayoutEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import theme from "../theme";
import Toast from 'react-native-toast-message';
import FirebaseConfig from "../../backend/FirebaseConfig";
import firebase from "firebase";

TextInput.defaultProps.selectionColor = theme.COLORS.PRIMARY;

export default ({navigation}) => {

    let database = FirebaseConfig();

    let [userAuth, setUserAuth] = useState();
    let [address, setAddress] = useState("");
    let [state, setState] = useState("");
    let [country, setCountry] = useState("");
    let [zip, setZip] = useState("");

    const checkAuth = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUserAuth(user.uid);
            fetchDetails(user.uid);
          } else {
            navigation.navigate("home");
          }
        });
      };

    useLayoutEffect(() => {
        checkAuth();
        navigation.setOptions({
          title: 'Delivery Address',
        })
    }, [navigation]);

    const save = (id) => {
        database
          .database()
          .ref("/userInfo/" + id)
          .update(
            {
              address: address,
              state: state,
              country: country,
              zip: zip,
            },
            (error) => {
              if (error) {
                console.log(error);
                // The write failed...
              } else {
                console.log("success");
                Toast.show({
                    type: 'success',
                    text1: 'Done! 😍',
                    text2: 'New Address 😍 Ready to receive your order ?',
                    position: 'top',
                    topOffset: 80,
                    bottomOffset: 80,
                });
              }
            }
          );
      };

      const fetchDetails = (id) => {
        console.log("fetchDetails " + id);
        database
          .database()
          .ref("/userInfo/" + id)
          .once("value", function (snapshot) {
            if (snapshot.val() != null) {
              setAddress(snapshot.val().address);
              setState(snapshot.val().state);
              setCountry(snapshot.val().country);
              setZip(snapshot.val().zip);
            }
          });
      };
    return (
        <View style = { styles.container }>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.topHeader}>
                <FontAwesome5 name="search-location" size={50} color={theme.COLORS.PRIMARY} />
                    <Text style={styles.textHeader}>Address Information</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.detailsContainer}>
                    <TextInput style={styles.input} placeholder="Address" onChangeText={(text) => setAddress(text)} value={address}></TextInput>
                    <TextInput style={styles.input} placeholder="Province/State" onChangeText={(text) => setState(text)} value={state}></TextInput>
                    <TextInput style={styles.input} placeholder="Country" onChangeText={(text) => setCountry(text)} value={country}></TextInput>
                    <TextInput style={styles.input} placeholder="Postal Code" onChangeText={(text) => setZip(text)} value={zip}></TextInput>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.save} onPress={() => 
                {   if(address != '' && state != '' && country != '' && zip != ''){
                    save(userAuth)
                    }else {
                        Toast.show({
                            type: 'error',
                            text1: 'Attention! 👋',
                            text2: 'Fields can not be empty !',
                            position: 'bottom',
                            bottomOffset: 100,
                        });
                    }
                }}>
                <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        backgroundColor: theme.COLORS.WHITE,
        
    },
    topHeader: {
        margin: 10,
        padding: 40,
        alignItems:'center',
    },
    textHeader: {
        paddingTop: 10, 
        fontSize: 25,
        textAlign: 'center',
        alignSelf: 'center',
        textTransform: "uppercase",
    },
    detailsContainer: {
        flex:4,
        alignContent:'center',
    },
    input: {
        height: 40,
        margin: 12,
        paddingLeft: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: theme.COLORS.PRIMARY,
    },
    separator:{
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: theme.COLORS.PRIMARY,
    },
    text: {
        fontSize: 15,
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    saveText: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
    },
    save: {
        position: 'absolute',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        backgroundColor: theme.COLORS.PRIMARY,
        bottom: 0,
    },
    map: {
        width: Dimensions.get('window').width - 20,
        height: 200,
      },
})