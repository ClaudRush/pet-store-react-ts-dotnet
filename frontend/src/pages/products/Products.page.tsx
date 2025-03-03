import './products.scss'
import axios from 'axios';
import { useState, useEffect } from "react";
import { IProduct } from '../../types/global.typing';
import { baseUrl } from '../../constants/url.constant';
import { Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Products: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const location = useLocation();
    const redirect = useNavigate();

    const fetchProductList = async () => {
        try {
            const response = await axios.get<IProduct[]>(baseUrl);
            setProducts(response.data);
            if (location?.state) {
                Swal.fire({
                    icon: "success",
                    title: location?.state?.message
                });
                redirect(location.pathname, { replace: true })
            }
        } catch (e) {
            alert("There is an Error here!")
        }
    }

    useEffect(() => {
        fetchProductList();
    }, [])

    const redirectToEditPage = (id: string) => { redirect(`/products/edit/${id}`) }
    const redirectToDeletePage = (id: string) => { redirect(`/products/delete/${id}`) }

    return (
        <div className='products'>
            <h1>Products List</h1>
            {
                products.length === 0
                    ? (<h1>No Products</h1>)
                    : (
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Brand</th>
                                        <th>Title</th>
                                        <th>Creation Time</th>
                                        <th>Update Time</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr key={product.id}>
                                                <td>{product.brand}</td>
                                                <td>{product.title}</td>
                                                <td>{moment(product.createAt).fromNow()}</td>
                                                <td>{moment(product.updateAt).fromNow()}</td>
                                                <td>
                                                    <Button
                                                        variant="outlined"
                                                        color="warning"
                                                        sx={{ mx: 3 }}
                                                        onClick={() => redirectToEditPage(product.id)}>
                                                        <Edit />
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => redirectToDeletePage(product.id)}>
                                                        <Delete />
                                                    </Button>
                                                </td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }
        </div>
    )
}
export default Products