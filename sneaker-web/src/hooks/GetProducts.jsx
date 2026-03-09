import { useEffect, useState } from "react"

export const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/products", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                setError("Something went wrong")
            }
        }).then((data) => {
            setProducts(data)
        }).catch((e) => {
            setError("Internal server error")
        })
    }, [])

    return {
        products,
        error
    }
}