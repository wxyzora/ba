import React from 'react';
import { useDrag } from 'react-dnd'
import './myStyles.css';
import {ItemTypes} from "../utils/items";


const Card = ({ card, id, setName}) => { 



    const[{isDragging}, drag] = useDrag({
    
        type: ItemTypes.CARD,
        item: {id},
        

        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),


    })




   
    return (
         <div 
            ref={drag}
            className ='cards'
            
            style={{ opacity: isDragging? 0: 1}} 
            >

                <p>{card.title}</p>
                <p> {card.content}</p>

                
                <form>
                    {card.name==="" ?
                    <input className="inputName"
                       type='text' placeholder='Name' onChange={(e) => setName(e.target.value, id)} 
                    /> : <input className="inputName"
                    type='text' placeholder={card.name} onChange={(e) => setName(e.target.value, id)} 
                    />
                    }
                    
                </form>
        </div>

      

    )
}


export default Card;