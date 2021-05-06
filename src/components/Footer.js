import React from 'react';

const Footer = (props) => {
    
    return (
        <div className="footer">  
             {props.children}
             <button className="button" type="button" onClick={props.save}>Speichern</button>
        </div> 
    )
}

export default Footer;