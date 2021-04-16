import React from 'react';
import './myStyles.css';
import Card from './Card';



class Column extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    

    render() {

    
        return(

            <div class='columns'>
               <div class="columnTitle">{this.props.name}</div> 
                <div class='columnGrid'>
                
                        {
                            this.props.cardsArr.map(card =>
                                
                                 <Card title={card.title} content={card.content}/>
                                 )

                        }
                
                </div>
                
            </div>
        )
    }

}

export default Column;
