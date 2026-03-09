import React, { useState } from "react";
import "../../css/Admin.css"
import { GetProducts } from "../../hooks/GetProducts";


function Admin ({ userInfo }) {
    const { products, error } = GetProducts();
    const [selectedSizes, setSelectedSizes] = useState([]);
    const sizeChart= [38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47];

    const [productColor, setProductColor] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productActive, setProductActive] = useState(false);

    const ListProducts = () => {
        return (
            <div>
                {products.map(p => {
                    <div className="admin-card">
                        <h2>{p.name}</h2>
                    </div>
                })}
            </div>
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
        fetch("http://localhost:5050/api/products", {
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
                "productVariant": selectedSizes
            })
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-item">
                    <div className="admin-card">
                        <h1>Create</h1>
                        <form>
                            <label id="productName">Name</label>
                            <input id="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <label id="productDesc" >Description</label>
                            <input id="productDesc" type="text" value={productDesc} onChange={(e) => setProductDesc(e.target.value)} />
                            <label id="productCategory">Image</label>
                            <input id="productCategory" type="file" onChange={(e) => setProductImage(URL.createObjectURL(e.target.files[0]))} />
                            <label id="productPrice">Price</label>
                            <input id="productPrice" type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                            <label id="productCategory">Category</label>
                            <input id="productCategory" type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
                            <label id="productColor">Color</label>
                            <input id="productColor" type="text" value={productColor} onChange={(e) => setProductColor(e.target.value)} />
                            <label id="productSize">Size</label>
                            <div className="addvariant">
                                {sizeChart.map(size => (
                                    <input type="button" className={selectedSizes.find(a => a.size === size) ? "selected" : ""} onClick={e => handleSizeClick(e, size)} key={size} value={size} />
                                ))}
                            </div>
                            <input type="button" value={""} />
                            <input type="button" onClick={handleCreateProductClick} value={"Create Products"} />
                        </form>
                    </div>
                </div>
                <div className="col-item">
                    <div className="admin-card">
                        <h1>Hello</h1>
                    </div>
                    { products.length > 0 ? <ListProducts /> : <h1>No products</h1>}
                </div>
            </div>
        </div>
    )
}

export default Admin;