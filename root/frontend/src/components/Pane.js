// https://reactjs.org/docs/state-and-lifecycle.html
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quote from './Quote';

function Pane() {
    // sets states and update state functions
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // the empty array ensures that the component mounts only after the initial render
    // stops it from rendering after every change (infinitely)
    useEffect(() => {
        getData();
    }, []);

    // since useEffect does not use async to prevent race conditions
    // we make the function inside an async func
    async function getData() {
        await axios.get('http://localhost:8080/')
        .then(response => {
            setData(response.data)
            console.log(response);
        })
        .catch(err => {
            console.error(`Error fetching data\n${err}`);
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    if (loading) return 'Loading...';
    if (error) return 'Error...';

    // STYLES
    // ========================================================================

    const ulStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        border: '2px solid red',
    }

    const liStyle = {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '50vw',
        border: '2px solid green',
    }


    // ========================================================================

    // you don't need the nested return statement if you're not using curly braces
    return (
        <ul style={ulStyle}>
            {data.map((element) => 
                <li style={liStyle}>
                    <Quote 
                        quote={element.quote}
                        person={element.person}
                        date={element.date}
                        avatarUrl={element.avatarUrl}
                    />       
                </li>  
            )}
        </ul>
    );
}

export default Pane