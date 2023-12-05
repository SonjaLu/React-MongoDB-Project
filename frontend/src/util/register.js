import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'


export async function  register (formRef, navigate ) {
    // Registrierungslogik
    //sergej@2023-11-12 - registerlogik aus dem Video von Saqib
    console.log(formRef.current.firstName.value);

    const form = formRef.current;
    const formData = {
      id: uuidv4(),
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
    }

    const config = {
      url: "http://localhost:8081/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(formData)
    }

    try {
      const resp = await axios(config);
      console.log(resp);
      //navigiere zu login
      navigate('/login');
    } catch (error) {
      // Fehlerbehandlung
      console.error('Registrierungsfehler:', error);
    }
  }