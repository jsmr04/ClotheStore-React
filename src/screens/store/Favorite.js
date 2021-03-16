import React from 'react';
import { ActivityIndicator, FlatList, Dimensions, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import fetchData from "../../backend/FetchData";
import Card from "../../components/Card";
import Block from "../../components/Block";
import { Ionicons } from '@expo/vector-icons';
import Util from "../../helpers/Util";
import theme from "../theme";
import Storage from "../../backend/LocalStorage";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
    },
    list: {
        marginTop: 5,
        alignSelf: "stretch",
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor:'white'
    },
      cardImage: {
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
      activity: {
        position:'absolute', 
        top: Dimensions.get('window').height / 2 , 
        right: Dimensions.get('window').width / 2 - 20
    },
})

let arrayFavorites = []
let newData = []

function loadFavorites() {
    Storage.getIdsForKey('favorite')
    .then(favorites => {
      arrayFavorites = favorites
    })
    console.log(arrayFavorites);
}

const checkItemExists = (data, id) => {
    return data.find(data => data.id === id);
}; 

function loadFavoritesOnPage (data) {
    newData = []
    arrayFavorites.forEach(f => {
        newData.push(checkItemExists(data, f));
    });
}

function load(data) {
    loadFavorites();
    loadFavoritesOnPage(data);

}

export default ({navigation}) => {
    let { loading, data: products } = fetchData("product/");
    load(products);
    console.log(products);
    console.log(newData);
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
          title: 'ClotheStore',
          headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('signin')}>
                  <Ionicons name = { 'person' } size = { 25 } color={theme.COLORS.WHITE} style={{marginRight: 10}}/>  
              </TouchableOpacity>
          ),
        })
      }, [navigation]);

    return (
        <View style = { styles.container }>
            { loading ? 
                <ActivityIndicator style={styles.activity}  size='large' color = { theme.COLORS.PRIMARY } />  
            : 
                <FlatList
                    style={styles.list}
                    data={products}
                    keyExtractor={(x) => x.id}
                    renderItem={({ item }) => {
                    return (
                        <Block space='between' >
                        <Card
                            style={styles.card}
                            flex
                            borderLess
                            shadowColor={theme.COLORS.BLACK}
                            title={item.name}
                            location={'C' + Util.formatter.format(item.price)}
                            imageStyle={styles.cardImage}
                            image={item.pictures[0].url}
                            onPress={() => {
                            navigation.navigate('item', {
                                item: item,
                            });
                            }}
                        />
                        </Block>
                    );
                    }}
                />
            }
        </View> 
    )
}