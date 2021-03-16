import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from "../theme";

export default ({navigation}) => {
    return (
        <View style = { styles.container }>
            <TouchableOpacity style={styles.menu} onPress={() => {navigation.navigate('profile')}}>
                <Text style={styles.text}>Profile</Text>
                <Ionicons name = { 'md-chevron-forward' } size = { 25 } color={theme.COLORS.PRIMARY} style={styles.icon}/>  
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.menu} onPress={() => {navigation.navigate('address')}}>
                <Text style={styles.text}>Address</Text>
                <Ionicons name = { 'md-chevron-forward' } size = { 25 } color={theme.COLORS.PRIMARY} style={styles.icon}/>  
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.menu} onPress={() => {navigation.navigate('orders')}}>
                <Text style={styles.text}>Orders</Text>
                <Ionicons name = { 'md-chevron-forward' } size = { 25 } color={theme.COLORS.PRIMARY} style={styles.icon}/>  
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.signOut} >
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
        fontSize: 15,
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