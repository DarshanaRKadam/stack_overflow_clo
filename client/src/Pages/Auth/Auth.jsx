import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import icon from '../../assets/icon.png'
import toast from "react-hot-toast";
import AboutAuth from  './AboutAuth'
import { signup, login } from '../../actions/auth'



const Auth = () => {
  const [isSignup,setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleswitch =() =>{
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email && !password){
      return toast.error("Please enter email and password");
    }
    if (isSignup) {
      if (!name) {
        return toast.error("Please enter name")
      }
      dispatch(signup({ name, email, password }, navigate))
      toast.success('Redirecting...')
      toast.success('User registered successfully')
      toast.success('Logged in successfully')
    } else {
      dispatch(login({ email, password }, navigate))
      toast.success('Redirecting...')
      toast.success('Logged in successfully')
    }
  }
  return (
    <section class='auth-section'>
      { isSignup && <AboutAuth/>}
        <div class='auth-container-2'>
          {! isSignup && <img src={icon} alt='stack overflow' className='login-logo'/>}
          <form onSubmit={handleSubmit}>
            {
              isSignup && (
                <label htmlFor='name'>
                  <h4>
                    Display Name
                  </h4>
                  <input type='text' id='name' name='name' onChange={(e) => {setName(e.target.value)}}/>
                </label>
              )
            }
            <label htmlFor='email'>
              <h4>Email</h4>
              <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
            </label>
            <label htmlFor='password'>
              <div style={{display:"flex", justifyContent:'space-between'}}>
                <h4>Password</h4>
                { !isSignup && <h4 style={{color: "#007ac6",fontSize:'13px'}}>forgot password</h4>}
              </div>
              <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
              { isSignup && <p style={{color: "#666767",fontSize:"13px"}}>Passwords must contain at least eight characters, including at least 1 letter and 1 number</p>}
            </label>
            {
              isSignup && 
                <label htmlFor='check'>
                  <input type='checkbox' id='check'/>
                  <p style={{fontSize:"13px"}}>Opt-in to receive occasional,<br/>product updates, user research invitations,<br/>company announcements and digests.</p>
                </label>
            }
            <button type='submit' className='auth-btn'>{ isSignup ? 'Sign up' :'Log in'}</button>
            {
              isSignup &&
                <p style={{color: "#666767",fontSize:"13px"}}>
                  By clicking "sign up", you agree to our
                  <span style={{color: "#007ac6"}}>terms of <br/>service</span>,
                  <span style={{color: "#007ac6"}}>privacy policy</span> and 
                  <span style={{color: "#007ac6"}}>cookie policy</span>
                </p>
            }
          </form>
          <p>
            {isSignup ? 'already have an account?' : "Don't have an account?"}
            <button type='button' className='handle-switch-btn' onClick={handleswitch}>{isSignup ? "Log in" : "Sign up"}</button>
          </p>
        </div>
    </section>
  )
}

export default Auth
