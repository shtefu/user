import {useState} from 'react';

export default function(initialState){
    const [details, setDetails] = useState(initialState);

    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        });
    }

    return {handleChange, details};
}