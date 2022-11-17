import Layout from '../components/Layout'

import 'bootstrap/dist/css/bootstrap.min.css';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useEffect, useState} from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import axios from 'axios';
import Router from 'next/router'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [userAuthentications, setUserAuthentications] = useState('');

  const isInfoComplete = (user) => {
    // const variable = userAuthentications?.results
    const variable = user    
    if (variable) {
      if (variable.info1_complete_colegio == false) {        
        return(Router.push('/register/steps/1'))        
      }
      if (variable.info2_complete_colegio == false) {
        return(Router.push('/register/steps/2'))        
      }
      if (variable.info3_complete_colegio == false) {
        return(Router.push('/register/steps/3'))        
      }
    }
  }

  function handleAuthenticationUser(event) {
    const cookie_usertoken = getCookie('cookie-usertoken');
    const token = cookie_usertoken;
    const useToken = `Bearer ${token}`

    const urlUserAuthentication = `${process.env.API_URL}api/v1/user/`;
    const axiosUserAuthentication = async(url) => {
            axios.get(url, { headers: { Authorization: useToken } })
                  .then(res => {
                    let users = {
                      'id':res.data.results[0].id,
                      'email':res.data.results[0].email,
                      'first_name':res.data.results[0].first_name,
                      'last_name':res.data.results[0].last_name,
                      'username':res.data.results[0].user_nombre,
                      'avatar_url':res.data.results[0].avatar_url,
                      // 'phone':res.data.results[0].phone,
                      // 'rut':res.data.results[0].rut
                    }
                    setCookie("user-info-basic", users);
                    setUserAuthentications(res.data.results[0])      
                    isInfoComplete(res.data.results[0])              
                  })
                  .catch(err => {
                      setUserAuthentications(null)
                      deleteCookie('cookie-usertoken',);
                      deleteCookie('user-info-basic',);
                    }
                  )
    }

    useEffect(() => {
      axiosUserAuthentication(urlUserAuthentication);
    }, [])

  }

  return (<Layout userAuthentications={userAuthentications}><Component {...pageProps} onAuthenticationUser={handleAuthenticationUser} userAuthentications={userAuthentications} isInfoComplete={isInfoComplete} setUserAuthentications={setUserAuthentications}/></Layout>);
}

export default MyApp
