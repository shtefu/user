import React, { useState } from 'react';

export default function(props){
    const [qty, setQty] = useState(0)
    function add(e){
        props.set(props.thing.id, qty+1);
        setQty(qty+1);
        
    }
    function sub(e){
        if(qty<1){
            return;
        }
        props.set(props.thing.id, qty-1);
        setQty(qty-1);
        
    }

    return(
        <div className="Item">
            <img src={props.thing.img_url} alt="image"></img>
            <h3>{props.thing.name}</h3>
            <b>{props.thing.price}</b>
            <div className="qty">
            <button onClick={sub}>-</button>
            <p>{qty}</p>
            <button onClick={add}>+</button>
            </div>
            
        </div>
    )
}