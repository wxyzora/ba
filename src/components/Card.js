import React, {useState} from 'react';
import { useDrag } from 'react-dnd'
import './myStyles.css';
import {ItemTypes} from "../utils/items";
import Modal from 'react-modal'
import { v4 as uuidv4 } from 'uuid';


const Card = ({ card, id, setName, setDelete, data}) => { 

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

                <p className="cardTitle">{card.title}</p>  
                <p>{card.description}</p>
                <div className="cardBtns">
                    <p>{card.name}</p>
                    <button className="button " onClick={() => setModal(true)}>Öffnen</button>
                    {card.deletable?
                        <button className="buttonDel" onClick={() => setDelete(id)}>X</button> :""
                    }  
                </div>
                
                <Modal isOpen = {modalIsOpen} ariaHideApp={false}>

                    <div className="modal">
                        {data.setup.rounds>1 && data.setup.groups>1?
                        <p className="modalHead">R{card.round} G{card.group}</p>:""}
                        <h2 className="modalTitle">{card.title}</h2>
                        <br></br>
                        <h3>{card.description}</h3>
                        <p>{card.content}</p>
                        <br></br>

                        {card.images.map(url => 
                            <img src={"/data/img/"+url} alt="" height="300" key={uuidv4()}/>
                        )}
                        
                        
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