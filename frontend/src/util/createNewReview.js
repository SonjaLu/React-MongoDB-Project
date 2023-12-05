import axios from "axios";


export async function  createNewReview (formData, navigate)  {
    try {
        const config = {
          url: "http://localhost:8081/addReview",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formData
        };
        await axios(config);
        navigate('/reviews');
      } catch (error) {
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          console.error("Request made but no response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
      }
  }