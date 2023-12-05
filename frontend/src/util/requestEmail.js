import axios from "axios";


export async function  requestEmail (formRef, navigator, showNotification, setResetNumber)  {
        
    const email = formRef.current.email.value;
    console.log("form: " + email);

    const config = {
        url: "http://localhost:8081/request-reset",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            email: email
        }
    }
    try {
        const response = await axios(config);
        console.log("##### test: " + response);
        console.log("##### emailtoken in frontend: " + response.data.token);

        showNotification(response.data.message, 'normal');
        setResetNumber(response.data.code);
        localStorage.setItem("resetEmail", response.data.token);
        navigator("/login/verify");

    } catch (error) {
        showNotification(e.response.data.message, "red");
        console.error("Fehler bei der Anfrage des Passwort-Resets: " + error);
    }
  }