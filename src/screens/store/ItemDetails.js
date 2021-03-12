import React, {useCallback, useRef, useState, useEffect} from "react";
import { ActivityIndicator, View, StyleSheet, Text, Dimensions, StatusBar, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import fetchData from "../../backend/FetchData";
import Carousel from "react-native-snap-carousel";
import TabOptions from "../../components/TabOptions";
import theme from "../theme";

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center',
    backgroundColor: theme.COLORS.WHITE,
  },
  scrollView: {
      flex:0.7,
  },
  image: {
    width: 400,
    height: 16*25,
  },
  viewTitle: {
    padding: 10,
    flex:1, 
    alignItems: 'center'
  },
  title: {
      fontSize: 25,
      textAlign: 'center'
  },
  viewBody: {
    flex:1,
    padding:10,
    marginTop: 10,
  },
  viewButtons: {
    flex: 1,
    position: 'relative',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    flex:1,
    height: 47,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems:'center'
  },
  buttonCart: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY
  },
  buttonBuy: {
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  buttonText:{
    paddingLeft:10,
    flex:1,
    fontSize: 18,
    textAlignVertical: 'center',
  },
  buttonIcon: {
    fontSize: 23,
  },
  viewDescriptionTitle: {
    flex:1,
    marginTop: 20,
    marginHorizontal:10,
    borderBottomColor: theme.COLORS.BLACK,
    borderBottomWidth:2 
  },
  viewDescriptionBody: {
    flex:1,
    margin:10,
    justifyContent: 'space-evenly'
  }
});


//Screen
export default ({route, navigation}) => {
    const ref = useRef(null);
    const { item } = route.params;

    const sizes = () => {
      let itemSizes = [
        { key: 0, name: "XS", checked: false, onPress: () => {}, disable: true},
        { key: 1, name: "S", checked: false, onPress: () => {}, disable: true },
        { key: 2, name: "M", checked: false, onPress: () => {}, disable: true },
        { key: 3, name: "L", checked: false, onPress: () => {}, disable: true },
        { key: 4, name: "XL", checked: false, onPress: () => {}, disable: true },
        { key: 5, name: "2XL", checked: false, onPress: () => {}, disable: true },
      ];

      itemSizes.forEach(iSizes => {
          item.size.forEach(si => {
              if(si == iSizes.name){
                iSizes.disable = false
              }
          });
      });
      return itemSizes;
    }

    // { key: 0, name: "XS", checked: false, onPress: () => {}, disable: false},
    //   { key: 1, name: "S", checked: false, onPress: () => {}, disable: false },
    //   { key: 2, name: "M", checked: false, onPress: () => {}, disable: false },
    //   { key: 3, name: "L", checked: false, onPress: () => {}, disable: false },
    //   { key: 4, name: "XL", checked: false, onPress: () => {}, disable: false },
    //   { key: 5, name: "2XL", checked: false, onPress: () => {}, disable: false },

    //Options configuration
    const [tabOptions, setTabOptions] = useState(sizes);

    //Check option onPreess event
    const checkOption = (key) => {
        let newTabOptions = [];

        tabOptions.forEach((x) => {
        if (x.key == key) {
            x.checked = true;
        } else {
            x.checked = false;
        }
        newTabOptions.push(x);
        });
        setTabOptions(newTabOptions);
    };

    //Assign function
    useEffect(() => {
        let newTabOptions = [];
        tabOptions.forEach((x) => {
        //onPress function
        x.onPress = checkOption;
        newTabOptions.push(x);
        });

        setTabOptions(newTabOptions);
    }, []);

    const renderItem = useCallback(
        ({ item, index }) => (
            <View style={styles.container} key={index}>
                <Image
                source={{ uri: item.url }}
                style={styles.image}
                />
            </View>
        ),
        []
    );

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
        <ScrollView style={styles.scrollView}>
            <View style={{flex:1, borderBottomColor: 'lightgray', borderBottomWidth: 2}}>
                <Carousel
                layout={"tinder"}
                ref={ref}
                data={item.pictures}
                sliderWidth={500}
                itemWidth={500}
                renderItem={renderItem}
                useScrollView={true}
                />
            </View>
            <View style={styles.viewTitle}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.viewBody}>
                <TabOptions
                options={tabOptions}
                highlightColor={theme.COLORS.PRIMARY}
                titleColor={theme.COLORS.TITLE}
                activeColor={theme.COLORS.BLACK}
                />
            </View>
            <View style={[styles.viewButtons, {marginTop: 20,}]}>
                <TouchableOpacity style={[styles.button, styles.buttonCart]}>
                    <Text style={[styles.buttonText, {color: theme.COLORS.PRIMARY,}]}>
                    <Ionicons name = { 'cart-outline' } color = {theme.COLORS.PRIMARY} style={styles.buttonIcon}/>
                    Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.viewButtons, {marginTop: 10,}]}>
                <TouchableOpacity style={[styles.button, styles.buttonBuy]}>
                    <Text style={[styles.buttonText, {color: theme.COLORS.WHITE,}]}>
                        <Ionicons name = { 'arrow-forward' } color = {theme.COLORS.WHITE} style={styles.buttonIcon}/>
                        Buy it now
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.viewDescriptionTitle}>
                <Text style={{fontSize: 20}}>Description</Text> 
            </View>
            <View style={styles.viewDescriptionBody}> 
                <Text style={{fontSize: 17, textAlign:'justify'}}>{item.description}</Text>
            </View>
        </ScrollView>
      
    </View>
  );
};
