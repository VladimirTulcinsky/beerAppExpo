import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

const Header = ({style}) => (
  <View style={[styles.container, style]}>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 10,
    backgroundColor: '#a2273c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 2,
      height: 2
    },
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});