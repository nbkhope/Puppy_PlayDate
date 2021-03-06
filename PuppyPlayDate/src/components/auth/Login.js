import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { InputText } from '../form';
import { SubmitButton } from '../common';
// Action creators
import {
  loginUser,
  usernameChanged,
  passwordChanged,
  authenticateUser
} from '../../actions/index';

const styles = require('../../style');

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 0,
    };
  }

  componentWillMount() {
    // Check storage to see if userId is there
    AsyncStorage.getItem("userID").then((value) => {
      console.log('AsyncStorage: userId is', value);

      // Have to do this check even if it is a then() clause
      if (value !== null) {
        // If so, then log user in automatically.
        this.props.authenticateUser(value);

        // Redirect to Home scene
        Actions.main();
      }

      //this.setState({userID: value});
    }).done();
  }

  onUsernameChange(username) {
    this.props.usernameChanged(username);
  }

  onPasswordChange(password) {
    this.props.passwordChanged(password);
  }

  onLoginPress() {
    const { username, password } = this.props;

    this.props.loginUser({
      username,
      password
    })
      .then(() => {
        // Login successfully, so store user id locally
        AsyncStorage.setItem("userID", String(this.props.user)).then(() => {
          // Redirect to Home scene
          Actions.main();
        });
      })
      .catch((error) => {
        console.log("Login failed");
        console.log(error);
      });
  }

  onSignupPress() {
    Actions.register();
  }

  renderErrorMessage() {
    if (this.props.errorMessage !== '') {
      return (
        <Text style={customStyles.errorText}>
          {this.props.errorMessage}
        </Text>
      );
    }
  }

//Image source={require('../../Resources/0.jpg')} style={styles.bImage}
  render() {
    const { username, password } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.innerContainer}>

            <View style={styles.mainContent}>

              <Text style={styles.pageHeading}>
                Your dog also needs to have fun!
              </Text>

              <InputText
                placeholder="Username"
                value={username}
                onChangeText={this.onUsernameChange.bind(this)}
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              <InputText
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={this.onPasswordChange.bind(this)}
                autoCapitalize={'none'}
                autoCorrect={false}
              />

              {this.renderErrorMessage()}

              <SubmitButton onPress={this.onLoginPress.bind(this)}>
                Login
              </SubmitButton>
            </View>

            <View style={styles.pageFooter}>
              <TouchableHighlight
                style={[styles.submitButton, styles.signupButton]}
                onPress={this.onSignupPress.bind(this)}
              >
                <Text style={styles.buttonText}>
                  Sign Up
                </Text>
              </TouchableHighlight>
            </View>

          </View>
        </View>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  errorText: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center'
  }
});

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    username: state.auth.username,
    password: state.auth.password,
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser,
    usernameChanged,
    passwordChanged,
    authenticateUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
