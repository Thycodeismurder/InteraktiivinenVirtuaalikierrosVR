// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface, Module } from 'react-360-web';
import React from 'react';
import WebVRPolyfill from 'webvr-polyfill';
const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [
      new surfaceModule(),
    ],
    ...options,
  });

  introPanel = new Surface(
    1000,
    600,
    Surface.SurfaceShape.Cylinder
  )
  introRoot = r360.renderToSurface(
    r360.createRoot('PorinTyoPajatVRTour', { /* initial props */ }),
    introPanel
  );
  travelPanel = new Surface(
    200,
    300,
    Surface.SurfaceShape.Flat
  )
  travelPanel.setAngle(
    0,
    0.2
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('Langingpage.jpeg'));
}

class surfaceModule extends Module {
  constructor() {
    super('surfaceModule');
  }
 
  go(id) {
    if (id === 'Landingpage') {
      r360.detachRoot(travelButtons);
      introRoot = r360.renderToSurface(
        r360.createRoot('PorinTyoPajatVRTour', { /* initial props */ }),
        introPanel
      );
    }else {
      travelPanel.resize(200, 300);
    
      r360.detachRoot(travelButtons);
      infoPanel = r360.renderToSurface(
      r360.createRoot('Travel', { id: `${id}` }),
      travelPanel
    );
    }
    
  };
  go1(id) {
    if (id === 'Veturitalli') {
      travelPanel.resize(1000, 600);
    } else if (id === 'Nuorisotalo') {
      travelPanel.resize(1000, 600);
    }
    r360.detachRoot(infoPanel);
    travelButtons = r360.renderToSurface(
      r360.createRoot('TravelButtons', { id: `${id}` }),
      travelPanel
    );
  }
  start(placeSelection) {
    infoPanel = r360.renderToSurface(
      r360.createRoot('Travel', { id: `${placeSelection}` }),
      travelPanel
    );

    r360.detachRoot(introRoot);
  }
}

window.React360 = { init };
