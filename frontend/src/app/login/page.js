"use client";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import "./login.css"

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    
    formData.append("username",formData.username)
    formData.append("password",formData.password)
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("http://localhost:5000/login",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
      
    })
    const {success,token} = await res.json();
    if (success){
      setCookie('token', token);
      router.push(`/`)
      window.location.reload(true);
      //router.refresh()
    }
    
  };

  return (
    <div className='login-page'>
      <div className='form'>
        <form className="formClass"onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder='Username'/>
          <input type="password" name="password" placeholder='Password'/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}