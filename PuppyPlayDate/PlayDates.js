import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import PlayDateCreate from './PlayDateCreate';
import MainScene from './MainScene';
import PlayDateShow from './PlayDateShow';

var REQUEST_URL = 'http://localhost:3000/playdates';

class PlayDates extends Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource : new ListView.DataSource(
        {rowHasChanged: (r1, r2) => r1 !== r2}
      ),
      loaded: false
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  renderRow(rowData, sectionID, rowID){
    return(
      <TouchableHighlight>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {rowData.name}
            </Text>
            <Text>
              <Text style={styles.subtitle}>Location:</Text> {rowData.location}
              {', '}
              <Text style={styles.subtitle}>Day and Time:</Text> {rowData.time_day}
            </Text>
            <Text>
              <Text style={styles.subtitle}>Description:</Text> {rowData.description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  // onPressPlus() {
  //   this.props.navigator.push({
  //     component: MainScene,
  //   });
  // }

  // onPressPlus() {
  //   console.log('onPressPlug');
  // }

  addGroupPressed() {
    console.log('addGroupPressed');
    this.props.navigator.push({
      title: 'PlayDate',
      component: PlayDateCreate,
      passProps: {}
    })
  }

  render() {
    if (!this.state.loaded){
      return(<Text>Loading...</Text>)
    }
    return (
      <View style={styles.container}>
        <Text style={[styles.pageTitle, styles.title]}>Your Groups</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.addGroupPressed()}>
          <Text>Add</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'antiquewhite'
  },
  textContainer: {
    flex: 1,
    flexWrap: 'wrap',
  },
  rowContainer: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 2,
  },
  pageTitle: {
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});


module.exports = PlayDates;
