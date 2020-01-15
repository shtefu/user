import { Redirect } from 'react-router';
import React, { useState } from 'react';
import Form from './simplifiers/Form';
import axios from 'axios';

const INITIAL_CONTEXT = {
  email: "",
  password: "",
  password_confirmation: ""
}

export default function (props) {
  const { handleChange, details } = Form(INITIAL_CONTEXT);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  function register(e) {
    e.preventDefault();
    async function fetchData() {
      await axios({
        method: 'post',
        url: '/api/register',
        data: details
      }).then((result) => { setData(result.data); }).catch((error) => { setErr(error.respose) });

    }
    fetchData()
  }

  console.log(data);
  let show = ""
  if (err) show = Object.values(err).map((val) => (<div><p>{val}</p></div>))
  if (data) {
    props.changeDis(
      {
       email:data.user.email,

       token:data.token,

       id: data.user.id,
      }
      )
      return <Redirect to='/' />

  }


  return (
    <>
      <form>
        <input type="text" value={details.email} name="email" placeholder="Email address" onChange={handleChange} />
        <input type="password" value={details.password} name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" value={details.password_confirmation} name="password_confirmation" placeholder="Confirm password" onChange={handleChange} />
        <button onClick={register}>Submit</button>
      </form>
      {
        show
      }
    </>
  );
}
