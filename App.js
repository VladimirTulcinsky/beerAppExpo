import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from './components/Navigation'

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
