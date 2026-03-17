import React, { useState } from "react";
import "../../css/Admin.css"
import { GetProducts } from "../../hooks/GetProducts";
import { GetCategories } from "../../hooks/GetCategories";


function Admin ({ userInfo }) {
    const { products, productError, productLoading } = GetProducts();
    const { categories, categoryError, categoryLoading } = GetCategories();

    const [selectedSizes, setSelectedSizes] = useState([]);
    const sizeChart= ["38", "38.5", "39", "40", "40.5", "41", "42", "42.5", "43", "44", "44.5", "45", "46", "46.5", "47"];

    const [editMode, setEditMode] = useState(false);

    const [productColor, setProductColor] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productActive, setProductActive] = useState(false);

    const [error, setError] = useState("");

    /** JSX components */
    const ListProducts = () => {
        return products.map(p => (
                <div key={p.name} className="admin-product-card">
                    <h2>{p.name}</h2>
                    <button className="icon" onClick={() => handlePublicizeClick(p.productId)}>{p.active ? <i className="fa-solid fa-eye fa-2xl"></i> : <i className="fa-solid fa-eye-slash fa-2xl"></i>}</button>
                    <button className="delete">Delete</button>
                    <button className="edit" onClick={() => handleEditProductClick(p.productId)}>Edit</button>
                </div>
            ))
    }

    const ListCategories = () => {
        return (
            <select name="categories" value={productCategory} onChange={(e) => {
                setProductCategory(e.target.value)
            }}>
                <option value={"Select a category"}>Select a category</option>
                {categories.map(c => (
                    <option key={c.categoryId} onSelect={() => console.log(c.categoryId)} value={c.categoryId}>{c.name}</option>
                ))}
            </select>
        )
    }
    /** End JSX components */

    /** Variants Click Events */
    const handleSizeClick = (target, size) => {
        if (target.classList.contains("selected")) {
            setSelectedSizes(selectedSizes.filter(a => a.size !== size))
        } else if (productColor !== "") {
            setSelectedSizes([...selectedSizes, { color: productColor, size: size }])
        }
    }
    /** End Variants Click Events */

    /** Click Events */
    const handleEditProductClick = (productID) => {
        const filter = products.filter(p => p.productId === productID)
        setProductColor(filter[0].color)
        setProductDesc(filter[0].description)
        setProductName(filter[0].name)
        setProductPrice(filter[0].price)
        setProductCategory(filter[0].category.categoryId)
        setSelectedSizes(filter[0].productVariants)
        setEditMode(true)
    }

    const exitEditProductClick = (productID) => {
        const filter = products.filter(p => p.productId === productID)
        setProductColor("")
        setProductDesc("")
        setProductName("")
        setProductPrice("")
        setProductCategory("")
        setSelectedSizes("")
        setEditMode(false)
    }

    const handleCreateProductClick = () => {
        if (validate()) {
            fetch(`http://localhost:8080/api/products`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "category": productCategory,
                    "name": productName,
                    "description": productDesc,
                    "price": productPrice,
                    "isActive": productActive,
                    "img": productImage,
                    "productVariant": selectedSizes
                })
            }).then((response) => {
               if (response.ok)  window.location.reload();
            })
        }
    }

    const handlePublicizeClick = (productID) => {
        fetch(`http://localhost:8080/api/products/${productID}/update-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((response) => {
            if (response.ok)  window.location.reload();
        })
    }

    const validate = () => {
        if (productCategory !== "" || productColor !== "" || productDesc !== "" || productName !== "" || productPrice !== "" || productImage !== "" || selectedSizes.length > 0) {
            return true;
        }

        setError("One of the fields is empty")
        return false
    }
    /** End Click Events */

    /** Change Events */
    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.replace("data:", "").replace(/^.+,/, '');
            setProductImage(base64)
        }

        reader.readAsDataURL(e.target.files[0])
    }
    /** End Change Events */

    return (
        <div className="container">
            <div className="row">
                <div className="col-item">
                    <div className="admin-card">
                        <h1>Create</h1>
                        <form>
                            { error ? <p>{error}</p> : ""}
                            <label id="productName">Name</label>
                            <input id="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <label id="productDesc" >Description</label>
                            <input id="productDesc" type="text" value={productDesc} onChange={(e) => setProductDesc(e.target.value)} />
                            <label id="productImage">Image</label>
                            <input id="productImage" type="file" onChange={handleImageChange} />
                            <label id="productPrice">Price</label>
                            <input id="productPrice" type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                            <label id="productCategory">Category</label>
                            { categoryError ? <p>{categoryError}</p> : ""}
                            { categoryLoading ? <p>loading</p> : <ListCategories />}
                            <label id="productColor">Color</label>
                            <input id="productColor" type="text" value={productColor} onChange={(e) => setProductColor(e.target.value)} />
                            <label id="productSize">Size</label>
                            <div className="sizechart">
                                {sizeChart.map(size => (
                                    <input type="button" id={size} className={selectedSizes.find(a => a.size === size) ? "selected" : ""} onClick={e => handleSizeClick(e.target, size)} key={size} value={size} />
                                ))}
                            </div>
                            { editMode ? <div>
                                <input type="button" onClick={handleCreateProductClick} value={"Save"} />
                                <input type="button" onClick={exitEditProductClick} value={"Exit"} />
                            </div> : <input type="button" onClick={handleCreateProductClick} value={"Create Product"} /> }
                        </form>
                    </div>
                </div>
                <div className="col-item">
                    <div className="admin-card">
                        <h1>Search</h1>
                        <form>
                            <input />
                        </form>
                    </div>
                    { productError ? <h1>{productError}</h1> : ""}
                    { productLoading ? <h1>Loading</h1> : <div>{ products.length > 0 ? <ListProducts /> : <h1>No products</h1>}</div> }
                </div>
            </div>
        </div>
    )
}

export default Admin;