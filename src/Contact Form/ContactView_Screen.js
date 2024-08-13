import React, { useEffect, useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import '../Styles/contact_view.css';

export default function ContactView_Screen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [Data, setdata] = useState([])
    const[search,setsearch]= useState('')

    useEffect(() => {
        Data_fetching()
    }, [])  


    let Data_fetching = async()=> {
        let Fetching = await fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json');
        let usersdata = await Fetching.json();
        setdata(usersdata);             
    }   

    let display_form = () => {
        document.getElementById('display').style.display = 'inline'
    }

    let hidden = () => {
        document.getElementById('display').style.display = 'none'
    }
     
    let submitdata = () => {       
        let id = Data.length+1
        setdata([...Data,{name,email,mobile,address,id}])  
    }

    let delete_data = (id)=>{
        setdata( Data.filter((item)=>item.id !== id))
    }

    return (
        <>
            <div className='contact-form'>
                <div className='main'>
                    <div className='Main_head'>
                        <h2>All Contacts </h2>
                        <h3 className='add_data' id='none' onClick={() => { display_form() }}><IoIosAddCircleOutline /></h3>
                    </div>
                    <input type='text' placeholder='Search Contact.....' className='Search'onChange={(e) =>{setsearch(e.target.value)}} />
                    {Data && Data.length>0 ? Data.filter((info)=>(
                        info.name.toLowerCase().includes(search.toLowerCase())
                    )).map((user)=>(
                        <div className='default-data' key={user.id}>
                           <p className='text-dark'>{user.id}</p>
                            <h5><BsPersonCircle/></h5>
                            <div>
                                <p>{user.name}</p>
                                <p>{user.mobile}</p>
                            </div>
                            <p className='text-dark'><IoEye /></p>
                            <p onClick={()=>{delete_data(user.id)}}><MdDelete /></p>
                            <p><MdEdit /></p>
                        </div>
                    )):<h1 className='text-sucess mt-4'>No Data Available</h1>}
                </div>
                <div className='add_contact' id='display'>
                    <div className='add_details'>
                        <h4>Add Contact</h4>
                        <h3 onClick={hidden}><CiCircleRemove /></h3>
                    </div>
                    <form>
                        <label className='label'>Name:-</label>
                        <input type='text'  placeholder='Enter your Name' onChange={(e)=>{setName(e.target.value)}} /><br />
                        <label className='label'>Email:-</label>
                        <input type='email' placeholder='Enter your Email' onChange={(e)=>{setEmail(e.target.value)}} /><br />
                        <label className='label'>PhoneNumber:-</label>
                        <input type='tel' placeholder='Enter your Phonenumber'  onChange={(e)=>{setMobile(e.target.value)}} /><br />
                        <label className='label'>Address:-</label>
                        <input type='text' placeholder='Enter your Address' onChange={(e)=>{setAddress(e.target.value)}}/>
                    </form>
                        <div>
                            <button className='btn btn-primary m-3' onClick={submitdata}>Submit</button>
                            <button className='btn btn-danger m-3'>Reset</button>
                        </div>
                </div>
            </div>
        </>
    )
}
