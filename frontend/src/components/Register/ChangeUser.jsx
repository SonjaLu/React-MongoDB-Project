import React, { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './ChangeUser.css';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


const ChangeUser = ({id}) => {
  const navigate = useNavigate();
  // console.log(localStorage.getItem("user"))
  // const {username} = localStorage.getItem("user");
  // console.log(username);
  
  // useEffect(()=>{
  //   const temp = JSON.parse(localStorage.getItem("user"))
  //   console.log(temp.username);
  // },[]);

  const [newUsername, setUsername] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const formRef = useRef();
  
  const handleSubmit = async (e) => {
    e.preventDefault();


    const form = formRef.current;
   //========================================
    const formData = {
      oldusername : JSON.parse(localStorage.getItem("user")).username,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      username : form.newUsername.value,
    }
    console.log(formData)
    const config = {
      url: "http://localhost:8081/changeuser",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: formData
    }

      try {
        const resp = await axios(config);
        console.log(resp);
        //navigiere zu login
        navigate('/login');
    } catch (error) {
        // Fehlerbehandlung
        console.error('Updatefehler:', error);
    }
// ============================================
  //   const formData = new FormData();
  //   formData.set("newUsername", form.newUsername.value); //Wechsel von form.append()zu set()
  //   formData.set("firstName", form.firstName.value);
  //   formData.set("lastName", form.lastName.value);
  //   formData.set("email", form.email.value);

  //   console.log(formData);


  //   try{
  //   const config = {
  //     url: "http://localhost:8081/changeuser",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     data: formData
  //   }

  //   const resp = await axios(config);  // Hier ist ein Fehler...
  //   console.log("### " + resp);
  //  } catch (error){
  //   console.error(error);
  //  }
// ============================================
  };

  const onCloseRegister = () => {
    navigate('/login');
  };

  return (
    <div className='restaurant-form'>
      <h2>UPLOAD FILE</h2>
      <hr />

      <div>
      <label className="newUsername">User: {newUsername}</label>
        <hr />
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
     
        <label htmlFor="newUsername">Change newUsername:</label>

        <input type="text" className="name" id="newUsername" name="newUsername"
          required value={newUsername} onChange={e => setUsername(e.target.value)} />

        <label htmlFor="firstName">Change Firstname:</label>
        <input type="text" className="location" name="firstName" id="firstName" 
          required value={firstName} onChange={e => setFirstName(e.target.value)} />

        <label htmlFor="lastName">Change Lastname:</label>
        <input type="text" id="lastName" name="lastName"
          required value={lastName} onChange={e => setLastName(e.target.value)} />
        
        <label htmlFor="email">Change Email:</label>
        <input type="email" id="email" name="email"
          required value={email} onChange={e => setEmail(e.target.value)} />

        <div>
        <input type="submit" className="submit" value="Send Change" />
        <div className="longbtn" onClick={onCloseRegister} style={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}>
        &#8592; back
        </div>
        </div>
        
        
      </form>
      
        
        
    </div>
  )
}

export default ChangeUser