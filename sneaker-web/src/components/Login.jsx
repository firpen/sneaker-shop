import React, { useState } from "react"
import "../css/Login.css"
import { useSession } from "./useSession"

function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoggedIn, userInfo } = useSession()

    if (isLoggedIn) return window.location.href = "/"

    const handleClick= () => {
        fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
            credentials: "include"
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = "/"
            } else {
                return response.json()
            }
        }).then((data) => {
            console.log(data.parameterViolations)

        })

    } 

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
}
    return (
        <div className="container">
            <div className="card">
                <div className="gird-item">
                    <h1>Sign In</h1>
                    <form>
                        <label id="email">Email</label>
                        <input type="text" id="email" title="email" onChange={handleEmailChange} value={email} placeholder="email" />
                        <label id="password">Password</label>
                        <input type="password" title="password" id="password" onChange={handlePasswordChange} value={password} placeholder="password" />
                    </form>
                    <button onClick={handleClick}>Login</button>
                    <a href="/register">Don't have an account register click here!</a>
                </div>
                <div className="gird-item">
                    <img src="Right_Side.png" />
                </div>
            </div>
        </div>
    )
}

export default Login;