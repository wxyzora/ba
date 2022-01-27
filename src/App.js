import React, { useState } from 'react';
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

  const [addPics, setAddPics] = useState(false)

  

  const initiPlain = () => {
    setFullData({"setup": 
                    {
                        "rounds": 1,
                        "groups": 1

                    },
                  "cards":[],
                  "columns":
                      [
                          {
                              "id": 1,
                              "status": "Aufgaben"  
                          },
                          {
                              "id": 2,
                              "status": "In Arbeit"
                          },
                          {
                              "id": 3,
                              "status": "Fertig"   
                          }
                      ]
                })

    setLoaded(true)
  }

  let imgNew = [];

  const initi = () => {
    let input = document.getElementById('inputFile')
    
    if(Array.from(input.files).length === 0) {alert('Bitte Textdatei auswählen')} else {
    let fileReader = new FileReader();
    fileReader.onload = function(event) {
      let dataInput = JSON.parse(event.target.result);
      setFullData(dataInput)
    
    }
    fileReader.readAsText(input.files[0]) 
  

    if(addPics === true){
        let img = document.getElementById('inputImages')

        if(Array.from(input.files).length === 0) {alert('Bitte Bilder hinzufügen')} else {

        Array.from(img.files).map((file, i) => {
    
          let imageReader = new FileReader();
          imageReader.onload = function(event) {

            let imageNew = {name: file.name, img: event.target.result};
            
            imgNew = [...imgNew, imageNew]

            if(i+1 === Array.from(img.files).length) {
              setTimeout(function() {
                setImages(imgNew)
                setLoaded(true)
              }, 1000)
            }      
          }

        imageReader.readAsDataURL(file)
          return "";
        })
      }
    } else {setTimeout(function() {
      setLoaded(true)
    }, 1000)}
  }
  }

  const getArray = (num) => {
    let i;
    let array = [];
    for(i=1; i<=num; i++){
      array.push(i)
    }
    return array;
  }

  const[editingMode, setEditingMode] = useState(false)
  
  
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
                    style={{background: i===roundCurr ? '#E4F9D4': ''}}
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
                    style={{background: i===groupCurr ? '#E4F9D4': ''}}
                    >{i}</button>
                    )
                  }
              </div>:""}
          </Header>
          <Main round={roundCurr} group={groupCurr} dataCards={data.cards} cards={data.cards} dataColumns={data.columns} 
                data={data} images={images} editingMode={editingMode} setEditingMode={setEditingMode}/>
          </div>        
       :  
       
      (editingMode)? <Main round={roundCurr} group={groupCurr} dataCards={data.cards} cards={data.cards} dataColumns={data.columns} 
      data={data} images={images} editingMode={editingMode} setEditingMode={setEditingMode}/> :
      
      <div className="start">
         <div className="startInput">
         <div className="fileInput">
           <div className="label">
          <label>Textdatei auswählen</label>
          </div>
            <input type="file" id="inputFile" accept="*.json"></input>
            </div>
            <div>
            {addPics ? 
              <div className="fileInput">
                <div className="label">
            <label>Bilder hinzufügen</label>
            </div>
              <input type="file" multiple id="inputImages"></input>
              
              <div className="btnImg">
              <button className= "button" onClick={()=>setAddPics(false)}>Keine Bilder</button>
              </div>
              
              </div>
              : <button className= "button" onClick={()=>setAddPics(true)}>Bilder hinzufügen</button>  
            } 
            </div>

            <button className= "button" onClick={()=>initi()}>Starten</button>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="fileInput">
            <div className="label">Ohne Textdatei starten</div>
            <button className= "button" onClick={()=>initiPlain()}>Starten</button>
            </div>
            </div>

         
         <div>
         <button className="button" style={{position: 'absolute',
                                            bottom: '8px',
                                             left: '16px'}}
                        onClick={()=>setEditingMode(true)} >Editier- Modus</button>
         </div>
            
        </div>
    
  }

    </DndProvider>        
  );
}

export default App;
