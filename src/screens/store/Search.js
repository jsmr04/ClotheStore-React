import React, { useState, useEffect, useCallback, useRef } from "react";
import { SafeAreaView, View, StyleSheet, Text, Platform, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { SearchBar } from "react-native-elements";
import TabOptions from "../../components/TabOptions";
import fetchData from "../../backend/FetchData";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Ionicons } from '@expo/vector-icons';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    height: Dimensions.get('window').height - 300 ,
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.COLORS.TITLE,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  categoryText: {
    fontSize: 22,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica",
  },
  categoryImage: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default ({navigation}) => {
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const ref = useRef(null);
  //Getting categories
  let { loading, data: categories } = fetchData("category/");

  //SettingUp the top Header style
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

  //Options configuration
  const [tabOptions, setTabOptions] = useState([
    { key: 0, name: "Women", checked: true, onPress: () => {}},
    { key: 1, name: "Men", checked: false, onPress: () => {}},
    { key: 2, name: "Kids", checked: false, onPress: () => {}},
  ]);

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

  //Render carousel
  const renderItem = useCallback(
    ({ item, index }, parallaxProps) => (
      <View style={styles.card}>
        <ParallaxImage
          source={{ uri: item.url }}
          containerStyle={styles.imageContainer}
          style={styles.categoryImage}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <View style={{ alignSelf: "stretch", height: 49 }}>
          <Text style={styles.categoryText}>
            {item.categoryName.toUpperCase()}
          </Text>
        </View>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.COLORS.PRIMARY}></StatusBar>
      <SearchBar
        containerStyle={styles.searchContainer}
        inputContainerStyle={{ backgroundColor: "transparent" }}
        placeholder={"Find products..."}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        showCancel={true}
        searchIcon={{ size: 24 }}
        cancelIcon={{ size: 24 }}
      />
      <TabOptions
        options={tabOptions}
        highlightColor={theme.COLORS.PRIMARY}
        titleColor={theme.COLORS.TITLE}
      />
      <View style={{ alignSelf: "center" }}>
        <Carousel
          layout={"default"}
          ref={ref}
          data={categories}
          sliderWidth={400}
          itemWidth={320}
          renderItem={renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => setCategoryIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};
