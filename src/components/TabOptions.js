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
        height:5,
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
                
                // <Text key = { key }  > { option.name }</Text>
                <TouchableOpacity key = { `touch-${key}` } style = {styles.tabTouchable} onPress = { () => option.onPress(key) }>
                    <Text key = { `text-${key}` } style = { [styles.tabText, { color: option.checked ? highlightColor : titleColor }] }>{ option.name }</Text>
                    <View key = { `view-${key}` } style = { [styles.tabHighlight, { backgroundColor: option.checked ? highlightColor : titleColor }] } />
                </TouchableOpacity>
            ))}

                {/* <TouchableOpacity style = {styles.tabTouchable} onPress = { () => checkOption(0) }>
                    <Text style = { [styles.tabText, { color: tabOptions[0].checked ? theme.COLORS.PRIMARY : theme.COLORS.TITLE }] }>{ tabOptions[0].name }</Text>
                    <View style = { [styles.tabHighlight, { backgroundColor: tabOptions[0].checked ? theme.COLORS.PRIMARY : theme.COLORS.TITLE }] } />
                </TouchableOpacity> */}
                {/* <TouchableOpacity style = {styles.tabTouchable} onPress = { () => checkOption(1) }>
                    <Text style = { [styles.tabText, { color: tabOptions[1].checked ? theme.COLORS.PRIMARY : theme.COLORS.TITLE }] } >{ tabOptions[1].name }</Text>
                    <View style = { [styles.tabHighlight, { backgroundColor: tabOptions[1].checked ? theme.COLORS.PRIMARY : theme.COLORS.TITLE }] } />
                </TouchableOpacity>
                <TouchableOpacity style = {styles.tabTouchable} onPress = { () => checkOption(2) }>
                    <Text style = { [styles.tabText, { color: tabOptions[2].checked ? theme.COLORS.PRIMARY : theme.COLORS.TITLE }] }>{ tabOptions[2].name }</Text>
                    <View style = { [styles.tabHighlight, { backgroundColor: tabOptions[2].checked ? theme.COLORS.PRIMARY : theme.COLORS.TITLE }] } />
                </TouchableOpacity> */}
         </View>
        
    )
}