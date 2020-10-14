import React from 'react';
import axios from 'axios';


function SignUp() {

   async function onClickHandleSignUp(event) {
        event.preventDefault();
        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        console.log(user.password,event.target.password2)
        if(user.password===event.target.password2.value){
            await axios.post('/auth/signup',user);
        }else{
            alert("Please retype your password");
        }
    }

    return (
        <div>

            <center>
                <h3>SignUp</h3><br /><br />
                <p>Welcome to MyAuth signup. Please fill up the form: </p><br />
                <form onSubmit={onClickHandleSignUp}>
                    <label htmlFor="email">email</label><br />
                    <input type="text" name="email" /><br /><br />
                    <label htmlFor="password">password</label><br />
                    <input type="text" name="password" /><br /><br />
                    <label htmlFor="passwordRep">Please repeat your password</label><br />
                    <input type="text" name="password2" /><br /><br />
                    <input type="submit" value="submit" />
                </form ><br />
              
            </center>
        </div>
    )

}

export default SignUp;