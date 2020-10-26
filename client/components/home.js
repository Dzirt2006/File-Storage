import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';


function Home() {
    const history = useHistory();
    const uuid = useParams().id;

    useEffect(() => {
    }, [])


    async function onClickHandleLogin(event) {
        event.preventDefault();
        const user = { email: event.target.email.value, password: event.target.password.value }
        if (uuid) {
            await axios.put('/api/auth/side_login', user)
                .catch(() => {
                    alert(`Wrong input data`) // this will log an empty object with an error property
                });
        } else {
            await axios.put('/api/auth/login', user)
                .then(user => history.push(`/services/${user.data.id}`)).catch(() => {
                    alert(`Wrong input data`) // this will log an empty object with an error property
                });
        }

    }
    function onClickHandleSignUp(event) {
        event.preventDefault();
        history.push('/api/signup');
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