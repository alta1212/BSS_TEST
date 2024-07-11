import React, { useState, useEffect } from 'react';
import './index.css'
import toast from 'react-stacked-toast';
import axios from 'axios';


function IndexView() {
    const base_url="http://127.0.0.1:3005/api"
    const [dataProduct, setDataProduct] = useState(null);
    const [phone, setPhone] = useState(null);

 

  
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
                if(res.status==204)
                {
                    return
                }
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
                {dataProduct!=null?
                        <div  class="card p-3">
                        
                        <div class="d-flex justify-content-between align-items-center ">
                            <div class="mt-2">
                                
                                <div class="mt-5">
                                    <h5 class="text-uppercase mb-0">{dataProduct.name}</h5>
                                
                                </div>
                            </div>
                            <div class="image">
                                <img src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_75/https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-2-200x200.jpg" width="100"/>
                            </div>
                        </div>
                        
                    
                        
                        <p>{dataProduct.description}</p>
                        <input type="text" class="form-control" max={20} required id="phone" onChange={setphoneNumber} aria-describedby="basic-addon3"></input>
                        <button onClick={sendSubmit}  class="btn btn-danger">Add to cart</button>
                    </div>:<b1>No product</b1>
                }
                
                
            </div>
        </>
    );
}

export default IndexView;
