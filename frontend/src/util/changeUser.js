import axios from "axios";

export async function changeUser (formRef, navigate)  {

    const form = formRef.current;
    const formData = {
      oldusername: JSON.parse(localStorage.getItem("user")).username,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      username: form.newUsername.value,
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
  }
