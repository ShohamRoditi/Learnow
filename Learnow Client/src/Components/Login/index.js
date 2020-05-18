import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'hookrouter'

import { login, logout, notificationVisible } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'
import { LoginPage, BackgroundLoginPage, WrapperForm, Form, HeaderForm, Logo, WrapperButtons, LoginButton } from './LoginStyle'

export const Login = () => {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    
    const [submitted, setSubmitted] = useState(false)
    const [errorLogin, setErrorLogin] = useState(null)
    const { email, password } = inputs
    const _dispatch = useDispatch()

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)

    const userSignIn = () =>{
        socketToWebServer.on('logged data', ({email, name, userType, token, success, message}) => {
            if (success){
                _dispatch(login({email: email, name: name, userType: userType, token: token}))
            }
            else {
                _dispatch(notificationVisible(true))
                setErrorLogin(<ToastNotification renderComponent={message}/>)
                setSubmitted(false)
            }
        })
    }

    useEffect(() => { 
        _dispatch(logout())
        if (loggedUser.email) {
            socketToWebServer.emit('logout', loggedUser.email)
        }
        userSignIn()
        return () => socketToWebServer.off('logged data')
    }, [])

    useEffect(() => {
        if (Object.keys(loggedUser).length > 0)
            navigate('/Home')
    },[loggedUser])

    useEffect(() => {
        if (!isNotificationVisible)
            setErrorLogin(null)
    },[isNotificationVisible])

    const handleChange = e => {
        const { name, value } = e.target
        setInputs(inputs => ({ ...inputs, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        setSubmitted(true)
        if (email && password) {
            socketToWebServer.emit('login data', ({email: email, password: password}))
        }
    }

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    return (
        <LoginPage >
            <BackgroundLoginPage>
                {/* <img  style={{margin: '0 auto'}}src = {require('../../images/brain-waves.jpg')}></img> */}
                {/* background:'linear-gradient(to right bottom, #0067CB, #020316)' */}
                <WrapperForm className="col-lg-8 offset-lg-2" > 
                    <Form name="form" onSubmit={handleSubmit} >
                        <HeaderForm>
                            <Logo src={require('../../images/learnowIcon.png')}></Logo>
                            <h2>Login</h2>
                        </HeaderForm>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                            {submitted && !email && <div className="invalid-feedback">Email is required</div>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                            {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                        </div>
                        <WrapperButtons className="form-group">
                            <LoginButton className="btn btn-primary">
                                {submitted && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Login
                            </LoginButton>
                            <button className="btn btn-primary" onClick={() => navigate('/Register')}>Register</button>
                        </WrapperButtons>
                    </Form>
                    {errorLogin}
                </WrapperForm>
            </BackgroundLoginPage>
        </LoginPage>
    )
}