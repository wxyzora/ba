import React, {useState} from 'react';
import './myStyles.css';
import Column from './Column';
import Card from './Card';
import Footer from './Footer'
import Modal from 'react-modal'
import dataCards from './data/cards.json'


const Main = (props) => {

    let columns = props.dataColumns;

    const [cards , setCardList ] = useState(dataCards);

    const changeStatus = (id, status) => {
        console.log(id, status)
        let item = cards.filter((card, i) => card.id === id);
        item[0].status = status;
        console.log(item[0])
        setCardList(cards.filter((card, i) => card.id !== id).concat(item[0]))
    }

    const setName = (e, id) => {
        console.log(e, id)

        let ItemList = cards
        ItemList.map((card)=>
            (card.id === id) ? card.name = e : card.name)

        console.log(ItemList)
        setCardList(ItemList)         
    }

    const save = () => {
        console.log(props.group)
        handleSaveToPC(cards)
    }


    const handleSaveToPC = jsonData => {

        let cards1 = dataCards.filter(function (card) {
            let bool = true;
            jsonData.includes(card) ?  bool = false: bool = true;
            return bool;
            })

        console.log(jsonData.concat(cards1))

        const cards = JSON.stringify(jsonData.concat(cards1));
        const blob = new Blob([cards], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'cards.json';
        link.href = url;
        link.click();
    }

    const [
        {
            id,
            title,
            content,
            status,
            round,
            group,
            name
        }
        , setNewCard] = useState({
            id: 24,
            title: "",
            content: "",
            status: "Aufgaben",
            round: props.round,
            group: props.group,
            name: ""
    })
    

    const [modalIsOpen, setModal] = useState(false)

    const addCard = () => {
        let obj = [{
            id,
            title,
            content,
            status,
            round,
            group,
            name
        }];

        setCardList(cards.concat(obj[0]))
        setModal(false)
        console.log(cards)

        return obj
    }

    const setDelete = (id) => {
        setCardList(cards.filter((card) => card.id !== id))
    }


    return (       
        <div>

            <div key={50} className="grid">
                {
                    columns.map(column=>                    
                        <div  key={column.id+300} className ='columns' >      
                                <Column key={column.id} column={column} status={column.status} changeStatus={changeStatus}>
                                    {
                                        cards.map((card)=>

                                            card.round === props.round && card.group === props.group ?
                                            ((card.status === column.status) ?
                                                <Card key={card.id} id={card.id} card={card} setName={setName} setDelete={setDelete} /> : ""    ) :""
                                        )
                                    }    
                                </Column>
                        </div>
                    )
                }
            </div> 

            <Footer save = {save}>

                <button className="button" onClick={() => setModal(true)}>Neue Aufgabe</button>

                <Modal isOpen={modalIsOpen} ariaHideApp={false}>

                    <div className="modal">
                        <h2>Füge eine neue Aufgabe hinzu</h2>
                        
                        <form className="addForm">
                            <div className="formControl">
                                <label className="label">Titel:</label>
                                <div>
                                <input className="input" type='text'  onChange={(e) => setNewCard(prevState =>
                                                                                                    ({
                                                                                                        id: prevState.id,
                                                                                                        title: e.target.value,
                                                                                                        content: prevState.content,
                                                                                                        status: prevState.status,
                                                                                                        round: props.round,
                                                                                                        group: props.group,
                                                                                                        name: prevState.name
                                                                                                    }))} />
                                </div>

                            </div>
                            <div className="formControl">
                                <label>Beschreibung:</label>
                                <div>
                                <input className="input" type='text'  onChange={(e) => setNewCard(prevState =>    
                                                                                                    ({
                                                                                                        id: prevState.id,
                                                                                                        title: prevState.title,
                                                                                                        content: e.target.value,
                                                                                                        status: prevState.status,
                                                                                                        round: props.round,
                                                                                                        group: props.group,
                                                                                                        name: prevState.name
                                                                                                    }))} />  
                                </div>
                            </div>
                            
                        </form>
                        <button className="button" onClick={() => addCard()}>Speichern</button>
                        <button className="button" onClick={() => setModal(false)}>Abbrechen</button>   

                    </div>                                                                                              
                
                </Modal>
            </Footer>
            
        </div> 
            
        )
}

export default Main;