import React, {useState, useEffect} from 'react';

import Main from './components/Main'

import Header from './components/Header'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { v4 as uuidv4 } from 'uuid';


function App() {

  let round = 1;
  let group = 1;

  const [ data, setFullData] = useState([])


  const [ {roundCurr, groupCurr}, setRound] = useState({roundCurr: round, groupCurr: group})

  const [loaded, setLoaded] = useState(false)


 

  const initi = (json) => {

    setFullData(json)
    setLoaded(true)

  
  }

 
  const getArray = (num) => {
    let i;
    let array = [];
    
    for(i=1; i<=num; i++){
      array.push(i)
    }
    return array;
  }
  

  return (

    <DndProvider backend={HTML5Backend}>
    
    {useEffect(() => {
    fetch('/data/data.json')
      .then(response => response.json())
      .then(json =>
        initi(json) )
      
  }, [])}

  {loaded ?

          <div className="App">  

          <Header round = {roundCurr} group = {groupCurr}> 

            {data.setup.rounds>1? 
              <div>Runde: 

                  {
                  
                    getArray(data.setup.rounds).map(i => 

                    <button key={uuidv4()} className="button" onClick={() => setRound(prevState => ({
                      roundCurr: i,
                      groupCurr: prevState.groupCurr,
                      cards: data.cards.filter(function (card) {
                        return (card.group === groupCurr && card.round === i);
                      })
                    }
                    )) } 
                    style={{background: i===roundCurr ? 'PaleGreen': ''}}
                    >{i}</button>
                    )
                  
                  }
              </div>:"" }

              {data.setup.groups>1?
              <div>
                    Gruppe:
                    {
                    
                    getArray(data.setup.groups).map(i => 

                    <button key={uuidv4()} className="button" onClick={() => setRound(prevState => ({
                      roundCurr: prevState.roundCurr,
                      groupCurr: i,
                      cards: data.cards.filter(function (card) {
                        return (card.group === i && card.round === roundCurr);
                      })
                    }
                    )) }
                    style={{background: i===groupCurr ? 'PaleGreen': ''}}
                    >{i}</button>
                    )
                  
                  }
              </div>:""}

          </Header>

          <Main round={roundCurr} group={groupCurr} dataCards={data.cards} cards={data.cards} dataColumns={data.columns} data={data}/>
          </div>
                  
       : <h1>loading</h1>  }  


    </DndProvider>
          
  );
}

export default App;
