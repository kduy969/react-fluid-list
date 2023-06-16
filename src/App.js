import './App.css';
import FluidList from "./FluidList";
import PanView from './PanView';
import React, {useState} from "react";

const CONFIG = {
  autoScaleFont: true,
  multiply: 2,
  unitSize: 20,
  baseFontSize: 7,
  padding: 0.05,
  margin: 0.05,
}

const ITEMS = [
  {title: 'Sport', w: 2, h: 3, color: 'red'},
  {title: 'Girl', w: 3, h: 2},
  {title: 'Boy', w: 2, h: 1},
  {title: 'Photography', w: 3,},
  {title: 'Girl', w: 3, h: 2},
  {title: 'Boy', w: 2, h: 1},
  {title: 'Photography', w: 3,},
  {title: 'Life', w: 4, h: 2},
  {
    title: 'Sport',
    items: [
      {title: 'Tennis', h: 2, w: 3},
      {title: 'Soccer', w: 2},
      {title: 'Basketball', w: 2, h: 1},

    ]
  },
  {
    title: 'Gaming',
    items: [
      {title: 'Racing', h: 2, w: 3},
      {title: 'Gaming', w: 2},
      {title: 'Book', w: 3},
      {title: 'Mobile', w: 2},
      {
        title: 'Sport',
        items: [
          {title: 'Tennis', h: 2, w: 3},
          {title: 'Soccer', w: 2},
          {title: 'Basketball', w: 2, h: 1},
        ]
      },
    ]
  },
  {
    title: 'Sport',
    items: [
      {title: 'Tennis', h: 2, w: 3},
      {title: 'Soccer', w: 2},
      {title: 'Basketball', w: 2, h: 1},
    ]
  },
  {
    title: 'Gaming',
    items: [
      {title: 'Racing', h: 2, w: 3},
      {title: 'Gaming', w: 2},
      {title: 'Book', w: 3},
      {title: 'Mobile', w: 2},
      {
        title: 'Sport',
        items: [
          {title: 'Tennis', h: 2, w: 3},
          {title: 'Soccer', w: 2},
          {title: 'Basketball', w: 2, h: 1},
        ]
      },
    ]
  },
  {title: 'Computer', w: 2, h: 2},
  {title: 'Book', w: 3},
  {title: 'Mobile', w: 2},
  {title: 'Computer', w: 2, h: 2},
  {title: 'Vaccine', w: 3},
  {title: 'Headphone', w: 2},
  {title: 'Electronic', w: 2, h: 2},
  {title: 'Book', w: 3},
  {title: 'Mobile', w: 2},
  {title: 'Sport', w: 2, h: 3},
  {title: 'Girl', w: 3, h: 2},
  {title: 'Boy', w: 2, h: 1},
  {title: 'Photography', w: 3,},
  {title: 'Girl', w: 3, h: 2},
  {title: 'Boy', w: 2, h: 1},
  {title: 'Photography', w: 3,},
  {title: 'Life', w: 4, h: 2},
  {
    title: 'Sport',
    items: [
      {title: 'Tennis', h: 2, w: 3},
      {title: 'Soccer', w: 2},
      {title: 'Basketball', w: 2, h: 1},
    ]
  },
  {
    title: 'Gaming',
    items: [
      {title: 'Racing', h: 2, w: 3},
      {title: 'Gaming', w: 2},
      {title: 'Book', w: 3},
      {title: 'Mobile', w: 2},
      {
        title: 'Sport',
        items: [
          {title: 'Tennis', h: 2, w: 3},
          {title: 'Soccer', w: 2},
          {title: 'Basketball', w: 2, h: 1},
        ]
      },
    ]
  },
  {
    title: 'Sport',
    items: [
      {title: 'Tennis', h: 2, w: 3},
      {title: 'Soccer', w: 2},
      {title: 'Basketball', w: 2, h: 1},
    ]
  },
  {
    title: 'Gaming',
    items: [
      {title: 'Racing', h: 2, w: 3},
      {title: 'Gaming', w: 2},
      {title: 'Book', w: 3},
      {title: 'Mobile', w: 2},
      {
        title: 'Sport',
        items: [
          {title: 'Tennis', h: 2, w: 3},
          {title: 'Soccer', w: 2},
          {title: 'Basketball', w: 2, h: 1},
        ]
      },
    ]
  },
];

function App() {

  return (
    <div className="App">
      <PanView className={'PanView'}>
        <FluidList
          config={CONFIG}
          width={'100%'}
          className={'List'}
          items={ITEMS}/>
      </PanView>
    </div>
  );
}

export default App;
