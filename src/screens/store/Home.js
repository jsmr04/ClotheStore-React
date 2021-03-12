import React from "react";
import { ActivityIndicator, RefreshControl, View, StyleSheet, FlatList, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import fetchData from "../../backend/FetchData";
import Card from "../../components/Card";
import Block from "../../components/Block";
import theme from "../theme";
import Util from "../../helpers/Util"
import Storage from "../../backend/LocalStorage";

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});

let arrayFavorites = []

function loadFavorites() {
  Storage.getIdsForKey('favorite')
  .then(favorites => {
    arrayFavorites = favorites
  })
}

function checkfavorites(itemId){
  var icon = "heart-outline"
  arrayFavorites.forEach(i =>{
    if(i == itemId){
      icon = "heart"
    } 
  })
  return icon;
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

//Screen
export default ({navigation}) => {
  let { loading, data: products } = fetchData("product/");
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  loadFavorites();
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.COLORS.PRIMARY}></StatusBar>
      { loading ? 
        <ActivityIndicator style={styles.activity}  size='large' color = { theme.COLORS.PRIMARY } />  
      : 
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
                itemId={item.id}
                activeIcon={checkfavorites(item.id)}
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
  );
};
