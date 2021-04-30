import React, {useState} from 'react';
import './myStyles.css';
import Column from './Column';
import Card from './Card';
import Footer from './Footer'

import dataCards from './data/cards.json'



const Main = (props) => {

    

    
    let columns = props.dataColumns;



    const [cards , setCardList ] = useState(props.dataCards);


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


    


    return (  
        
        <div>
            <div key={50} className="grid">

                {
                    columns.map(column=>
                    
                        <div  key={column.id+300} className ='columns' > 

                            
                                <Column key={column.id} column={column} status={column.status} changeStatus={changeStatus}>
                                    {
                                        cards.map((card)=>
                                            (card.status === column.status) ?
                                                <Card key={card.id} id={card.id} card={card} setName={setName}/> : ""    
                                        )
                                    }    
                                </Column>
                          
                        </div>
                        
                    )
                }
    
            </div> 
        <Footer save = {save}/> 
    
    </div>
        
    )
}

export default Main;