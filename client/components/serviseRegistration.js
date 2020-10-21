import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';


function ServicePage() {
    const [service, SetService] = useState([]);
    const [serviceInpt, SetServiceInpt] = useState({ name: '', url: '' });

    useEffect(() => {
        async function getAll() {
            await axios.put('/api/services/all')
                .then(data => { SetService(data.data) });
        }
        getAll();
    }, [])

    function input(event) {
        event.preventDefault();
        SetServiceInpt({ ...serviceInpt, [event.target.name]: event.target.value });
    }

    async function addService(event) {
        event.preventDefault();
        await axios.post('api/services/', serviceInpt);
        SetServiceInpt({ name: '', url: '' });
    }

    console.log("services", service)
    return (
        <div>
            <center>
                <div>
                    <form onSubmit={addService}>
                        <label htmlFor="serviceName">Service Name</label><br />
                        <input type="text" name="name" onChange={input} /><br /><br />
                        <label htmlFor="url">url</label><br />
                        <input type="text" name="url" onChange={input} /><br /><br />
                        <input type="submit" value="submit" />
                    </form>
                </div>
                <div>
                    <table key='servicesTable'>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
            </center>
        </div>
    )

}

export default ServicePage;