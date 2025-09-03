import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log("harshit", json)
        if (json.success) {
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert('Logged in successfully', 'success')
            navigate('/')
        }
        else {
            props.showAlert('Invalid Credentials', 'danger')
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ border: '2px solid black', width: '400px' ,borderRadius:'10px'}} className='my-3 container p-5'>
            <h2 className='text-center'>Login to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} name='email' value={credentials.email} id="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} name='password' value={credentials.password} id="password" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
            </form>
        </div>
    )
}

export default Login