import React, {useState} from 'react';
import { useDrag } from 'react-dnd'
import './myStyles.css';
import {ItemTypes} from "../utils/items";
import Modal from 'react-modal'


const Card = ({ card, id, setName, setDelete}) => { 

    const[{isDragging}, drag] = useDrag({
        type: ItemTypes.CARD,
        item: {id},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
    })

    const [modalIsOpen, setModal] = useState(false)

    return (
         <div ref={drag} className ='cards' style={{ opacity: isDragging? 0: 1}} >

                <p>{card.title}</p>  
                <div className="cardBtns">
                    <p>{card.name}</p>
                    <button className="button" onClick={() => setModal(true)}>Öffnen</button>
                    <button className="button" onClick={() => setDelete(id)}>Löschen</button>   
                </div>
                
                <Modal isOpen = {modalIsOpen} ariaHideApp={false}>

                    <div className="modal">
                        <p className="modalHead">R{card.round} G{card.group}</p>
                        <br></br>
                        <h2 className="modalTitle">{card.title}</h2>
                        <br></br>
                        <p>{card.content}</p>
                        <br></br>
                        
                        <form>
                            {card.name==="" ?
                                <input className="inputName"
                                type='text' placeholder='Name' onChange={(e) => setName(e.target.value, id)} 
                                /> : <input className="inputName"
                                    type='text' placeholder={card.name} onChange={(e) => setName(e.target.value, id)} 
                                    />
                            }
                        </form>

                        <button className="button" onClick={() => setModal(false)}>Schließen</button>
                    </div>
                </Modal>
      
        </div>
    )
}

export default Card;