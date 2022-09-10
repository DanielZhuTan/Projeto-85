import React, { Component } from "react";
import { Text, View} from "react-native";

export default class LoginScreen extends Component {
     
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              return true;
            }
          }
        }
        return false;
    };

    onSignIn = googleUser => {
        // Precisamos registrar um Observer (observador) no Firebase Auth para garantir que a autenticação seja inicializada.
        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Verifique se já estamos conectados ao Firebase com o usuário correto.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Crie uma credencial do Firebase com o token de ID do Google.
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
    
            // Login com a credencial do usuário do Google.
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(function (result) {
                if (result.additionalUserInfo.isNewUser) {
                  firebase
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set({
                      gmail: result.user.email,
                      profile_picture: result.additionalUserInfo.profile.picture,
                      locale: result.additionalUserInfo.profile.locale,
                      first_name: result.additionalUserInfo.profile.given_name,
                      last_name: result.additionalUserInfo.profile.family_name,
                      current_theme: "dark"
                    })
                    .then(function (snapshot) { });
                }
              })
              .catch(error => {
                // Trate os erros aqui.
                var errorCode = error.code;
                var errorMessage = error.message;
                // O e-mail da conta do usuário que foi usada.
                var email = error.email;
                // O tipo do firebase.auth.AuthCredential que foi usado.
                var credential = error.credential;
                // ...
              });
          } else {
            console.log("Usuário já conectado ao Firebase.");
          }
        });
    };
     
    signInWithGoogleAsync = async() => {
      try {
         const result = await Google.logInAsync({
            beheviour: "web",
            androidClientId: "885017169831-9dbohkj2ebluaq97enfi5q481j9gmbc3.apps.googleusercontent.com",
            iosClientId: "885017169831-eos9jdil6rv6j4hevnj0phvtfgnv6lf6.apps.googleusercontent.com",
            scopes: ['profile','email'],
         })
      }
    }

    render(){
        return(
            <View 
               style={{
                   flex: 1,
                   justifyContent: "center",
                   alignItems: "center"
               }}>
                <Text>Tela do Login</Text>
            </View>
        )
    }
}