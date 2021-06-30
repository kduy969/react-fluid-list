import './App.css';
import FluidList from "./FluidList";
import PanView from './PanView';
import React from "react";

function App() {
  return (
    <div className="App">
        <PanView className={'PanView'}>
          <FluidList
            baseFontSize={14}
            autoScaleFont
            multiply={10}
            unitSize={40} width={'100%'} className={'List'} items={[

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
                {title: 'Tennis', h: 2.4, w: 3},
                {title: 'Soccer', w: 2},
                {title: 'Basketball', w: 2, h: 1},
              ]
            },
            // {
            //   title: 'Gaming',
            //   items: [
            //     {title: 'Racing', h: 2, w: 3},
            //     {title: 'Gaming', w: 2},
            //     {title: 'Book', w: 3},
            //     {title: 'Mobile', w: 2},
            //     {
            //       title: 'Sport',
            //       items: [
            //         {title: 'Tennis', h: 2.4, w: 3},
            //         {title: 'Soccer', w: 2},
            //         {title: 'Basketball', w: 2, h: 1},
            //       ]
            //     },
            //   ]
            // },
            // {
            //   title: 'Sport',
            //   items: [
            //     {title: 'Tennis', h: 2.4, w: 3},
            //     {title: 'Soccer', w: 2},
            //     {title: 'Basketball', w: 2, h: 1},
            //   ]
            // },
            // {
            //   title: 'Gaming',
            //   items: [
            //     {title: 'Racing', h: 2, w: 3},
            //     {title: 'Gaming', w: 2},
            //     {title: 'Book', w: 3},
            //     {title: 'Mobile', w: 2},
            //     {
            //       title: 'Sport',
            //       items: [
            //         {title: 'Tennis', h: 2.4, w: 3},
            //         {title: 'Soccer', w: 2},
            //         {title: 'Basketball', w: 2, h: 1},
            //       ]
            //     },
            //   ]
            // },
            // {title: 'Computer', w: 2, h: 2},
            // {title: 'Book', w: 3},
            // {title: 'Mobile', w: 2},
            // {title: 'Computer', w: 2, h: 2},
            // {title: 'Vaccine', w: 3},
            // {title: 'Headphone', w: 2},
            // {title: 'Electronic', w: 2, h: 2},
            // {title: 'Book', w: 3},
            // {title: 'Mobile', w: 2},
          ]}/>
        </PanView>
        {/*<div className="grid-container">*/}
        {/*  <div className="grid-item"*/}
        {/*       style={{*/}
        {/*         gridColumn: 'span 4',*/}
        {/*       }}>1*/}
        {/*  </div>*/}
        {/*  <div className="grid-item">2</div>*/}
        {/*  <div className="grid-item">3</div>*/}
        {/*  <div className="grid-item">4</div>*/}
        {/*  <div className="grid-item">5</div>*/}
        {/*  <div className="grid-item">6</div>*/}
        {/*  <div*/}
        {/*    style={{*/}
        {/*      gridColumn: 'span 2',*/}
        {/*      gridRow: 'span 2',*/}
        {/*    }}*/}
        {/*    className="grid-item"*/}
        {/*  >*/}
        {/*    7*/}
        {/*  </div>*/}
        {/*  <div className="grid-item">8</div>*/}
        {/*  <div style={{*/}
        {/*    gridColumn: 'span 2',*/}
        {/*    gridRow: 'span 3',*/}
        {/*  }} className="grid-item">9</div>*/}
        {/*  <div className="grid-item">10</div>*/}
        {/*  <div className="grid-item">11</div>*/}
        {/*  <div className="grid-item">12</div>*/}
        {/*  <div className="grid-item">13</div>*/}
        {/*  <div className="grid-item">14</div>*/}
        {/*  <div className="grid-item">15</div>*/}
        {/*  <div className="grid-item">12</div>*/}
        {/*  <div className="grid-item">13</div>*/}
        {/*  <div className="grid-item">14</div>*/}
        {/*  <div className="grid-item">15</div>*/}
        {/*  <div className="grid-item">12</div>*/}
        {/*  <div className="grid-item">13</div>*/}
        {/*  <div className="grid-item">14</div>*/}
        {/*  <div className="grid-item">15</div>*/}
        {/*</div>*/}
    </div>
  );
}

export default App;
