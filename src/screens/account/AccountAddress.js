import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from "../theme";


export default ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Address',
        })
    });
    return (
        <View style = { styles.container }>
            <View>
                <Text>Delivery Address</Text>
            </View>
            <View style={styles.detailsContainer}>
                <TextInput style={styles.input} placeholder="Address"></TextInput>
                <TextInput style={styles.input} placeholder="Province/State"></TextInput>
                <TextInput style={styles.input} placeholder="Country"></TextInput>
                <TextInput style={styles.input} placeholder="Postal Code"></TextInput>
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
    topHeader: {

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