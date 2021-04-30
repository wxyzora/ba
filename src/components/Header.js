import React from 'react';

const Header = (props) => {
    
    return (
        <div className="header">Runde: {props.round} Gruppe: {props.group}</div>


    )
}

export default Header;