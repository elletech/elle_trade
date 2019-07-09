<template>
    <h1>{{doc_id}}</h1>
</template>

<script>
    import firebase from 'firebase';
    require('firebase/firestore');

    //firebaseのconfigファイルの場所
    //import {firebaseConfig} from '../firebase/config.jsx';
    //firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();
    var docRef = db.collection("trades").where("accountBalance", "==", "123444");

    docRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    export default {
        name: 'App',
        doc_id: 'a'
    };
</script>
