import React from 'react';
import './myStyles.css';
import Column from './Column';

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {    

            cards: [

                {
                    title: "test1",
                    content: "try this",
                    column: "Aufgaben"

                },

                {
                    title: "Test2",
                    content: "let's see",
                    column: "Aufgaben"
        
                },

                {
                    title: "Test3",
                    content: "let's see",
                    column: "Aufgaben"
        
                },

                {
                    title: "Test4",
                    content: "let's see",
                    column: "Aufgaben"
        
                },

                {
                    title: "Test5",
                    content: "let's see",
                    column: "Aufgaben"
        
                },

                {
                    title: "Test6",
                    content: "let's see",
                    column: "Aufgaben"
        
                }
                
            ]
        }
    }

    sortCards() {
        let cardsAufg = this.state.cards.filter(function (card) {
        return card.column === "Aufgaben";
        });

        let cardsInArb = this.state.cards.filter(function (card) {
            return card.column === "In Arbeit";
         });
        let cardsFert = this.state.cards.filter(function (card) {
            return card.column === "Fertig";
        })

        let cards = {cardsAufg, cardsInArb, cardsFert}
        

        return cards
    };



    addCard() {
        console.log("clicked", this.state.cards)
        
        
    }

    render() {

        
        let cards = this.sortCards();
        console.log(cards)
        
        return(
             
            <div>
               <div class="grid"> 
                 <Column name = "Aufgaben" cardsArr={cards.cardsAufg}/>
                 <Column name = "In Arbeit" cardsArr={cards.cardsInArb}/>
                 <Column name = "Fertig" cardsArr={cards.cardsFert}/>
                </div>
                
                <button onClick={() => this.addCard()}>Aufgabe hinzufügen</button>
                <div class='infoMain'>Runde: {this.props.round} <br></br> Gruppe: {this.props.group}</div>
                
            </div>
        )
    }
  
}

export default Main;