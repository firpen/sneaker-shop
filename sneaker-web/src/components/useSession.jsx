import { useEffect, useState } from "react"

export const useSession = () => {
    const [userInfo, setUserInfo] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5050/api/auth/me", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((response) => {
            if (response.status === 200) {
                setIsLoggedIn(true)
                return response.json()
            } else {
                setIsLoggedIn(false)
            }
        }).then((data) => {
            setUserInfo(data)
        })
    }, [])

    return {
        isLoggedIn,
        userInfo
    }
}