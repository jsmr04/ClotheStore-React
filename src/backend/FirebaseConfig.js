import * as firebase from "firebase";

//Firtebase configuration
export default () => {
    if (firebase.apps.length == 0){
        const firebaseConfig = {
            apiKey: "AIzaSyDcB0CQFIgzUeIMOow8oP9Gnf7qRfy4BRM",
            authDomain: "clothestore-484a8.firebaseapp.com",
            databaseURL: "https://clothestore-484a8-default-rtdb.firebaseio.com",
            projectId: "clothestore-484a8",
            storageBucket: "clothestore-484a8.appspot.com",
            messagingSenderId: "521700687251",
            appId: "1:521700687251:web:c0883920e68ec45cce3c66",
            measurementId: "G-TNNQPZMKVB"
        };
        
        firebase.initializeApp(firebaseConfig);
    }
    
    return firebase;
};
