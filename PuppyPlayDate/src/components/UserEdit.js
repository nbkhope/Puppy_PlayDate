import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { InputText } from './form';
import { fetchUser, updateUser, updateEditUserForm } from '../actions/index';

const styles = require('../style');

class UserEdit extends Component {
  constructor(props) {
    super(props);

    // Initialize Playdate Attributes
    this.state = {
      id: "",
      loaded: false,
    };
  }

  componentDidMount() {
    // As soon as the component is mounted, go and fetch the data for the user
    this.fetchData();
  }

  // Performs an Ajax call to retrieve information about the user
  fetchData() {
    console.log("fetchData: UserEdit: user_id", this.props.user_id);

    this.props.fetchUser(this.props.user_id)
      .then(() => {
        const responseData = this.props.user;

        this.setState({
          id: responseData.id,
          loaded: true,
        });

        this.props.updateEditUserForm({
          name: responseData.name,
          username: responseData.username,
          email: responseData.email,
        });
      });
  }

  onEditPress() {
    const { username, name, email, password } = this.props;

    const user = {
      username,
      name,
      email,
    };

    // add password only if it was typed
    if (password !== undefined || password !== '') {
      user.password = password;
    }

    console.log("Edit user submit");

    this.props.updateUser(this.props.user.id, user)
      .then(() => {
        Actions.pop({ loaded: false });
      });
  }

  render() {
    const { username, name, email, password, updateEditUserForm } = this.props;

    return (
      <View style={styles.container}>
        <View
          style={[styles.innerContainer, { justifyContent: 'flex-start', marginTop: 114 }]}
        >

          <InputText
            placeholder="Username"
            style={styles.inputText}
            value={username}
            onChangeText={username => updateEditUserForm({ username })}
          />

          <InputText
            placeholder="Name"
            style={styles.inputText}
            value={name}
            onChangeText={name => updateEditUserForm({ name })}
          />

          <InputText
            placeholder="Email"
            style={styles.inputText}
            value={email}
            onChangeText={email => updateEditUserForm({ email })}
          />

          <InputText
            placeholder="Password"
            style={styles.inputText}
            value={password}
            secureTextEntry
            onChangeText={password => updateEditUserForm({ password })}
          />

          <TouchableHighlight
            style={styles.submitButton}
            onPress={this.onEditPress.bind(this)}
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.user, ...state.userEditForm };
}

export default connect(mapStateToProps, { fetchUser, updateUser, updateEditUserForm })(UserEdit);
