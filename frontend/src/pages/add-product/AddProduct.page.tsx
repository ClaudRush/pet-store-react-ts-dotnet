import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants/url.constant';
import { IProduct } from '../../types/global.typing';
import './add-product.scss';

const AddProduct: React.FC = () => {
    const [product, setProduct] = useState<Partial<IProduct>>({ title: "", brand: "" });
    const redirect = useNavigate();


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    }

    const handleSaveBtnClick = () => {
        if (product.title === "" || product.brand === "") {
            alert("Enter Values");
            return;
        }

        const data: Partial<IProduct> = {
            brand: product.brand,
            title: product.title
        };

        axios.post(baseUrl, data)
            .then(response => redirect("/products", { state: { message: "Product Created Successfully" } }))
            .catch(error => alert("Error"));
    }
    const handleBackBtnClick = () => { redirect("/products") }

    return (
        <div className="add-product">
            <h2>Add New Product</h2>
            <TextField autoComplete='off' name="title" label="Title" variant="outlined" value={product.title} onChange={changeHandler} />
            <TextField autoComplete='off' name="brand" label="Brand" variant="outlined" value={product.brand} onChange={changeHandler} />
            <div>
                <Button variant='outlined' color='primary' onClick={handleSaveBtnClick}>Save</Button>
                <Button variant='outlined' color='secondary' onClick={handleBackBtnClick}>Back</Button>
            </div>

        </div>
    )
}
export default AddProduct