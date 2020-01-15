import React, { useState } from 'react';
import Form from './simplifiers/Form';
import axios from 'axios';
const INITIAL_STATE = {
    amount: 0,
    creditC: "",
    CVV: "",
}


export default function(props){
    const {handleChange, details} = Form(INITIAL_STATE);
    const [show, setShow] = useState("")
    const [what, setWhat] = useState(0);
    function money(e){
        e.preventDefault();
        
        if (details.amount>0 && details.creditC && details.CVV){
            async function fetchData() {
                await axios({
                    method: 'put',
                    url: '/api/points',
                    data: {"id":props.data.id, "change":details.amount},
                    headers: {"Authorization": "Bearer " + props.data.token}
                }).then((result) => { 
                    // return{"points":result.data};
                    props.changeDis({points:result.data});
                })
            }
            fetchData();
        }
        else setShow("Please fill all fields");
    }
    if (props.data.id)
    return (
        <div>

            <form onSubmit={money}>
                <input type="number" name="amount" value={details.amount} onChange={handleChange} placeholder="Amount" />
                <input type="text" name="creditC" value={details.creditC} onChange={handleChange} placeholder="Credit Card Number" />
                <input type="text" name="CVV" value={details.CVV} onChange={handleChange} placeholder="CVV" />
                <button onClick={money}>Add</button>
            </form>
            {show}
        </div>
    )
    return (<p>Please log in</p>);
}