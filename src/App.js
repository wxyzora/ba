import React from 'react';

import Main from './components/Main'
import dataCards from './components/data/cards.json'
import dataColumns from './components/data/columns.json'

import Header from './components/Header'


import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'




function App() {


  let round = 1;
  let group = 1;
 
    let dataCard = dataCards.filter(function (card) {
      return (card.group === group && card.round === round);
    })




  return (


    <DndProvider backend={HTML5Backend}>
      <div className="App">

          <Header round = {round} group = {group}/>
          <Main round={round} group={group} dataCards={dataCard} dataColumns={dataColumns}/>
          
        
      </div>
    </DndProvider>
    
  );
}

export default App;
