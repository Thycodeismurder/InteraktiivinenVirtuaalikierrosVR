// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface, Module } from 'react-360-web';
import React from 'react';
import WebVRPolyfill from 'webvr-polyfill';
const polyfill = new WebVRPolyfill();
import tour from './data/tourData';

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
  info0Panel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )
  info0Panel.setAngle(
    0.2,
    0
  )
  info1Panel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )
  info1Panel.setAngle(
    Math.PI / 2,
    0
  )
  info2Panel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )
  info2Panel.setAngle(
    -Math.PI / 2,
    0
  )
  info3Panel = new Surface(
    100,
    100,
    Surface.SurfaceShape.Flat
  )
  info3Panel.setAngle(
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
  resizeSurface(width,height,img,id) {
    if (id=== '0'){
      info0Panel.resize(width,height)
    }else if (id=== '1'){
      info1Panel.resize(width,height)
    } else if (id=== '2'){
      info2Panel.resize(width,height)
    } else if (id=== '3'){
      info3Panel.resize(width,height)
    }
  }
 //after first scene second method to create and render object onto info/travel
  go(id) {
    if (typeof(info0Button) !== 'undefined') {
      r360.detachRoot(info0Button);
    }
    if (typeof(info1Button) !== 'undefined') {
      r360.detachRoot(info1Button);
    }
    if (typeof(info2Button) !== 'undefined') {
      r360.detachRoot(info2Button);
    }
    if (typeof(info3Button) !== 'undefined') {
      r360.detachRoot(info3Button);
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
    if (tour[`${id}`].info0) {
      info0Button = r360.renderToSurface(
        r360.createRoot('InfoButton', { id: `0`,text: tour[`${id}`].info0.text, img: tour[`${id}`].info0.img}),
        info0Panel
      );
    }
    if(tour[`${id}`].info1) {
      info1Button = r360.renderToSurface(
        r360.createRoot('InfoButton', { id: `1`,text: tour[`${id}`].info1.text, img: tour[`${id}`].info1.img}),
        info1Panel
      );
    }
    if(tour[`${id}`].info2) {
      info2Button = r360.renderToSurface(
        r360.createRoot('InfoButton', { id: `2`,text: tour[`${id}`].info2.text, img: tour[`${id}`].info2.img}),
        info2Panel
      );
    }
    if(tour[`${id}`].info3) {
      info3Button = r360.renderToSurface(
        r360.createRoot('InfoButton', { id: `3`,text: tour[`${id}`].info3.text, img: tour[`${id}`].info3.img}),
        info3Panel
      );
    }
  };
  go1(id) {
    if (id === 'Veturitalli') {
      travelPanel.resize(1000, 600);
    } else if (id === 'Nuorisotalo') {
      travelPanel.resize(1000, 600);
    }
    r360.detachRoot(travelButtonPanel);
    travelButtons = r360.renderToSurface(
      r360.createRoot('TravelButtons', { id: `${id}` }),
      travelPanel
    );
    r360.detachRoot(info0Panel);
  }
  start(id) {
    travelButtonPanel = r360.renderToSurface(
      r360.createRoot('Travel', { id: `${id}` }),
      travelPanel
    );
    console.log(tour[`${id}`].info0);

    r360.detachRoot(introRoot);
    if (typeof(info0Button) !== 'undefined') {
      r360.detachRoot(info0Button);
    }
    if (typeof(info1Button) !== 'undefined') {
      r360.detachRoot(info1Button);
    }
    if (typeof(info2Button) !== 'undefined') {
      r360.detachRoot(info2Button);
    }
    if (typeof(info3Button) !== 'undefined') {
      r360.detachRoot(info3Button);
    }

    if (tour[`${id}`].info0) {
      info0Button = r360.renderToSurface(
        r360.createRoot('InfoButton', {id: `0`, text: tour[`${id}`].info0.text, img: tour[`${id}`].info0.img}),
        info0Panel
      );
    }
    if(tour[`${id}`].info1) {
      info1Button = r360.renderToSurface(
        r360.createRoot('InfoButton', {id: `1`, text: tour[`${id}`].info1.text, img: tour[`${id}`].info1.img}),
        info1Panel
      );
    }
    if(tour[`${id}`].info2) {
      info2Button = r360.renderToSurface(
        r360.createRoot('InfoButton', {id: `2`, text: tour[`${id}`].info2.text, img: tour[`${id}`].info2.img}),
        info2Panel
      );
    }
    if(tour[`${id}`].info3) {
      info3Button = r360.renderToSurface(
        r360.createRoot('InfoButton', {id: `3`, text: tour[`${id}`].info3.text, img: tour[`${id}`].info3.img}),
        info3Panel
      );
    }
  }
}

window.React360 = { init };
