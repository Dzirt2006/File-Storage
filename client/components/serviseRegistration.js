import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function ServicePage() {
    const [service, SetService] = useState([]);
    const [serviceInpt, SetServiceInpt] = useState({ name: '', url: '' });

    useEffect(async () => {

    }, [])

    function input(event) {
        event.preventDefault();
        SetServiceInpt({ ...serviceInpt, [event.target.name]: event.target.value });
    }

    async function addService(event) {
        event.preventDefault();
    }


    return (
        <div>
            <div>
                <form onSubmit={addService}>
                    <label htmlFor="serviceName">Service Name</label><br />
                    <input type="text" name="serviceName" onChange={input} /><br /><br />
                    <label htmlFor="url">url</label><br />
                    <input type="text" name="url" onChange={input} /><br /><br />
                    <input type="submit" value="submit" />
                </form>
            </div>
            <div>
                <center>
                    <table style="border: 1px solid black;">
                        <tr>
                            <th>name</th>
                            <th>url</th>
                            <th>key</th>
                        </tr>
                        {!!service &&
                            service.map(data => (
                                <tr>
                                    <th>{data.name}</th>
                                    <th>{data.url}</th>
                                    <th>{data.uuid}</th>
                                </tr>
                            ))
                        }
                    </table>
                </center>
            </div>
        </div>
    )

}