import { useEffect, useState } from "react"

export const useSession = () => {
    const [userInfo, setUserInfo] = useState("");
    const [adminAccess, setAdminAccess] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/auth/me", {
            credentials: "include"
        }).then((response) => {
            if (response.status === 200) {
                setIsLoggedIn(true)
                return response.json()
            } else {
                setIsLoggedIn(false)
                return;
            }
        }).then((data) => {
            setUserInfo(data)
            if (data != null && data.role === "Admin") {
                setAdminAccess(true)
            }
        }).catch((e) => {
            console.log("Internal server error")
        })
    }, [])

    return {
        isLoggedIn,
        userInfo,
        adminAccess
    }
}