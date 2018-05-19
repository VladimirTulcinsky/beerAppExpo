import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import BeerRow from './BeerRow';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      isFetching: false
    }
  }

  componentDidMount() {
    this.getBeers();

  }

  getBeers() {
    fetch("https://beeranking.herokuapp.com/beers")
      .then(res => res.json())
      .then(beers => {
        console.log(beers);
        this.setState({ beers: beers, isFetching: false });
      }).catch(console.log);
  }

  onPress(beer) {
    console.log(beer, "beer before changing page");
    this.props.navigation.navigate('Details', { beer });
  }


  renderItem = ({ item }) => {
    console.log(item, "bieeeeeerrrruh");
    return (
      <TouchableOpacity onPress={() => this.onPress(item)}>
        <BeerRow beer={item} />
      </TouchableOpacity>
    );
  };

  renderSeparator = () => (
    <View style={{ height: 1, backgroundColor: "grey", marginLeft: 80 }} />
  );

  renderHeader = () => (
    <View
      style={{ height: 30, backgroundColor: "#5E5EB4", justifyContent: "center", alignItems: 'center' }}
    >
      <Text style={{ color: 'white' }}> All Beers</Text>
    </View>
  );

  onRefresh() {
    this.setState({ isFetching: true }, function () {
      this.getBeers();
    });
  }

  render() {
    const { beers } = this.state;
    return (
      <View>
        <FlatList
          data={beers}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={item => item.id}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 2,
    marginBottom: 2,
    backgroundColor: 'grey'
  }
});
