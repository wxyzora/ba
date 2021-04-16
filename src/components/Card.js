import React from 'react';
import './myStyles.css';


class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {


        return(
            <div class='cards'>
                {this.props.title}
                <br></br>
                <br></br>
                {this.props.content}
            </div>


        )
    }

}

export default Card;