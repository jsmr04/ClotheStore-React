import React, {useLayoutEffect, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from "../theme";
import FirebaseConfig from "../../backend/FirebaseConfig";
import firebase from 'firebase';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

TextInput.defaultProps.selectionColor = theme.COLORS.PRIMARY;

export default ({navigation}) => {
    let [userAuth, setUserAuth] = useState();
    let database = FirebaseConfig();

    let [fName, setFname] =  useState();
    let [lName, setLname] = useState();
    let [email, setEmail] = useState();
    let [profilePic, setProfile] = useState();

    const checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                setUserAuth(user.uid);
            }
            else {
                navigation.navigate('home');
            }
        })
    }

    const save = (id) => {
        console.log(userAuth)
        console.log(fName)
        console.log(lName)
        database.database().ref('/userInfo/' + id)
        .update({
            'firstName': fName,
            'lastName': lName,
        }, (error) => {
            if (error) {
                console.log(error)
              // The write failed...
            } else {
                console.log('success')
              // Data saved successfully!
            }
        });
    }

    const profilePicture = () => {
        if(profilePic != undefined){
            return <Image style={styles.img} source={{uri: profilePic}} ></Image>
        } else {
            return <Image style={styles.img} source={{uri: "https://ui-avatars.com/api/?size=256&background=5a2d82&color=fff&name=John+Doe"}} ></Image>
        }    
        
    }

    const fetchDetails = (id) => {
        database.database().ref('/userInfo/' + id)
        .once("value", function (snapshot) {
            setFname(snapshot.val().firstName);
            setLname(snapshot.val().lastName);
            setEmail(snapshot.val().email);
            setProfile(snapshot.val().profilePicture);
        });
    }

    useLayoutEffect(() => {
        checkAuth();
        navigation.setOptions({
          title: 'Account Details',
        })
    });

    return (
        <View style = { styles.container }>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.imgContainer}>
                {profilePicture()}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={styles.detailsContainer}>
                    <TextInput style={styles.input} placeholder="First Name" onChangeText={(fName) => setFname(fName)} defaultValue={fName}></TextInput>
                    <TextInput style={styles.input} placeholder="Last Name" onChangeText={(lName) => setLname(lName)} defaultValue={lName}></TextInput>
                    <TextInput style={styles.inputdisabled} defaultValue={email} placeholder="Email" editable={false}></TextInput>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.save} onPress={() => save(userAuth)} >
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
    imgContainer: {
        flex:1,
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30, 
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    detailsContainer: {
        flex:4,
        alignContent:'center',
    },
    inputdisabled: {
        height: 40,
        margin: 12,
        paddingLeft: 10,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: theme.COLORS.PRIMARY,
        backgroundColor: "lightgrey"
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
    
})