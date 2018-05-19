import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Home from './Home';
import AddBeer from './AddBeer';
import MapBeer from './MapBeer';
import TakePicture from './TakePicture';
import Details from './Details';
import { Ionicons } from '@expo/vector-icons';


export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => {
        return <Ionicons name='ios-home' color="#ffffff" size={28} />
      }
    }
  },
  AddBeer: {
    screen: AddBeer,
    navigationOptions: {
      tabBarIcon: () => {
        return <Ionicons name='ios-add-circle' color="#ffffff" size={28} />
      }
    }
  },
  MapBeer: {
    screen: MapBeer,
    navigationOptions: {
      tabBarIcon: () => {
        return <Ionicons name='md-globe' color="#ffffff" size={28} />
      }
    }
  }
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "#a2273c",
        borderTopWidth: 1,
        borderColor: "#3f101c"
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: '#FFF'
      }
    }
  });
  

export const Navigation = StackNavigator({
  Tabs: { screen: Tabs },
  AddBeer: { screen: AddBeer, },
  TakePicture: { screen: TakePicture, },
  Details: { screen: Details },
}, {
    navigationOptions: {
      headerTitle: () => {
        return <Text>Beeranking</Text>
      },
      headerTitleStyle: {
        alignSelf: 'center'
      },
      headerStyle: {
        backgroundColor: '#a2273c',
        height: 60,
        paddingTop: 10,
        shadowColor: 'grey',
        shadowOffset: {
          width: 2,
          height: 2
        },
      },
    },
  }
);





