import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  VrButton,
  Environment,
  NativeModules
} from 'react-360';
import tour from './data/tourData';

const surfaceModule = NativeModules.surfaceModule;

export class Travel extends React.Component {
  state = {
    img: {
      name: `info.png`,
      width: 100,
      height: 100,
    },
  }
  transformDisplay(id) {
    this._changeSurfaceDimensions(id);
  }

  _changeSurfaceDimensions(id) {
    surfaceModule.go1(id);
  }

  render() {
    let { img } = this.state;
    return (
      <View>
        <VrButton onClick={() => this.transformDisplay(this.props.id)}>
          <Image source={asset(`${img.name}`)} style={{ width: img.width, height: img.height }}></Image>
        </VrButton>
      </View>
    )
  }
};

export class TravelButtons extends React.Component {
  state = {
    img: {
      name: `Porin_${this.props.id}.jpeg`,
      width: 500,
      height: 300,
    },
    place: tour[`${this.props.id}`].placeName,
    info: tour[`${this.props.id}`].info,
    adjacentPlaces: tour[`${this.props.id}`].adjacentPlaces,
  }
  transformDisplay(id) {
    this._changeSurfaceDimensions(id);
  }

  _changeSurfaceDimensions(id) {
    surfaceModule.go(id);
  }
  clickHandler(id) {
    this.setState({
      place: tour[`${id}`].placeName,
      info: tour[`${id}`].info,
      adjacentPlaces: tour[`${id}`].adjacentPlaces,
    })
    surfaceModule.go(id);
    Environment.setBackgroundImage(asset(`./${id}.jpeg`));
  }
  createPlaceButtons(adjacentPlaces) {
    let places = adjacentPlaces;
    let buttons = [];

    places.map(place => (
      buttons.push(
        <VrButton key={`${place}` + 'button'} onClick={() => this.clickHandler(place)}>
          <Text style={{ backgroundColor: 'red' }}>{place}</Text>
        </VrButton>
      )
    ))

    return buttons
  }

  render() {
    let {img} = this.state;
    return(
      <View>
        <VrButton onClick={() => this.transformDisplay(this.props.id)}>
          <Image source={asset(`${img.name}`)} style={{ width: img.width, height: img.height }}></Image>
        </VrButton>
        <Text style={styles.greetingBox}>
          {this.state.info}
        </Text>
        {this.createPlaceButtons(this.state.adjacentPlaces)}
      </View>
    )
  }
};

export default class PorinTyoPajatVRTour extends React.Component {
  state = {
    place: tour.Landingpage.placeName,
    info: tour.Landingpage.info,
    adjacentPlaces: tour.Landingpage.adjacentPlaces,
  }

  clickHandler(placeSelection) {
    this.setState({
      place: tour[`${placeSelection}`].placeName,
      info: tour[`${placeSelection}`].info,
      adjacentPlaces: tour[`${placeSelection}`].adjacentPlaces,
    })
    surfaceModule.start(placeSelection);
    Environment.setBackgroundImage(asset(`./${placeSelection}.jpeg`));
  }

  createPlaceButtons(adjacentPlaces) {
    let places = adjacentPlaces;
    let buttons = [];

    places.map(place => (
      buttons.push(
        <VrButton key={`${place}` + 'button'} onClick={() => this.clickHandler(place)}>
          <Text style={{ backgroundColor: 'red' }}>{place}</Text>
        </VrButton>
      )
    ))

    return buttons
  }

  render() {
    return (
      <View style={styles.panel}>
        <Image source={asset('Porin_Tyopajat.jpeg')} style={{ width: 700, height: 300 }} />
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Tervetuloa Porin Työpajojen VR kierrokselle!
          </Text>
          {this.createPlaceButtons(this.state.adjacentPlaces)}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('PorinTyoPajatVRTour', () => PorinTyoPajatVRTour);
AppRegistry.registerComponent('Travel', () => Travel);
AppRegistry.registerComponent('TravelButtons', () => TravelButtons);