import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  VrButton,
  Environment
} from 'react-360';
import tour from './data/tourData';

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

    Environment.setBackgroundImage(asset(`./${placeSelection}.jpeg`));
    let asd = placeSelection;
    console.log(asd);
    let asdf = `./${placeSelection}.jpeg`;
    console.log(asdf);
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
