import React from 'react';
import { useHistory } from 'react-router-dom';


function NavBar() {
    const history = useHistory();

    function onClickHome() {
        history.push('/')
    }

    return (
        <center><button variant="info" onClick={onClickHome}>Home</button></center>
    )

}







export default NavBar;