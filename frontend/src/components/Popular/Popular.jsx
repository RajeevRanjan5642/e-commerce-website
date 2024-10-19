import React,{useState,useEffect} from 'react'
import './Popular.css'
import Item from './../Item/Item'

const Popular = () => {
    const [popularInWomen,setPopularInWomen] = useState([]);
    const backend_url = process.env.REACT_APP_API_URL;
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`${backend_url}/api/products/popularInWomen`);
            const json = await response.json();
            if(response.ok){
                setPopularInWomen(json);
            }
        };
        fetchData();
    },[]);
    return ( 
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularInWomen.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    );
}
 
export default Popular;