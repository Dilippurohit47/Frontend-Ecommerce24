import { ChangeEvent ,FormEvent,useEffect,useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { cartReducerInitialState } from '../types/reducer-type';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../redux/reducer/store';
import axios from 'axios';
import toast from 'react-hot-toast';
import { saveShippingInfo } from '../redux/reducer/cartReducer';

const Shipping = () => {


  const { cartItems ,total } =
    useSelector(
      (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
    );



    const[shippinginfo , setshippinginfo] = useState({
        address : "",
        city : "",
        state : "",
        country :"",
        pincode :"",
    });

    const changehandler = (e:ChangeEvent<HTMLInputElement| HTMLSelectElement >)=>{
      setshippinginfo((prev) => ({...prev,[e.target.name] : e.target.value}))

    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

const submitHandler = async (e:FormEvent<HTMLFormElement>) =>{

  e.preventDefault();

 dispatch(saveShippingInfo(shippinginfo))


  try {
    const {data} = await axios.post(`${server}/api/v1/payment/create`,{
      amount : total,
    },{
      headers :{
        "Content-Type":"application/json",
      }
    })
    
    navigate("/pay",{
      state:data.clientSecret,
    })

  } catch (error) {
    console.log(error)
    toast.error("something went wrong")
  }


}


useEffect (() =>{
  if(cartItems.length <=0) return navigate("/cart")


},[cartItems])




  return (
    <div className='shipping'>
<button className='back-btn' onClick={() =>navigate('/cart') }><BiArrowBack/></button>
<form onSubmit={submitHandler} >

    <h1>Shipping Address </h1>
    <input type="text" required placeholder='address' name = 'address' value ={shippinginfo.address} onChange={changehandler } />
    <input type="text" required placeholder='city' name = 'city' value ={shippinginfo.city} onChange={changehandler } />
    <input type="text" required placeholder='state' name = 'state' value ={shippinginfo.state} onChange={changehandler } />
    {/* <input type="text" required placeholder='country' name = 'country' value ={shippinginfo.country} onChange={changehandler } /> */}

    <select name="country" required value={shippinginfo.country} onChange={changehandler}> 
    
    <option value="">Choose Country</option>
    <option value="india">India</option>
    <option value="america">America</option>
    <option value="rusia">Rusia</option>
    <option value="mars">Mars</option>
    </select>


    <input type="number" required placeholder='pincode' name = 'pincode' value ={shippinginfo.pincode} onChange={changehandler } />

    <button type='submit'>Pay Now</button>
</form>

    </div>
  )
}

export default Shipping
