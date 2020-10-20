import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function Home() {
    const history = useHistory();

    useEffect(() => {
    }, [])


    async function onClickHandleLogin(event) {
        event.preventDefault();
        const user = { email: event.target.email.value, password: event.target.password.value }
        console.log(user)
        await axios.post('/auth/login', user)
            .then(data => console.log(data));
    }
    function onClickHandleSignUp(event) {
        event.preventDefault();
        history.push('/signup');
    }

    return (
        <div>
            <center>
                <form onSubmit={onClickHandleLogin}>
                    <label htmlFor="email">email</label><br />
                    <input type="text" name="email" /><br /><br />
                    <label htmlFor="password">password</label><br />
                    <input type="text" name="password" /><br /><br />
                    <input type="submit" value="submit" />
                </form ><br />
                <button type="button" onClick={onClickHandleSignUp}>sign up</button>
            </center>
        </div>
    )

}

export default Home;