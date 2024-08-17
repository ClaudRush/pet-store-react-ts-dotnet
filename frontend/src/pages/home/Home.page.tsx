import './home.scss'
import { Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import pets from "../../assets/images/home-slider-1.jpg"

const Home: React.FC = () => {
    const redirect = useNavigate();
    return (
        <div className='home'>
            <h1>Wlcome to Pet Store</h1>
            <Button
                variant='outlined'
                color='primary'
                onClick={() => redirect("/products")}>
                Products List
            </Button>
            <img className="pets" src={pets} alt="peso" />
        </div>
    )
}
export default Home