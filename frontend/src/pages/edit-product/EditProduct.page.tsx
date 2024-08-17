import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../constants/url.constant';
import { IProduct } from '../../types/global.typing';
import './edit-product.scss';

const EditProduct: React.FC = () => {
    const [product, setProduct] = useState<Partial<IProduct>>({ title: "", brand: "" });
    const redirect = useNavigate();
    const {id } = useParams();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        axios.get<IProduct>(`${baseUrl}/${id}`,)
            .then(response => setProduct({
                title: response.data.title,
                brand: response.data.brand,
            }));
    }, [])

    const handleSaveBtnClick = () => {
        if (product.title === "" || product.brand === "") {
            alert("Enter Values");
            return;
        }

        const data: Partial<IProduct> = {
            brand: product.brand,
            title: product.title
        };

        axios.put(`${baseUrl}/${id}`, data)
            .then(response => redirect("/products", { state: { message: "Product Update Successfully" } }))
            .catch(error => alert("Error"));
    }
    const handleBackBtnClick = () => { redirect("/products") }

    return (
        <div className="edit-product">
            <h2>Edit Product</h2>
            <TextField autoComplete='off' name="title" label="Title" variant="outlined" value={product.title} onChange={changeHandler} />
            <TextField autoComplete='off' name="brand" label="Brand" variant="outlined" value={product.brand} onChange={changeHandler} />
            <div>
                <Button variant='outlined' color='primary' onClick={handleSaveBtnClick}>Save</Button>
                <Button variant='outlined' color='secondary' onClick={handleBackBtnClick}>Back</Button>
            </div>

        </div>
    )
}
export default EditProduct