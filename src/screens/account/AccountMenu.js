import React, {useState, useLayoutEffect, useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import theme from "../theme";
import firebase from 'firebase';
import FirebaseConfig from "../../backend/FirebaseConfig";


export default ({navigation}) => {
    let [userAuth, setUserAuth] = useState();
    let database = FirebaseConfig();
    let [fName, setFname] = useState("");

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
    const fetchDetails = (id) => {
        //console.log("fetchDetails " + id);
        database
          .database()
          .ref("/userInfo/" + id)
          .once("value", function (snapshot) {
            if (snapshot.val() != null) {
              setFname(snapshot.val().firstName);;
            }
          });
    };

    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            checkAuth();
        });
        return reload;
    }, [navigation]);

    useLayoutEffect(() => {
        checkAuth();
        navigation.setOptions({
          title: "Account Menu",
        });
      }, [navigation]);
    
    return (
        <View style = { styles.container }>
            <View style={styles.menuTitle}>
                <Text style={{fontSize:25, textAlign:"center", paddingTop: 10, fontWeight: '700'}}>Hi, {fName} ☺️</Text>
            </View>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.menu} onPress={() => {navigation.navigate('profile')}}>
                <FontAwesome5 name="list" size={24} color={theme.COLORS.PRIMARY} />
                <Text style={styles.text}>Profile</Text>
                <Ionicons name = { 'md-chevron-forward' } size = { 25 } color={theme.COLORS.PRIMARY} style={styles.icon}/>  
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.menu} onPress={() => {navigation.navigate('address')}}>
                <Ionicons name="md-location-outline" size={24} color={theme.COLORS.PRIMARY} />
                <Text style={styles.text}>Address</Text>
                <Ionicons name = { 'md-chevron-forward' } size = { 25 } color={theme.COLORS.PRIMARY} style={styles.icon}/>  
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.menu} onPress={() => {navigation.navigate('orders')}}>
            <FontAwesome5 name="list-ol" size={24} color={theme.COLORS.PRIMARY} />
                <Text style={styles.text}>Orders</Text>
                <Ionicons name = { 'md-chevron-forward' } size = { 25 } color={theme.COLORS.PRIMARY} style={styles.icon}/>  
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.signOut} onPress={() => {
                firebase.auth().signOut().then(() => {
                    // Sign-out successful.
                    console.log('Sign Out success')
                    navigation.goBack();
                  }).catch((error) => {
                    // An error happened.
                  });
            }}>
                <Text style={styles.signOutText}>Sign Out</Text>
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
    menuTitle: {
        padding: 20,
        alignItems: 'center',
        height: 90,
        width: '100%',
    },
    menu: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        height: 60,
        width: '100%',
    },
    separator:{
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: theme.COLORS.PRIMARY,
    },
    text: {
        fontSize: 16,
        paddingLeft: 10

    },
    icon: {
        position: 'absolute',
        right: 10
    },
    signOutText: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
    },
    signOut: {
        position: 'absolute',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        backgroundColor: theme.COLORS.PRIMARY,
        bottom: 0,
    }
})