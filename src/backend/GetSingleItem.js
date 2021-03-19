import { useState, useEffect } from "react";
import FirebaseConfig from "./FirebaseConfig";

export default (path) => {
  let [item, setItem] = useState({});
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  const getDataFromFirebase = () => {
    //Init Firebase
    const firebase = FirebaseConfig();
    //Database
    const productRef = firebase.database().ref(path);

    //Get data from Firebase
    productRef.once("value", function (snapshot) {
      setLoading(false);
      setItem(snapshot);
    });
  };

  return { loading, item };
};
