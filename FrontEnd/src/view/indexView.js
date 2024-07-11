import React, { useState, useEffect } from 'react';
import './index.css'
import toast from 'react-stacked-toast';
import axios from 'axios';


function IndexView() {
    const base_url="http://127.0.0.1:3005/api"
    const [dataProduct, setDataProduct] = useState({});
    const [phone, setPhone] = useState(null);
    const [scoreBroad, setScoreBroad] = useState([]);

 

  
    const setphoneNumber=(e)=>
    {
        setPhone(e.target.value)
    
    }
    const sendSubmit=()=>{
        if(!phone)
        {
            toast.error({
                title: 'Error!',
                description: 'Please enter phone number',
            });
            return;
        }
        axios.post(`${base_url}/getSale`,{phone}).then(()=>{
            toast.success({
                title: 'Success!',
                description: 'Bạn đã đặt hàng thành công',
            });
        }).catch((e)=>{
            
            toast.error({
                title: 'Error!',
                description: "1 số điện thoại chỉ được đăng ký 1 làn",
            });
        })
    }
    useEffect(() => {
        try {
            axios.get(`${base_url}/getFlashSellProduct`).then(res=>{
                setDataProduct(res.data)
            })
          
        } catch (error) {
            toast.error({
                title: 'Error!',
                description: 'Something went wrong',
            });
        }
       
    }, []);



    return (
        <>
            <div class="height d-flex justify-content-center align-items-center">
    
    <div class="card p-3">
        
        <div class="d-flex justify-content-between align-items-center ">
            <div class="mt-2">
                
                <div class="mt-5">
                    <h5 class="text-uppercase mb-0">{dataProduct.name}</h5>
                   
                </div>
            </div>
            <div class="image">
                <img src="https://images.samsung.com/vn/smartphones/galaxy-z-fold6/images/galaxy-z-fold6-features-kv.jpg" width="200"/>
            </div>
        </div>
        
       
        
        <p>{dataProduct.description}</p>
        <input type="text" class="form-control" max={20} required id="phone" onChange={setphoneNumber} aria-describedby="basic-addon3"></input>
        <button onClick={sendSubmit}  class="btn btn-danger">Add to cart</button>
    </div>
    
</div>
        </>
    );
}

export default IndexView;
