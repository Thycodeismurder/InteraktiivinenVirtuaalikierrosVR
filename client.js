// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface, Module } from 'react-360-web';
import React from 'react';
import WebVRPolyfill from 'webvr-polyfill';
const polyfill = new WebVRPolyfill();
import tour from './data/tourData';
let infoPanel = [];

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      new surfaceModule(),
    ],
    ...options,
  });
  
  //langingpage surface
  introPanel = new Surface(
    1000,
    600,
    Surface.SurfaceShape.Cylinder
  )
  introRoot = r360.renderToSurface(
    r360.createRoot('PorinTyoPajatVRTour', { /* initial props */ }),
    introPanel
  );
  //travelbuttons panel
  travelPanel = new Surface(
    200,
    300,
    Surface.SurfaceShape.Flat
  )
  travelPanel.setAngle(
    0,
    0.2
  );
  infoPanel[0] = new Surface(
    101,
    100,
    Surface.SurfaceShape.Flat
  )
  infoPanel[0].setAngle(
    0.2,
    0
  )
  infoPanel[1] = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )
  infoPanel[1].setAngle(
    Math.PI / 2,
    0
  )
  infoPanel[2] = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )
  infoPanel[2].setAngle(
    -Math.PI / 2,
    0
  )
  infoPanel[3] = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )
  infoPanel[3].setAngle(
    3.6,
    0
  )

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('Langingpage.jpeg'));
}

class surfaceModule extends Module {
  constructor() {
    super('surfaceModule');
  }
  state= {
    infoButtons : []
  }
  resizeSurface(width,height,img,id) {
    if (id=== '0'){
      infoPanel[0].resize(width,height)
    }else if (id=== '1'){
      infoPanel[1].resize(width,height)
    } else if (id=== '2'){
      infoPanel[2].resize(width,height)
    } else if (id=== '3'){
      infoPanel[3].resize(width,height)
    }
  }
 //create infoButtons and scene after landgingpage
  go(id) {
    let {infoButtons} = this.state;
    for (let i = 0; i <= 3; i++) {
      if (typeof(infoButtons[i]) !== 'undefined') {
        r360.detachRoot(infoButtons[i]);
        }
    }
   
    if (id === 'Landingpage') {
      r360.detachRoot(travelButtons);
      introRoot = r360.renderToSurface(
        r360.createRoot('PorinTyoPajatVRTour', { /* initial props */ }),
        introPanel
      );
    }else {
      travelPanel.resize(200, 300);
    
      r360.detachRoot(travelButtons);
      travelButtonPanel = r360.renderToSurface(
      r360.createRoot('Travel', { id: `${id}` }),
      travelPanel
    );
    
    }
    for (let i = 0; i <= 3; i++) {
      if (tour[`${id}`].info[i]) {
        infoButtons[i] = r360.renderToSurface(
          r360.createRoot('InfoButton', {id: `${i}`, text: tour[`${id}`].info[i].text, img: tour[`${id}`].info[i].img}),
          infoPanel[i]
        );
      }
    }
  };
  //create travelpanel and destroy infobuttons
  go1(id) {
    let {infoButtons} = this.state;
    
    travelPanel.resize(1000, 600);
   
    r360.detachRoot(travelButtonPanel);
    travelButtons = r360.renderToSurface(
      r360.createRoot('TravelButtons', { id: `${id}` }),
      travelPanel
    );
    r360.detachRoot(infoPanel[0]);
    for (let i = 0; i <= 3; i++) {
      r360.detachRoot(infoButtons[i]);
     }
  }
  //create first scene after landingPage
  start(id) {
    let {infoButtons} = this.state;
    travelButtonPanel = r360.renderToSurface(
      r360.createRoot('Travel', { id: `${id}` }),
      travelPanel
    );
    

    r360.detachRoot(introRoot);
    for (let i = 0; i <= 3; i++) {
      if (typeof(infoButtons[i]) !== 'undefined') {
        r360.detachRoot(infoButtons[i]);
        }
    }

    for (let i = 0; i <= 3; i++) {
      if (tour[`${id}`].info[i]) {
        infoButtons[i] = r360.renderToSurface(
          r360.createRoot('InfoButton', {id: `${i}`, text: tour[`${id}`].info[i].text, img: tour[`${id}`].info[i].img}),
          infoPanel[i]
        );
      }
    }
    
    
  }
}

window.React360 = { init };
