import React, { Component } from "react";
import { ActivityIndicator, View} from "react-native";
import firabase from "firebase";    

export default class LoadingScreen extends Component {
    componentDidMount(){
      this.checkIfLoggedln();
    }

    checkIfLoggedln = () => {
       firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('DashboardScreen')
        } else {
          this.props.navigation.navigate('LoginScreen')
        }
       })
    }

    render(){
        return(
            <View 
               style={{
                   flex: 1,
                   justifyContent: "center",
                   alignItems: "center"
               }}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}