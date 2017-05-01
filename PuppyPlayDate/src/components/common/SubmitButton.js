import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

const SubmitButton = (props) => {
  return (
    <TouchableHighlight
      style={styles.submitButton}
      onPress={props.onPress}
      underlayColor={props.underlayColor}
    >
      <Text style={styles.buttonText}>
        {props.children}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    height: 35,
    backgroundColor: '#114800',
    alignSelf: 'stretch',
    //marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 9,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 40,
    marginBottom: 12,
  },
  buttonText: {
    color: '#77ed6b',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export { SubmitButton };
