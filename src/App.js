import React, {useState} from 'react';

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


  const [ {roundCurr, groupCurr, cards}, setRound] = useState({roundCurr: round, groupCurr: group, cards: dataCard})



 




  return (


    <DndProvider backend={HTML5Backend}>
      <div className="App">

     
          <Header round = {roundCurr} group = {groupCurr}>

          <button className="button" onClick={() => setRound(prevState => ({
            roundCurr: prevState.roundCurr+1,
            groupCurr: prevState.groupCurr,
            cards: dataCards.filter(function (card) {
              return (card.group === groupCurr && card.round === prevState.roundCurr+1);
            })
          }
          
          )) }>Nächste Runde</button>

        <button className="button" onClick={() => setRound(prevState => ({
            roundCurr: 1,
            groupCurr: prevState.groupCurr+1,
            cards: dataCards.filter(function (card) {
              return (card.group === prevState.groupCurr+1 && card.round === 1);
            })
          }
          
          )) }>Nächste Gruppe</button>


          </Header>

          


          <Main round={roundCurr} group={groupCurr} dataCards={cards} dataColumns={dataColumns}/>
          
         
        
      </div>
    </DndProvider>
    
  );
}

export default App;
