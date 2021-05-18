import React, { useState, useEffect } from 'react';
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

  const [images, setImages] = useState([{name: null, img: null}])

  let imgNew = [];
  const initi = () => {
    let input = document.getElementById('inputFile')
    
    let fileReader = new FileReader();
    fileReader.onload = function(event) {
      let dataInput = JSON.parse(event.target.result);
      setFullData(dataInput)
    
    }

    fileReader.readAsText(input.files[0]) 

    let img = document.getElementById('inputImages')

    Array.from(img.files).map((file, i) => {
 
      let imageReader = new FileReader();
      imageReader.onload = function(event) {

        let imageNew = {name: file.name, img: event.target.result};
        
        imgNew = [...imgNew, imageNew]

        if(i+1 === Array.from(img.files).length) {
          setTimeout(function() {
            setImages(imgNew)
            setLoaded(true)
          }, 2000)
        }      
      }

    imageReader.readAsDataURL(file)
      return "";
    })
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
    <DndProvider backend={HTML5Backend} >
   
   {

      loaded ?
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
              <div>Gruppe: 
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
          <Main round={roundCurr} group={groupCurr} dataCards={data.cards} cards={data.cards} dataColumns={data.columns} data={data} images={images}/>
          </div>        
       :  
      
       <div>
         <div>
          <label>Wähle die Textdatei aus:</label>
            <input type="file" id="inputFile" accept="*.json"></input>
            </div><div>
          <label>Wähle die zugehörigen Bilder aus:</label>
            <input type="file" multiple id="inputImages"></input>
            </div>
            <button className= "button" onClick={()=>initi()}>Starten</button>

        </div>
  }

    </DndProvider>        
  );
}

export default App;
