import React from 'react';

const Header = (props) => {
    
    return (
        <div>
            <div className="header">Runde: {props.round} Gruppe: {props.group} {props.children}</div>    
        </div>
    )
}

export default Header;