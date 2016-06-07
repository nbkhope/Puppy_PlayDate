import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  Navigator,
  Image,
  TouchableHighlight,
  AsyncStorage,
  AlertIOS
} from 'react-native';
import MapScene from './MapScene'
const styles = require('./style.js')
const REQUEST_URL ='http://localhost:3000/session/login'

import MainScene from './MainScene';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 0,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userID").then((value) => {
      console.log('current.val '+ value);
        this.setState({userID: value});
    }).done();
  }

  render() {
    return (
    <Image source={require('./Resources/0.jpg')} style={styles.bImage}>
      <View style={styles.topMargin}></View>
        <View style={styles.container}>
          <View style={styles.outterMargin}>
          </View>
            <View style={styles.content}>
        <Text style={styles.text}>
          Login
        </Text>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        {
          //secureTextEntry={true} add this line on production
      }
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.loginPress.bind(this)}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>

        </View>
      <View style={styles.outterMargin}>
    </View>
  </View>
  </Image>

    );
  }
  loginPress(){
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        if (responseData.success != false){
          //Login successfully
          this.makeSession(responseData);
          this.props.navigator.push({
            title: 'Puppy Playdate',
            component: MapScene,
            leftButtonTitle: ' '
          })
          this.setState({
            username: '',
            password: ''
          });

        } else {
          AlertIOS.alert(
           'Something went wrong!'
          );
        }
      })
      .done();
    console.log(this.state.username);
  }

  makeSession(userID){
    console.log('state'+ this.state.userID);
    AsyncStorage.setItem("userID", String(userID));
    console.log('new-state'+ this.state.userID);
    //this.props.navigator.popToTop();
      // AsyncStorage.getItem("userID").then((value) => {
      //         this.setState({"userID": value});
      // }).done();
  }
}


module.exports = Login;
