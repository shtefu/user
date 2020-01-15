import React, { useState } from 'react';
import Form from './simplifiers/Form';
import axios from 'axios';
import { Redirect } from 'react-router';

const INITIAL_CONTEXT = {
    email: "",
    password: "",
}

export default function (props) {
    const { handleChange, details } = Form(INITIAL_CONTEXT);
    const [data, setData] = useState(null);
    const [menu, setMeny] = useState(null);
    const [err, setErr] = useState(null);

    function login(e) {
        e.preventDefault();
        if (!details.email || !details.password) {
            setErr("Please enter both a username and password");
            return;
        }
        async function fetchData() {
            await axios({
                method: 'post',
                url: '/api/login',
                data: details
            }).then((result) => { setData(result.data); }).catch((error) => { setErr(error) });
        }
        fetchData()

        
    }

    let show = ""
    if (typeof (err) === 'string') show = err;
    else if (err) show = "Wrong credidentials";
    if (data) {
        props.changeDis(
        {
         email:data.user.email,
        
         token:data.token,
        
         id: data.user.id,
        
        points: parseInt(data.user.points)

        }
        )
        
    }
    //uwu
    if (data) return <Redirect to='/' />
    return (
        <div>

            <form onSubmit={login}>
                <input type="text" name="email" value={details.name} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={details.password} onChange={handleChange} placeholder="Password" />
                <button onClick={login}>Login</button>
            </form>
            {show}
        </div>
    )
}