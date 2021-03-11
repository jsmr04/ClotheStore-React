import theme from "../theme";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, StyleSheet, Text, Image, Platform, Dime, Dimensions } from "react-native";
import { SearchBar } from "react-native-elements";
import TopBar from "../../components/TopBar";
import TabOptions from "../../components/TabOptions";
import fetchData from "../../backend/FetchData";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

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
    height: Dimensions.get('window').height - 350,
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
    height: Dimensions.get('window').height - 400,
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

export default () => {
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const ref = useRef(null);
  //Getting categories
  let { loading, data: categories } = fetchData("category/");

  //Options configuration
  const [tabOptions, setTabOptions] = useState([
    { key: 0, name: "Women", checked: true, onPress: () => {} },
    { key: 1, name: "Men", checked: false, onPress: () => {} },
    { key: 2, name: "Kids", checked: false, onPress: () => {} },
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
    <View style={styles.container}>
      <TopBar />
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
      <View style={{ alignSelf: "center", height: 570 }}>
        <Carousel
          layout={"default"}
          ref={ref}
          data={categories}
          sliderWidth={400}
          itemWidth={300}
          renderItem={renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => setCategoryIndex(index)}
        />
      </View>
    </View>
  );
};
