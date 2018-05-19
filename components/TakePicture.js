import React from 'react';
import { View, Text, StyleSheet, TextInput, PickerIOS, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { StackNavigator } from 'react-navigation';

export default class TakePicture extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async function () {
    if (this.camera) {
      const options = {
        quality: 1,
        base64: true
      };
      this.camera.takePictureAsync(options).then(data => {
        // console.log(data);
        this.props.navigation.state.params.returnData(data);
        this.props.navigation.goBack();
      });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }} type={this.state.type}
            ref={ref => { this.camera = ref; }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={styles.capture}
                onPress={this.takePicture.bind(this)}>
                <Text style={styles.flipText}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    margin: 20
  },
  flipText: {
    color: 'black',
    fontSize: 15,
  },
});
