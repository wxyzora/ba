import React from 'react';

const Header = (props) => {
    
    return (
        <div>
            <div className="header">{props.children}</div>    
        </div>
    )
}

export default Header;