import axios from "axios";


export async function  resetPassword (formRef, navigator, emailToken, setEmailToken)  {
    const newPassword = formRef.current.password.value;
    const config = {
        url: "http://localhost:8081/reset-password",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${emailToken}`
        },
        data: {
            password: newPassword
        }
    }


    try {
        const response = axios(config);
        console.log("## onPasswordHandle response: " + response);
        showNotification(response.data.message, "normal");
        setEmailToken("");
        localStorage.removeItem("resetEmail");
        navigator("/login");
    } catch (e) {
        showNotification(e.response.data.message, "red");
        console.log("Error bei reset passsss " + e);
    }
  }