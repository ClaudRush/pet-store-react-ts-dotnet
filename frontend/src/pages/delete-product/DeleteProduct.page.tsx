import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../constants/url.constant';
import './delete-product.scss';

const DeleteProduct: React.FC = () => {
    const redirect = useNavigate();
    const { id } = useParams();

    const handleDeleteBtnClick = () => {
        axios.delete(`${baseUrl}/${id}`)
            .then(response => redirect("/products", { state: { message: "Product Delete Successfully" } }))
            .catch(error => alert("Error"));
    }
    const handleBackBtnClick = () => { redirect("/products") }

    return (
        <div className="delete-product">
            <h2>Delete Product</h2>
            <h4>R U SHURE???</h4>
            <div>
                <div>
                    <Button variant='outlined' color='error' onClick={handleDeleteBtnClick}>Delete</Button>
                    <Button variant='outlined' color='secondary' onClick={handleBackBtnClick}>Back</Button>
                </div>
            </div>

        </div>
    )
}
export default DeleteProduct