// A6 Part 2
import 'bootstrap/dist/css/bootstrap.min.css'
import jwt_decode from 'jwt-decode';


export async function registerUser(user, password, password2) {
    console.log(user);
    console.log(password);
    console.log(password2);
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/register`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password: password, password2: password2}),
        headers: {
          'content-type': 'application/json',
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return true;
      } else {
        throw new Error(data.message);
      }
    }


export async function authenticateUser(user, password) {
    console.log("authUser");
    console.log(user);
    console.log(password);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
  }

  function setToken(token) {
    localStorage.setItem('access_token', token);
  }

  export function getToken() {
    try {
      return localStorage.getItem('access_token');
    } catch (err) {
      return null;
    }
  }

  export function removeToken() {
    localStorage.removeItem('access_token');
  }


export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
  }