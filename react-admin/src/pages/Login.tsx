import React, {Component, useState} from 'react';

const Login = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="container">
            <h1>Count: {count}</h1>
            <input type="number" onChange={e => setCount(parseInt(e.target.value)) } />
        </div>
    )
}

export default Login;