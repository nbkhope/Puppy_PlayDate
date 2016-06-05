import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import UserDogs from './UserDogs';
import TestPage from './TestPage';
import UserSignup from './UserSignup';
import Login from './Login';
import DogCreate from './DogCreate';

class MainScene extends Component {
  onPressDogs() {
    console.log("onPressDogs");
    var property = "";

    this.props.navigator.push({
      title: 'Dogs',
      component: UserDogs,
      passProps: {property: property},
    });
  }

  onPressTestPage() {
    this.props.navigator.push({
      component: TestPage,
    });
  }

  onPressUserSignup() {
    this.props.navigator.push({
      component: UserSignup,
    });
  }

  onPressLogin() {
    this.props.navigator.push({
      component: Login,
    });
  }

  onPressDogCreate() {
    this.props.navigator.push({
      component: DogCreate,
    });
  }

  render(){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hola a todos!</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressDogs.bind(this)}>

          <Text style={styles.buttonText}>
            Dogs
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressTestPage.bind(this)}>
          <Text style={styles.buttonText}>
            Test Page
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressUserSignup.bind(this)}>
          <Text style={styles.buttonText}>
            Sign Up
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressLogin.bind(this)}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onPressDogCreate.bind(this)}>
          <Text style={styles.buttonText}>
            Create a Dog
          </Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    backgroundColor: "#48bbec",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  }
});


module.exports = MainScene;
