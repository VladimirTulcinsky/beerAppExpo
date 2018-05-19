import React from 'react';
import { View, Text, StyleSheet, TextInput, PickerIOS, Button, Dimensions, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import t from 'tcomb-form-native';

export default class AddBeer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: {}
    }
  }
  handleSubmit = () => {
    let value = this._form.getValue();

    //TODO change name
    const picture = {
      uri: this.state.picture.uri,
      type: 'image/jpeg',
      name: 'beer.jpg',
    };

    let formData = new FormData();

    for (let item in value) {
      formData.append(item, value[item]);
    }

    formData.append("beerPicture", picture);
    formData.append("nbrVotes", "0");
    // formData.append("rating", JSON.stringify([]));
    

    fetch('https://beeranking.herokuapp.com/beers', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(res => {
        console.log(res, "succeeded");
        Alert.alert(
          'Merci',
          'La bière a bien été ajoutée',
          [
            { text: 'OK', onPress: () => console.log('Cancel Pressed') },
          ],
          { cancelable: false }
        )
      })
      .catch(console.log)

  }

  goToTakePicture() {
    console.log("go to take picture");
    this.props.navigation.navigate('TakePicture', { returnData: this.returnData.bind(this) });
  }

  returnData(picture) {
    console.log(picture, "info picture");
    this.setState({ picture });
  }


  render() {


    return (
      <ScrollView contentContainerStyle={style.container}>
        {this.Picture()}

        <Form ref={c => this._form = c}
          type={beer}
          options={options} />
        <Button
          title="Ajouter bière"
          onPress={this.handleSubmit}
        />
      </ScrollView>
    );
  }


  Picture() {
    console.log("picutre function");
    if (Object.keys(this.state.picture).length != 0) {
      return (
        <Image
          style={style.picture}
          source={{ uri: 'data:image/png;base64,' + this.state.picture.base64 }}
        />
      );
    }
    else {
      console.log("touchable opacity");
      return (
        <TouchableOpacity
          onPress={() => this.goToTakePicture()}
          style={style.capture}
        >
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      );
    }
  }

}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  picture: {
    width: 120,
    height: 100,
    alignSelf: 'center',
    borderRadius: 5,
  }
});

const Form = t.form.Form;

const Taste = t.enums({
  soft: 'Soft',
  bitter: 'Bitter',
  sour: "Sour",
  syrupy: "Syrupy",
  preposterous: "Preposterous"
});

const beer = t.struct({
  name: t.String,
  color: t.String,
  degree: t.Number,
  taste: Taste,
  brewery: t.String
});

const options = {
  fields: {
    name: {
      label: 'Name',
    },
    color: {
      label: 'Color',
    },
    degree: {
      label: 'Degree',
    },
    taste: {
      label: 'Taste',
    },
    brewery: {
      label: 'Brewery',
    }
  },
};

