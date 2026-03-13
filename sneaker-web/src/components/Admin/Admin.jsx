import React, { useState } from "react";
import "../../css/Admin.css"
import { GetProducts } from "../../hooks/GetProducts";
import { GetCategories } from "../../hooks/GetCategories";


function Admin ({ userInfo }) {
    const { products, productError, productLoading } = GetProducts();
    const { categories, categoryError, categoryLoading } = GetCategories();

    const [selectedSizes, setSelectedSizes] = useState([]);
    const sizeChart= [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47];

    const [productColor, setProductColor] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productActive, setProductActive] = useState(false);

    const [error, setError] = useState("");

    const ListProducts = () => {
        return products.map(p => (
                <div key={p.name} className="admin-product-card">
                    <h2>{p.name}</h2>
                    <button className="icon">{p.active ? <i className="fa-solid fa-eye fa-2xl"></i> : <i className="fa-solid fa-eye-slash fa-2xl"></i>}</button>
                    <button className="delete">Delete</button>
                    <button className="edit">Edit</button>
                </div>
            ))
    }

    const ListCategories = () => {
        return (
            <select name="categories" value={productCategory} onChange={(e) => {
                setProductCategory(e.target.value)
                console.log(e.target.value)
            }}>
                <option value={"Select a category"}>Select a category</option>
                {categories.map(c => (
                    <option key={c.categoryId} onSelect={() => console.log(c.categoryId)} value={c.categoryId}>{c.name}</option>
                ))}
            </select>
        )
    }

    const handleSizeClick = (e, size) => {
        if (e.target.classList.contains("selected")) {
            setSelectedSizes(selectedSizes.filter(a => a.size !== size))
        } else if (productColor !== "") {
            setSelectedSizes([...selectedSizes, { color: productColor, size: size }])
        }
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

    const validate = () => {
        if (productCategory !== "" || productColor !== "" || productDesc !== "" || productName !== "" || productPrice !== "" || productImage !== "" || selectedSizes.length > 0) {
            return true;
        }

        setError("One of the fields is empty")
        return false
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.replace("data:", "").replace(/^.+,/, '');
            setProductImage(base64)
        }

        reader.readAsDataURL(e.target.files[0])
    }

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
                            <div className="addvariant">
                                {sizeChart.map(size => (
                                    <input type="button" className={selectedSizes.find(a => a.size === size) ? "selected" : ""} onClick={e => handleSizeClick(e, size)} key={size} value={size} />
                                ))}
                            </div>
                            <input type="button" onClick={handleCreateProductClick} value={"Create Products"} />
                        </form>
                    </div>
                </div>
                <div className="col-item">
                    <div className="admin-card">
                        <h1>Hello</h1>
                    </div>
                    { productError ? <h1>{productError}</h1> : ""}
                    { productLoading ? <h1>Loading</h1> : <div>{ products.length > 0 ? <ListProducts /> : <h1>No products</h1>}</div> }
                </div>
            </div>
        </div>
    )
}

export default Admin;