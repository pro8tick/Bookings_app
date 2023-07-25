import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './login.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [credentials,setCredentials] = useState({
    username:undefined,
    password:undefined
  })

  const {loading,error,dispatch}= useContext(AuthContext)

  const handleChange =(e)=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  }
  const navigate= useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
      const res=await axios.post('/auth/login',credentials)
      dispatch({type:"LOGIN_SUCCESS", payload:res.data.details})
      navigate("/")
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
    }
  }


  return (
    <div className='login'>
        <div className='lContainer'>
            <input type= 'text' placeholder='username' id='username' className='lInput' onChange={handleChange}/>
            <input type= 'password' placeholder='password' id='password' className='lInput' onChange={handleChange}/>
            <button disabled={loading} className='lButton' onClick={handleSubmit}>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login