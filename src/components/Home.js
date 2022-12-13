import React, {useState, useEffect} from 'react';
import baseUrl from '../urls/baseUrl';
import { useCookies } from 'react-cookie';

function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [cookies, setCookie] = useCookies(['yoga']);

    useEffect(() => {
        if (cookies.yoga) {
            window.location.href = '/dashboard';
        }
    }, [cookies.yoga]);
    
    const login =async () => {
        emailValidation(email);
        passwordValidation(password);
        if (emailError === true || passwordError === true) {
            return;
        }
        var session = await fetch(baseUrl + 'users/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password}),
        })
        session = await session.json();
        if (session.status === 201) {
            setCookie('yoga', session.data, { path: '/' });
            window.location.href = '/dashboard';
        }
        else
        {
            alert('Invalid Credentials');
        }
    }

    const passwordValidation = (val) => {
        if (val === '') {
            setPasswordError(true);
        }
        else
        {
            setPasswordError(false);
        }
        setPassword(val);
    }

    const regExEmail = (val) => {
        var res = val.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          return res;
        };

    const emailValidation = (val) => {
        if (val === '') {
            setEmailError(true);
        } 
        if (regExEmail(val) === null) {
            setEmailError(true);
        }
        else
        {
            setEmailError(false);
        }
        setEmail(val);
    }
    return (
        <div>
          <h2>Yoga App</h2>
          <div>
            <p>Email: </p>
            <input type="text" name="email" onChange={(e)=> {emailValidation(e.target.value)}}/>
          </div>
          <div>
            <p>Password: </p>
            <input type="password" name="password" onChange={(e)=> {passwordValidation(e.target.value)}}/>
          </div>
          <input type="submit" value="Login" onClick={login}/>
          <input type="submit" value="Register" onClick={()=> {window.location.href = '/register'}}/>
        </div>
    );
}

export default Home;
