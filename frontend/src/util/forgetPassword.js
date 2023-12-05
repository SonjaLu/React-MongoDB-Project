import axios from 'axios'

export async function  forgetPassword (email, setMessage ) {
    try {
        const response = await axios.post('http://localhost:8081/forgotpassword', { email });
        setMessage("If an account with that email exists, instructions for resetting your password have been sent.");
      } catch (error) {
        console.error('Error sending password reset email:', error);
  
        setMessage('If an account with that email exists, instructions for resetting your password have been sent.');
      }
  }