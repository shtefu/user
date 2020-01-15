import React, {useState, useEffect} from 'react';
import Item from './simplifiers/Item';
import axios from 'axios';
var arrg = 0;
export default function(props){
    if (!props.data.id){
        return(
            <p>Please log in</p>
        )
    }
    const [lazy, setLazy] = useState(0);
    if (!arrg)
    arrg = props.menu.map(
            (thing)=>{
                return {user_id:props.data.id, fooditem_id:thing.id, qty:0}
            }
        );
    function set(e, n){
        for (var shto=0;shto<arrg.length;shto++){
            
            if (arrg[shto].fooditem_id===e){
                
                arrg[shto]={...arrg[shto], qty:n};
                break;
            }
        }
        setLazy(e+e+n);
    }
    

    function submit(e){
            e.preventDefault();
            arrg = arrg.filter((order)=> order.qty>0);
            async function fetchData() {
                await axios({
                    method: 'post',
                    url: '/api/order',
                    data:{items: arrg},
                    headers: {"Authorization": "Bearer " + props.data.token}
                }).then((result) => { console.log("success")}).catch((error) => { setErr(error) });
            }
            fetchData()
            arrg=0;
            
        }
    
    
    const [error, setErr] = useState(null)
    
    let availables = props.menu.map((thing)=><Item key={thing.id} thing={thing} set={set}/>)
    
    
    return(
        <div className="menu">
            {availables}
            <div className="menuButton">
                <button onClick={submit}>Order</button>
            </div>
        </div>
    )
    
    
}