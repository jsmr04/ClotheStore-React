import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GetSingleItem from "../../backend/GetSingleItem";
import Util from "../../helpers/Util";
import theme from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomModal from "../../components/CustomModal";
import firebase from "firebase";
import Toast from "react-native-toast-message";
import Storage from "../../backend/LocalStorage";

const SHIPPING_FEE = 9.99;
const TAX_RATE = 0.13;

export default ({ route, navigation }) => {
  let userId = route.params.userId;
  let cartData = route.params.cartData;
  let { item: userInfoItem } = GetSingleItem("userInfo/" + userId);
  let [userInfo, setUserInfo] = useState({});
  let [cardName, setCardName] = useState("");
  let [cardNumber, setCardNumber] = useState("");
  let [cardExpDate, setCardExpDate] = useState("");
  let [cardCVV, setCardCVV] = useState("");
  let [taxAmount, setTaxAmount] = useState(0);
  let [totalAmount, setTotalAmount] = useState(0);
  let [visibility, setVisibility] = useState(false);

  let [fullName, setFullName] = useState("");
  let [address, setAddress] = useState("");
  let [state, setState] = useState("");
  let [zip, setZip] = useState("");
  let [country, setCountry] = useState("");

  const calculateTotals = () => {
    if (cartData.length > 0) {
      //Calculate tax
      setTaxAmount(
        cartData.reduce((sum, x) => {
          sum += x.quantity * x.price * TAX_RATE;
          return sum;
        }, 0)
      );

      //Calculate total amount
      setTotalAmount(
        cartData.reduce((sum, x) => {
          sum += x.quantity * x.price * (1 + TAX_RATE);
          return sum;
        }, 0) + SHIPPING_FEE
      );
    } else {
      setTaxAmount(0);
      setTotalAmount(0);
    }
  };

  const updateAddress = () => {
    if (
      fullName != "" &&
      address != "" &&
      country != "" &&
      state != "" &&
      zip != ""
    )
      setUserInfo({
        fullName: fullName,
        address: address,
        country: country,
        state: state,
        zip: zip,
      });
    setVisibility(false);
  };

  useEffect(() => {
    console.log("calculateTotals()");
    calculateTotals();
  }, [cartData]);

  useEffect(() => {
    if (userInfoItem != undefined) {
      if (typeof userInfoItem.val == "function") {
        setUserInfo({
          fullName:
            userInfoItem.val().firstName + " " + userInfoItem.val().lastName,
          address: userInfoItem.val().address,
          country: userInfoItem.val().country,
          state: userInfoItem.val().state,
          zip: userInfoItem.val().zip,
          email: userInfoItem.val().email,
        });

        setFullName(
          userInfoItem.val().firstName + " " + userInfoItem.val().lastName
        );
        setAddress(userInfoItem.val().address);
        setState(userInfoItem.val().state);
        setZip(userInfoItem.val().zip);
        setCountry(userInfoItem.val().country);
      }
    }
  }, [userInfoItem]);

  const placeOrder = async () => {
    if (checkInputs()) {
      let items = [];
      let dateTime = Util.getDate();
      let orderId = Math.floor(Math.random() * 999999)
        .toString()
        .padStart(6, "0");

      cartData.forEach((x) => {
        items.push({
          productId: x.id,
          name: x.name,
          quantity: x.quantity,
          size: x.size,
          price: x.price,
          subtotal: Number(x.quantity) * Number(x.price),
        });
      });

      if (items.length > 0) {
        const order = {
          orderId: orderId,
          dateTime: dateTime,
          userId: userId,
          fullName: fullName,
          email: userInfo.email,
          address: userInfo.address,
          state: userInfo.state,
          country: userInfo.country,
          zip: userInfo.zip,

          cardName: cardName,
          cardNumber: cardNumber,
          cardExpDate: cardExpDate,
          cardCVV: cardCVV,

          subTotal: totalAmount - (taxAmount + SHIPPING_FEE),
          tax: taxAmount,
          shippingFee: SHIPPING_FEE,
          total: totalAmount,

          status: "PENDING",

          items: items,
        };

        let newOrderKey = firebase.database().ref().child("order").push().key;

        try {
          //Create order on Firebase
          await firebase.database().ref(`order/${newOrderKey}`).set(order);
          //Clear the cartt
          await Storage.clearMapForKey("cart");
          //Show toast message
          Toast.show({
            text1: "Hello there! 👋",
            text2: `The order #${orderId} has been placed.`,
          });

          //Replace screen
          //navigation.replace('home');
          //TODO: There is a bug here, CART is not being cleared
          navigation.goBack();
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const checkInputs = () => {
    if (cardName == "") {
      showAlert("Card Name");
      return false;
    }

    if (cardNumber == "") {
      showAlert("Card Number");
      return false;
    }

    if (cardExpDate == "") {
      showAlert("Exp. Date");
      return false;
    }

    if (cardCVV == "") {
      showAlert("CVV");
      return false;
    }

    return true;
  };

  const showAlert = (inputName) => {
    let message = `${inputName} is required!`;

    Toast.show({
      type: "error",
      text1: "Attention! 👋",
      text2: message,
      position: "bottom",
      topOffset: 60,
      bottomOffset: 80,
    });
  };

  const getHeader = () => {
    return (
      <View style={{ alignSelf: "stretch" }}>
        <View style={styles.topContainer}>
          <View
            style={{
              paddingVertical: 35,
              paddingHorizontal: 35,
              flexDirection: "row",
            }}
          >
            <Ionicons name="location-outline" size={26} color="black" />
            <View style={{ paddingHorizontal: 15, width: "85%" }}>
              <Text>{userInfo.fullName}</Text>
              <Text>{userInfo.address}</Text>
              <Text>
                {userInfo.state} {userInfo.zip}
              </Text>
              <Text>{userInfo.country}</Text>
            </View>
            <TouchableOpacity onPress={() => setVisibility(true)}>
              <Ionicons name="pencil-outline" size={20} color="blue" />
            </TouchableOpacity>
          </View>
        </View>

        <View styles={styles.creditCard}>
          <Text style={styles.title}>PAYMENT</Text>
          <View style={styles.separator} />
          <View style={[styles.middleContainer]}>
            <Text style={styles.textConnerLeft}>Card Name</Text>
            <TextInput
              style={styles.input}
              maxLength={25}
              placeholder={"John Wick"}
              onChangeText={(text) => setCardName(text)}
              value={cardName}
            />
          </View>
          <View style={[styles.middleContainer]}>
            <Text style={styles.textConnerLeft}>Card Number</Text>
            <TextInput
              style={styles.input}
              maxLength={19}
              placeholder={"4444-5555-6666-7777"}
              onChangeText={(text) => setCardNumber(text)}
              value={cardNumber}
            />
          </View>
          <View style={[styles.middleContainer]}>
            <Text style={styles.textConnerLeft}>Exp. Date</Text>
            <TextInput
              style={[styles.input, { width: 115 }]}
              maxLength={5}
              placeholder={"12/22"}
              onChangeText={(text) => setCardExpDate(text)}
              value={cardExpDate}
            />
            <Text style={styles.textConnerLeft}>CVV</Text>
            <TextInput
              style={[styles.input]}
              placeholder={"123"}
              keyboardType={"numeric"}
              maxLength={3}
              onChangeText={(text) => setCardCVV(text)}
              value={cardCVV}
            />
          </View>
          <Text style={styles.title}>items</Text>
          <View style={[styles.separator, { marginBottom: 10 }]} />
        </View>
      </View>
    );
  };

  const getAddressModal = () => {
    return (
      <CustomModal
        title={"SHIPPING ADDRESS"}
        visible={visibility}
        onCancel={() => setVisibility(false)}
        onSave={() => updateAddress()}
      >
        <View style={styles.modalInputContainers}>
          <TextInput
            style={[styles.input, { fontSize: 20 }]}
            placeholder={"Full Name"}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
          <TextInput
            style={[styles.input, { fontSize: 20 }]}
            placeholder={"Address"}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          <TextInput
            style={[styles.input, { fontSize: 20 }]}
            placeholder={"State"}
            onChangeText={(text) => setState(text)}
            value={state}
          />
          <TextInput
            style={[styles.input, { fontSize: 20 }]}
            placeholder={"Country"}
            onChangeText={(text) => setCountry(text)}
            value={country}
          />
          <TextInput
            style={[styles.input, { fontSize: 20 }]}
            placeholder={"Zip Code"}
            onChangeText={(text) => setZip(text)}
            value={zip}
          />
        </View>
      </CustomModal>
    );
  };

  const getFooter = () => {
    return (
      <View>
        <View style={styles.summary}>
          <Text
            style={[styles.title, { marginVertical: 5, marginHorizontal: -3 }]}
          >
            ORDER SUMMARY
          </Text>
          {getItems()}
          <View style={styles.summaryText}>
            <Text style={styles.textConnerLeft}>Shipping</Text>
            <Text style={styles.textConnerRight}>{`C${Util.formatter.format(
              SHIPPING_FEE
            )}`}</Text>
          </View>
          <View style={styles.summaryText}>
            <Text style={styles.textConnerLeft}>Tax</Text>
            <Text style={styles.textConnerRight}>{`C${Util.formatter.format(
              taxAmount
            )}`}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.total}>
          <Text
            style={[
              styles.textConnerLeft,
              { color: "black", fontWeight: "700" },
            ]}
          >
            TOTAL
          </Text>
          <Text
            style={[styles.textConnerRight, { fontWeight: "700" }]}
          >{`C${Util.formatter.format(totalAmount)}`}</Text>
        </View>
      </View>
    );
  };

  const getItems = () => {
    let allItems = [];

    cartData.forEach((i) => {
      let tmp = (
        <View key={i.id} style={styles.summaryText}>
          <Text style={styles.textConnerLeft}>
            {i.quantity}X {i.name}
          </Text>
          <Text style={styles.textConnerRight}>{`C${Util.formatter.format(
            Number(i.quantity) * Number(i.price)
          )}`}</Text>
        </View>
      );
      allItems.push(tmp);
    });
    return allItems;
  };

  const geItemList = () => {
    return (
      <View>
        {cartData &&
          cartData.map((item, key) => (
            <View
              key={key}
              style={[
                styles.cardContainer,
                { borderRightColor: theme.COLORS.PRIMARY },
              ]}
            >
              <Image
                style={styles.image}
                source={{ uri: item.pictures[0].url }}
              />
              <View style={styles.textContainer}>
                {/* First line  */}
                <Text style={{ fontWeight: "700", marginTop: 10 }}>
                  {item.name}
                </Text>
                <Text>
                  {item.size} {item.quantity} Items
                </Text>
                <Text>{item.id}</Text>
                <Text style={styles.priceText}>{`C${Util.formatter.format(
                  item.price
                )}`}</Text>
              </View>
            </View>
          ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {getAddressModal()}
      <ScrollView>
        {getHeader()}
        {geItemList()}
        {getFooter()}
      </ScrollView>
      <View style={{ marginTop: 10, height: 60 }}>
          <TouchableOpacity
            onPress={() => placeOrder()}
            style={[styles.button, styles.checkoutBuy]}>
            <Text style={[styles.buttonText, { color: theme.COLORS.WHITE }]}>
              <Ionicons
                name={"arrow-forward"}
                color={theme.COLORS.WHITE}
                style={styles.buttonIcon}
              />
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "flex-start",
    backgroundColor: theme.COLORS.WHITE,
  },
  separator: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: theme.COLORS.TITLE,
    opacity: 0.3,
  },
  topContainer: {
    // flex: 1,
  },
  middleContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textConnerLeft: {
    color: theme.COLORS.TITLE,
    textAlign: "left",
    alignSelf: "center",
    fontSize: 15,
  },
  textConnerRight: {
    flex: 1,
    textAlign: "right",
  },
  shipment: {
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  statusShipment: {
    textTransform: "lowercase",
    textTransform: "capitalize",
    marginStart: 5,
  },
  title: {
    marginHorizontal: 10,
    textTransform: "uppercase",
    fontSize: 15,
    fontWeight: "700",
  },
  summary: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  summaryText: {
    flexDirection: "row",
    marginVertical: 5,
  },
  total: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 6,
    borderWidth: 0.4,
    borderTopColor: theme.COLORS.TITLE,
    borderLeftColor: theme.COLORS.TITLE,
    borderBottomColor: theme.COLORS.TITLE,
    borderRadius: 5,
    backgroundColor: theme.COLORS.WHITE,

    borderRightWidth: 10,
  },
  image: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  textContainer: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  activity: {
    position: "absolute",
    top: Dimensions.get("window").height / 2,
    right: Dimensions.get("window").width / 2 - 20,
  },
  textResults: {
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    color: theme.COLORS.PRIMARY,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  addText: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "600",
    color: theme.COLORS.TITLE,
  },
  addTouch: {
    flex: 1,
    alignSelf: "flex-end",
    marginHorizontal: 3,
  },
  priceText: {
    textAlign: "left",
    fontWeight: "700",
    fontStyle: "italic",
    fontSize: 14,
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
  },
  priceView: {
    flex: 1,
    alignSelf: "flex-end",
  },
  nameText: {
    flexWrap: "wrap",
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 15,
    flex: 10,
  },
  creditCard: {
    flexDirection: "column",
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: 5,
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
    fontSize: 16,
    borderBottomColor: "#EEE",
    borderBottomWidth: 0.5,
    width: "100%",
    alignSelf: "flex-end",
  },
  button: {
    height: 47,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonCart: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY,
  },
  checkoutBuy: {
    borderWidth: 1,
    borderColor: theme.COLORS.PRIMARY,
    backgroundColor: theme.COLORS.PRIMARY,
  },
  buttonText: {
    paddingLeft: 10,
    flex: 1,
    fontSize: 20,
    textAlignVertical: "center",
    fontFamily: theme.FONT.DEFAULT_FONT_FAMILY,
  },
  modalInputContainers: {
    alignSelf: "stretch",
    paddingHorizontal: 10,
  },
});
