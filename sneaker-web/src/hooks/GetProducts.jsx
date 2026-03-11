import { useEffect, useState } from "react"

export const GetProducts = () => {
    const [products, setProducts] = useState([]);
    const [productError, setError] = useState("");

    const [productLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/products", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((response) => {
            if (!response.ok) throw new Error("Failed to fetch products")
            return response.json()
        }).then((data) => {
            setProducts(data)
        }).catch((e) => {
            setError(e.message)
        }).finally(() => setLoading(false))
    }, [])

    return {
        products,
        productError,
        productLoading
    }
}