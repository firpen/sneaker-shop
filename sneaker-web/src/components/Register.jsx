import React, { useState } from "react"
import "../css/Login.css"
import { useSession } from "./useSession"

function Register () {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoggedIn, userInfo } = useSession()

    if (isLoggedIn) return window.location.href = "/"

    const handleClick= () => {
        fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "passwordHash": password,
                "firstName": firstName,
                "lastName": lastName
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

    const handleFirstNameChange = (e) => {
        setfirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setlastName(e.target.value)
    }


    return (
        <div className="container">
            <div className="card">
                <div className="gird-item">
                    <h1>Register</h1>
                    <form>
                        <label id="firstname">First name</label>
                        <input type="text" id="firstname" title="firstname" onChange={handleFirstNameChange} value={firstName} placeholder="first name" />
                        <label id="lastname">Last name</label>
                        <input type="text" id="lastname" title="elastnamel" onChange={handleLastNameChange} value={lastName} placeholder="last name" />
                        <label id="email">Email</label>
                        <input type="text" id="email" title="email" onChange={handleEmailChange} value={email} placeholder="email" />
                        <label id="password">Password</label>
                        <input type="password" title="password" id="password" onChange={handlePasswordChange} value={password} placeholder="password" />
                    </form>
                    <button onClick={handleClick}>Register</button>
                    <a href="/login">Have an account already, Click here to login!</a>
                </div>
                <div className="gird-item">
                    <img src="Right_Side.png" />
                </div>
            </div>
        </div>
    )
}

export default Register;