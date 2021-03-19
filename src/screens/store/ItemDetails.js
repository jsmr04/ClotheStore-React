import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";
const { width: screenWidth } = Dimensions.get("window");
import TabOptions from "../../components/TabOptions";
import theme from "../theme";
import Util from "../../helpers/Util";
import Storage from "../../backend/LocalStorage";
import Toast from "react-native-toast-message";
import firebase from "firebase";
import { NavigationActions } from 'react-navigation';

const { height } = Dimensions.get("window");

//Screen
export default ({ route, navigation }) => {
  const ref = useRef(null);
  const { item } = route.params;
  const [dataImages, setDataImages] = useState([]);
  const [firebaseUser, setFirebaseUser] = useState({});

  let [activeSlide, setActiveSlide] = useState(0);

  const sizes = () => {
    let itemSizes = [
      { key: 0, name: "XS", checked: false, onPress: () => {}, disable: true },
      { key: 1, name: "S", checked: false, onPress: () => {}, disable: true },
      { key: 2, name: "M", checked: false, onPress: () => {}, disable: true },
      { key: 3, name: "L", checked: false, onPress: () => {}, disable: true },
      { key: 4, name: "XL", checked: false, onPress: () => {}, disable: true },
      { key: 5, name: "2XL", checked: false, onPress: () => {}, disable: true },
    ];

    itemSizes.forEach((iSizes) => {
      item.size.forEach((si) => {
        if (si == iSizes.name) {
          iSizes.disable = false;
        }
      });
    });
    return itemSizes;
  };

  const checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      setFirebaseUser(user); //cloning object
      if (user) {
        userRoute = "account";
      } else {
        userRoute = "signin";
      }
    });
  };

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
    ({ item, index }, parallaxProps) => (
      <View style={styles.card} key={index}>
        <ParallaxImage
          source={{ uri: item.url }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.2}
          shouldComponentUpdate={true}
          {...parallaxProps}
        />
      </View>
    ),
    []
  );

  const addToCart = async () => {
    
    if (tabOptions.filter((x) => x.checked).length > 0) {
      let newQty = 0;
      let selectedSize = tabOptions.filter((x) => x.checked)[0].name;

      let currentCartData = await Storage.getAllDataForKey("cart")
      let currentCartItem = currentCartData.filter(x => x.item == item.id && x.size == selectedSize)[0]

      console.log("- CURRENT CART ITEM -");
      console.log(currentCartItem)

      if(currentCartItem == undefined){
        newQty = 1;
      }else{
        newQty = currentCartItem.quantity + 1;
      }

      console.log("- NEW CART ITEM -");
      console.log(item.id + "-" + selectedSize + "-" + newQty);

      if (selectedSize) {
        Storage.save({
          key: "cart",
          id: item.id + "-" + selectedSize,
          data: {
            item: item.id,
            size: selectedSize,
            quantity: newQty, 
          },
        }).then(() => {
          Toast.show({
            text1: "Hello there! 👋",
            text2: "This item was added into the Cart!",
            topOffset: 60,
          });
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: "Hello there! 👋",
        text2: "Please select the size!",
        topOffset: 60,
      });
    }
  };

  const goToCart = async ()=>{
    await addToCart();
    //navigation.navigate('Cart')
    //TODO: Implement navigation to CART
    navigation.navigate('TabRoot', { screen: 'Cart' });

    // navigation.navigate({
    //   routeName: 'home',
    //   params: {},
    //   action: navigation.navigate({ routeName: 'Cart'}),
    // });
    
    //navigation.dispatch(navigateAction);
  }


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "ClotheStore",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("signin")}>
          <Ionicons
            name={"person"}
            size={25}
            color={theme.COLORS.WHITE}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //States for images
  useEffect(() => {
    setDataImages(item.pictures);
  }, item.pictures);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Carousel
          ref={ref}
          data={dataImages}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          renderItem={renderItem}
          hasParallaxImages={true}
          enableMomentum={true}
          decelerationRate={0.9}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <View style={styles.viewTitle}>
          <Text style={styles.title}>{item.name}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: theme.COLORS.BLACK,
            }}
          >
            {"C" + Util.formatter.format(item.price)}
          </Text>
        </View>
        <View style={styles.viewBody}>
          <TabOptions
            options={tabOptions}
            highlightColor={theme.COLORS.PRIMARY}
            titleColor={theme.COLORS.TITLE}
            activeColor={theme.COLORS.BLACK}
          />
        </View>

        <View style={styles.viewDescriptionTitle}>
          <Text style={{ fontSize: 20 }}>Description</Text>
        </View>
        <View style={styles.viewDescriptionBody}>
          <Text style={{ fontSize: 17, textAlign: "justify" }}>
            {item.description}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.viewButtons}>
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBuy]}
            onPress={() => addToCart()}
          >
            <Text style={[styles.buttonText, { color: theme.COLORS.WHITE }]}>
              <Ionicons
                name={"cart-outline"}
                color={theme.COLORS.WHITE}
                style={styles.buttonIcon}
              />
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//Screen Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: theme.COLORS.WHITE,
  },
  card: {
    width: screenWidth - 60,
    height: 16 * 30,
  },
  scrollView: {
    height: height - 200,
    paddingTop: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
  },
  viewTitle: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "300",
  },
  viewBody: {
    padding: 10,
    marginTop: 10,
  },
  viewButtons: {
    width: "95%",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    height: 47,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonCart: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY,
  },
  buttonBuy: {
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  buttonText: {
    paddingLeft: 10,
    flex: 1,
    fontSize: 18,
    textAlignVertical: "center",
  },
  buttonIcon: {
    fontSize: 23,
  },
  viewDescriptionTitle: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
    borderBottomColor: theme.COLORS.BLACK,
    borderBottomWidth: 2,
  },
  viewDescriptionBody: {
    flex: 1,
    margin: 10,
    justifyContent: "space-evenly",
  },
});
