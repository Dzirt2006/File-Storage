import React from 'react';
import { useHistory } from 'react-router-dom';


function NavBar() {
    const history = useHistory();

    function onClickHome() {
        history.push('/home')
    }

    return (
        <left><button variant="info" onClick={onClickHome}>Home</button></left>
    )

}







export default NavBar;