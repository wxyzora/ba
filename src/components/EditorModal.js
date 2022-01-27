import React, {useState, useRef} from 'react';
import '../styleSheets/editor.css'
import Header from './Header';

import Modal from 'react-modal'
import TextEditor from './TextEditor'
import EditorModal from './EditorModal';


const EditorMode2 = (props) => {

    

    const [cards, setCardList] = useState([{
        id: 1,
        title: "",
        description: "",
        content: "",
        images : "",
        status: "Aufgaben",
        deletable: false,
        round: 1,
        group: 1,
        name: ""
    }])

    const [count, setCount] = useState(2)

    const addingCardForm =() => {


        setCount(prev => prev+1)
     

        let obj = [{
            id: count,
            title: "",
            description: "",
            content: "",
            images : "",
            status: "Aufgaben",
            deletable: false,
            round: roundCurr,
            group: groupCurr,
            name: ""
        }];

        setCardList(cards.concat(obj[0]))

    }

    const deleteCard = (id) => {

        setCardList(cards.filter((card) => card.id !== id))

        
    }

    const [ {roundCurr, groupCurr}, setRoundGroup] = useState({roundCurr: 1, groupCurr: 1})
    const [{rounds, groups}, setRoundsGroups] = useState({rounds: [1], groups: [1]})


    const [images, setImages] = useState([{}])



    const deleteRound = () => {
        if(roundCurr===rounds.length && roundCurr!==1){setRoundGroup({roundCurr: rounds.length-1, groupCurr: groupCurr})}
        setCardList(cards.filter((card) => card.round !== rounds.length))
        setRoundsGroups(prevState=>({
            rounds: rounds.filter(round => round!==rounds.length),
            groups: prevState.groups
        })) 



    }

    const deleteGroup = () => {
        if(groupCurr===groups.length && groupCurr!==1){setRoundGroup({roundCurr: roundCurr, groupCurr: groups.length-1})}
        setCardList(cards.filter((card) => card.group !== groups.length))
        setRoundsGroups(prevState=>({
            rounds: prevState.rounds,
            groups: groups.filter(group => group!==groups.length)
        })) 
    }


    

    const save = () => {

        let dataNew = {
            setup: {
                "rounds": rounds.length,
                "groups": groups.length
            },
            cards: cards,
            columns: [
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
        }
        const dataSafe = JSON.stringify(dataNew);
        const blob = new Blob([dataSafe], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'data.json';
        link.href = url;
        link.click();


    }

    const addImg = (id) => {
        let img = document.getElementById('inputImages'+id)
/*
        let imgNew=[]

        if(img) {
        Array.from(img.files).map((file, i) => {
    
          let imageReader = new FileReader();
          imageReader.onload = function(event) {

            let imageNew = {name: file.name, img: event.target.result};

            
            imgNew = [...imgNew, imageNew.name]
            setImages([...images, imageNew])
     
          }
          return imgNew;
        })
      
        let newCard = {...cards.find(card => card.id !== id).card, images: imgNew}

        

        setCardList(
            cards.filter(card => card.id !== id).concat(newCard)
        )
        console.log(cards)
        }
*/
    }




    const [modalIsOpen, setModal] = useState(false)

    
    const [view, setView] =useState("overview")

    
    return (
        <div className = "form-box"> 

        <div className = "overview">

    

        </div>
           
        <Header  round = {roundCurr} group = {groupCurr}>
    
              <div>Runden:  
         
                  {
                     
                    rounds.map(round => { return(
                    <button key={"round"+ round} className="button" onClick={() => setRoundGroup(prevState => ({
                      roundCurr: round,
                      groupCurr: prevState.groupCurr,
                    }

                    )) } 
                    style={{background: round===roundCurr ? '#E4F9D4': ''}}
                    >{round}</button>
                    )
                })
                
                  }
                
                <button className='button' onClick={() => setRoundsGroups(prevState=>({
                    rounds: [...rounds, rounds.length+1],
                    groups: prevState.groups
                })) }
                
                >Weitere Runde</button>

                {rounds.length >1? 
                <button className='abbrechen' onClick={() => deleteRound()} >Letzte Runde löschen</button> : "" }
              </div>
              

       
              <div>Gruppen: 
              {   
                     groups.map(group => { return(
                     <button key={"group"+ group} className="button" onClick={() => setRoundGroup(prevState => ({
                       roundCurr: prevState.roundCurr,
                       groupCurr: group,
                     }
                     )) } 
                     style={{background: group===groupCurr ? '#E4F9D4': ''}}
                     >{group}</button>
                     )
                 })
                   
                   }

            
              </div>

        </Header>
            <div className='formGrid'>

            {   
                cards.map(card =>

                (card.round===roundCurr &&card.group===groupCurr) ?
                     <div key={card.id}>
                        <form>
                            <label> Aufgabenkarte {cards.filter((card) => card.group === groupCurr&&card.round===roundCurr).indexOf(card)+1} - R{roundCurr} G{groupCurr}</label>
                            <input placeholder={card.title? card.title : 'Titel'} onChange={(e) => setCardList(() => cards.map(el =>   
                                        (el.id!==card.id)? el : {
                                            id: el.id,
                                            title: e.target.value,
                                            description: el.description,
                                            content: el.content,
                                            images: el.images,
                                            status: el.status,
                                            deletable: el.deletable,
                                            round: el.round,
                                            group: el.group,
                                            name: el.name
                                        }
                    
                                                                                                    ))} />
                            <input placeholder={card.description? card.description :'Kurzbeschreibung der Aufgabe'} onChange={(e) => setCardList(() => cards.map(el =>   
                                                                                    (el.id!==card.id)? el : {
                                                                                        id: el.id,
                                                                                        title: el.title,
                                                                                        description: e.target.value,
                                                                                        content: el.content,
                                                                                        images: el.images,
                                                                                        status: el.status,
                                                                                        deletable: el.deletable,
                                                                                        round: el.round,
                                                                                        group: el.group,
                                                                                        name: el.name
                                                                                    }))}/>
                            
                            
                            
                   
                            <input placeholder={card.content? card.content:'Ausführliche Beschreibung der Aufgabe'} onChange={(e) => setCardList(() => cards.map(el =>   
                                                                                    (el.id!==card.id)? el : {
                                                                                        id: el.id,
                                                                                        title: el.title,
                                                                                        description: el.description,
                                                                                        content: e.target.value,
                                                                                        images: el.images,
                                                                                        status: el.status,
                                                                                        deletable: el.deletable,
                                                                                        round: el.round,
                                                                                        group: el.group,
                                                                                        name: el.name
                                                                                    }))}/>
                            
                        
                        
                            

                             <div>
                                <div>
                                    <p>Bilder hinzufügen</p>
                                </div>
                                <input type="file" multiple id={"inputImages"+card.id} onChange={addImg(card.id)}></input>
                            
                            </div>
                            <button onClick={()=>setModal(true)}>Inhalt hinzufügen</button>
                            <button onClick={()=>deleteCard(card.id)}>Aufgabe entfernen</button>
                        </form> 




                        <Modal isOpen = {modalIsOpen} ariaHideApp={false}>

                        <div className="modal">

                            <h2 className="modalTitle">Inhalt der Aufgabenkarte {card.id} Runde {card.round} Gruppe {card.group}</h2>
                            <br></br>
                            
                            <br></br>

                            <TextEditor></TextEditor>

                            <button className="button" onClick={() => setModal(false)}>Ok</button>
                        </div>
                        </Modal>
                        
                    </div>

                                                                                    
                                                                                    
                                                                                    







                  :""

                  


            )
            }

                    
            </div>

            <button className='button' onClick={()=> addingCardForm()}>Weitere Aufgabe</button>
            <button className='button' onClick={()=>save()}>Speichern</button>
            <button className="abbrechen" onClick={()=>props.setEditingMode(false)}>Schließen</button>
        </div>
    )
}

export default EditorMode2;