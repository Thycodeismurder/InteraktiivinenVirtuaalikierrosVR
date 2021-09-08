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
//button to travel 
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
//objects when travelbutton is clicked
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
export class InfoButton extends React.Component{
  state = {
    img: {
      name: `info.png`,
      width: 100,
      height: 100,
    }
  }

  transformDisplay (img,id) {
    this._changeSurfaceDimensions(500,400,img,id)
    this.setState({
      img: {
        name: `${img}`,
        width: 500,
        height: 300,
      }
    });
  }

  resetPanel(img,id) {
    this._changeSurfaceDimensions(100,100,img,id)
    this.setState({
      img: {
        name: `info.png`,
        width: 100,
        height: 100,
      }
    });
  }
  _changeSurfaceDimensions(width,height,img, id) {
    surfaceModule.resizeSurface(width,height,img, id);
  }

  render() {
    let {img} = this.state
    return (
      <View style= {styles.displayPanel}
      hitSlop={50}
      onEnter={()=> this.transformDisplay(this.props.img, this.props.id)}
      onExit={()=> this.resetPanel(this.props.img, this.props.id)}>
        <Image source={asset(`${img.name}`)} style={{ width: img.width, height: img.height }}></Image>
        <View style={styles.attractionBox}>
          <Text style={styles.attractionText}>
            {this.props.text}
          </Text>
        </View>
    </View>
    );
  }
}
export class InfoPanel extends React.Component{
  state = {
    img: {
      name: `info.png`,
      width: 100,
      height: 100,
    },
  }
  render() {
    return (
      <View>
      <VrButton >
        <Image source={asset(`${img.name}`)} style={{ width: img.width, height: img.height }}></Image>
      </VrButton>
    </View>
    );
  }
}
//landingpage
export default class PorinTyoPajatVRTour extends React.Component {
  state = {
    place: tour.Landingpage.placeName,
    info: tour.Landingpage.info,
    adjacentPlaces: tour.Landingpage.adjacentPlaces,
  }

  clickHandler(id) {
    this.setState({
      place: tour[`${id}`].placeName,
      info: tour[`${id}`].info,
      adjacentPlaces: tour[`${id}`].adjacentPlaces,
    })
    surfaceModule.start(id);
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
  displayPanel: {
    width: 100,
    height: 100,
    flexDirection: 'column',
  },
  attractionBox: {
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderColor: '#C4002F',
    borderWidth: 2,
    width: 500
  },
  attractionText: {
    fontSize: 30,
    color: '#C4002F'
  },
});

AppRegistry.registerComponent('PorinTyoPajatVRTour', () => PorinTyoPajatVRTour);
AppRegistry.registerComponent('Travel', () => Travel);
AppRegistry.registerComponent('TravelButtons', () => TravelButtons);
AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
AppRegistry.registerComponent('InfoButton', () => InfoButton);