import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const styles = StyleSheet.create({
    tabContainer:{
        flexDirection: 'row',
        justifyContent:'center'
    },
    tabText:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Platform.OS === 'android' ? 'Roboto' :  'Helvetica',
    },
    tabHighlight:{
        marginTop:5,
        height:3,
        width:'100%',
    },
    tabTouchable:{
        flex:1,
        marginHorizontal:3,
    }
})


export default ({ options, titleColor, highlightColor }) =>{

    return (
        <View style = { styles.tabContainer }>
            { options && options.map((option, key) =>(
                <TouchableOpacity key = { `touch-${key}` } style = {styles.tabTouchable} onPress = { () => option.onPress(key) }>
                    <Text key = { `text-${key}` } style = { [styles.tabText, { color: option.checked ? highlightColor : titleColor }] }>{ option.name }</Text>
                    <View key = { `view-${key}` } style = { [styles.tabHighlight, { backgroundColor: option.checked ? highlightColor : titleColor }] } />
                </TouchableOpacity>
            ))}
         </View>
        
    )
}