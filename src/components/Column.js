import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';
import './myStyles.css';


const Column = (props) => {
    
    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => props.changeStatus(item.id, props.status),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    return (

        <div ref={drop} className='drop-wrapper' style={{ background: isOver? '#E4F9D4': ''}}> 
            <div className="columnTitle" >{props.status}</div> 
            <div className="columnGrid">{props.children}</div>      
        </div>
    )
}

export default Column;
