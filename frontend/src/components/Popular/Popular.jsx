import React,{useState,useEffect} from 'react'
import './Popular.css'
import Item from './../Item/Item'

const Popular = () => {
    const [popularInWomen,setPopularInWomen] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch('http://localhost:4000/api/products/popularInWomen');
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