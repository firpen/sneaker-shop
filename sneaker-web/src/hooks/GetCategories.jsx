import { useEffect, useState } from "react"

export const GetCategories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryError, setError] = useState("");
    const [categoryLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/categories", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((response) => {
            if (!response.ok === 200) throw new Error(`${response.status}`)
            return response.json()
        }).then((data) => {
            setCategories(data)
        }).catch((e) => {
            setError(`${e.message}`)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return {
        categories,
        categoryError,
        categoryLoading
    }
}