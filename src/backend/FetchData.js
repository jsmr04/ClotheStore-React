import { useState, useEffect } from "react";
import FirebaseConfig from "./FirebaseConfig";

export default (path) => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  const getDataFromFirebase = () => {
    let tmpData = [];
    //Init Firebase
    const firebase = FirebaseConfig();
    //Database
    const productRef = firebase.database().ref(path);

    //Get data from Firebase
    productRef.once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        tmpData.push(childSnapshot.val());
      });

      //Update states
      setLoading(false);
      setData(tmpData);
    });
  };
  console.log('getting data from firebase')
  return { loading, data };
};
