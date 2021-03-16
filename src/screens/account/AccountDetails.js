import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from "../theme";


export default ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Account Details',
        })
    });
    return (
        <View style = { styles.container }>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{uri: "https://ui-avatars.com/api/?size=256&background=5a2d82&color=fff&name=John+Doe"}} ></Image>
            </View>
            <View style={styles.detailsContainer}>
                <TextInput style={styles.input} placeholder="First Name"></TextInput>
                <TextInput style={styles.input} placeholder="Last Name"></TextInput>
                <TextInput style={styles.input} placeholder="Email"></TextInput>
            </View>
            <TouchableOpacity style={styles.save} >
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
        marginTop: 40,
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