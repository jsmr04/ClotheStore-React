import React, {useState, useLayoutEffect, useEffect} from "react";
import { ActivityIndicator, RefreshControl, View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import fetchData from "../../backend/FetchData";
import FirebaseConfig from "../../backend/FirebaseConfig";
import Card from "../../components/Card";
import Block from "../../components/Block";
import theme from "../theme";
import Util from "../../helpers/Util"
import Storage from "../../backend/LocalStorage";
import { NavigationEvents, NavigationActions } from "react-navigation";

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

//Screen
export default ({navigation}) => {
  const firebase = FirebaseConfig();
  const productRef = firebase.database().ref('/product');
  const [arrayFavorites, setArrayFavorites] = useState([])

  let onEndReachedCallDuringMomentum = false;

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [lastDoc, setLastDoc] = useState(null);
  let [isMoreLoading, setIsMoreLoading] = useState(false);
  let userRoute;
  
  const onRefresh = () => {
    getProducts();
  };

  function loadFavorites() {
    //console.log('loadFavorites')
    Storage.getIdsForKey('favorite')
    .then(favorites => {
      setArrayFavorites(favorites)
      setLoading(false)
    })
  }
  
  function checkfavorites(itemId){
    //console.log('checkfavorites')
    var icon = "heart-outline"
    arrayFavorites.forEach(i =>{
      if(i == itemId){
        icon = "heart"
      } 
    })
    return icon;
  }

  useEffect(() => {
    getProducts();
    loadFavorites();
  }, []);

  getProducts = () => {
    setLoading(true)

    productRef.limitToFirst(4).once("value", function (snapshot) {
        if(!snapshot.empty){
          //console.log(snapshot)
          let newProducts = [];
          var intNum = 0;
          snapshot.forEach(function (childSnapshot) {
            newProducts.push(childSnapshot.val());
            //console.log(childSnapshot.key);
            intNum = parseInt(childSnapshot.child('id').val()) + 1
            if(intNum > 9){
              setLastDoc("0" + intNum);
            }else {
              setLastDoc("00" + intNum)
            }
          })
          setProducts(newProducts);
          //console.log(lastDoc)
        } else {
          setLastDoc(null)
        }
        setLoading(false);
    });
  }

  getMore = async () => {
    //alert("getMore")
    if(lastDoc){
      setIsMoreLoading(true);
      //alert(lastDoc.id)
      productRef.orderByChild('id').startAt(lastDoc).once("value", function (snapshot) {
        if(snapshot.exists){
          console.log(snapshot)
            let newProducts = products;
            //console.log(snapshot)
            snapshot.forEach(function (childSnapshot) {
              
              newProducts.push(childSnapshot.val());
              setLastDoc(childSnapshot.val())
            })
            setProducts(newProducts);
            if(snapshot.numChildren() < 4) setLastDoc(null)
        } else {
          alert("is null")
          setLastDoc(null)
        }
      });
      setIsMoreLoading(false);
    }
    onEndReachedCallDuringMomentum = true;
  }

  renderFooter = () => {
    if (!isMoreLoading) return true;
    return (
      <ActivityIndicator style={{marginBottom: 10 }} size='large' color = { theme.COLORS.PRIMARY } />
    )
  }

  useLayoutEffect(() => {
    checkAuth();
    navigation.setOptions({
      title: 'ClotheStore',
      headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate(userRoute)}>
              <Ionicons name = { 'person' } size = { 25 } color={theme.COLORS.WHITE} style={{marginRight: 10}}/>  
          </TouchableOpacity>
      ),
    })
  }, [navigation]);

  const checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          userRoute = 'account'
        }else {
          userRoute = 'signin'
        }
    })
  }

  const reloadData = (payload)=>{
    if (payload && payload.action.routeName === "Home") {
      setLoading(true);
      loadFavorites();
    }
  }

  return (
    <View style={styles.container}> 
      <NavigationEvents onDidFocus={(payload) => reloadData(payload)} />
      { loading ? 
        <ActivityIndicator style={styles.activity}  size='large' color = { theme.COLORS.PRIMARY } />  
      : 
      <FlatList
        data={products}
        style={styles.list}
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
        ListFooterComponent={renderFooter}
        initialNumToRender ={4}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold = {0.2}
        onMomentumScrollBegin = {() => {onEndReachedCallDuringMomentum = false;}}
        onEndReached = {() => {
          if (!onEndReachedCallDuringMomentum && !isMoreLoading) {
            getMore();
          } 
        }}
      />
    }
    </View>
  );
};
