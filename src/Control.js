import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Points from './components/Points';
import Menu from './components/Menu';
import axios from 'axios';
import Land from './components/Land';


export default function () {
    const [menu, setMenu] = useState(null);
    const [err, setErr] = useState(null);
    const [user, setUser] = useState({
        email: "Guest",
        points: 0,
        token: "",
        id: null,
    });

    function logOut(){
        setUser({
            email: "Guest",
            points: 0,
            token: "",
            id: null
        });
    };
    function change(thing) {

        setUser({
            ...user,
            ...thing
        });
    }
    function what(){
        async function fetchData() {
        await axios({
          method: 'get',
          url: '/api/menu',
          headers: {"Authorization": "Bearer " + user.token}
        }).then((result) => { setMenu(result.data); }).catch((error) => { setErr(error) });

      }

      fetchData()

    };

    if (!menu && user.id){

        what();



    }

    return (

        <div>
            <Router>
                <NavBar data={user} log={logOut} />
                <Route exact path="/">
                <Land/>
                </Route>
                <Route path="/login">
                    <Login changeDis={change} />
                </Route>
                <Route path="/register">
                    <Register changeDis={change} />
                </Route>

                <Route path="/points">
                    <Points data={user} changeDis={change}/>
                </Route>

                <Route path="/menu">
                    <Menu data={user} menu={menu}/>
                </Route>

            </Router>
        </div>
    )
}
