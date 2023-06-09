import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { serCurrentUser } from '../../actions/currentUser'
import toast from 'react-hot-toast'
import bars from "../../assets/bars-solid.svg";


const Navbar = ({setIsOpen}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    var User = useSelector((state) => (state.currentUserReducer))

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'})
        toast.success('Logged out successfully')
        navigate('/')
        dispatch(serCurrentUser(null))
    }

    useEffect(() => {
        const token = User?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(serCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    }, [dispatch])

    return(

        <nav className="main-nav">
        <div className="navbar">
          <button className="slide-in-icon">
            <img src={bars} alt="bars" width="15" />
          </button>
          <div className="navbar-1">
            <Link to="/" className="nav-item nav-logo">
              <img src={logo} alt="logo" />
            </Link>
            <Link className="nav-item nav-btn res-nav" 
              onClick={() => setIsOpen(prev => !prev)}
            >
                Chatbot
              </Link>
              <Link to="/" className="nav-item nav-btn res-nav">
                Community
              </Link>
          </div>
          <div className="navbar-2">
            <form>
              <input type="text" placeholder="   Search..." />
              <img src={search} alt="search" width="18" className="search-icon" />
            </form>
            {
              User === null ? (
                <Link to={'/Auth'} className='nav-item nav-links'>
                  Log In
                </Link>
              ) : (
                <>
                  <Avatar
                    backgroundColor="#009dff"
                    px="10px"
                    py="7px"
                    borderRadius="50%"
                    color="white"
                  >
                    <Link
                      to={`/Users/${User?.result?._id}`}
                      style={{
                        color: "white", textDecoration: "none"
                      }}
                    >
                      {User.result.name.charAt(0).toUpperCase()}
                    </Link>
                  </Avatar>
                  <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                </>
              )
            }
          </div>
        </div>
      </nav>
        /*<nav className='main-nav'>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo' />
                </Link>
                <Link to='/otp' className='nav-item nav-btn'>Chatbot</Link>
                <Link to='/' className='nav-item nav-btn'>Payments</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <form>
                    <input type='text' placeholder='Search...'/>
                    <img src={search} alt='search' width="18" className='search-icon'/>
                </form>
                { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
                    <>
                        <Avatar backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%" color="white"><Link to={`/Users/${User?.result?._id}`} style={{color:"white",textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
                }
            </div>
        </nav>*/
        )
}
export default Navbar