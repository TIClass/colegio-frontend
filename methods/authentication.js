import { useEffect, useState} from 'react';

import { setCookies, getCookie, removeCookies } from 'cookies-next';
import axios from 'axios';

function userAuthentication() {
  const [userAuthentications, setUserAuthentications] = useState([]);

  const cookie_usertoken = getCookie('cookie-usertoken');
  const token = cookie_usertoken;
  const useToken = `Bearer ${token}`
  
  const urlUserAuthentication = `${process.env.apiUrl}api/v1/user/`;
  const axiosUserAuthentication = (url) => {
          axios.get(url, { headers: { Authorization: useToken } })
                .then(res => setUserAuthentications(res.data))
                .catch(err => err)
  }
  useEffect(() => {
    axiosUserAuthentication(urlUserAuthentication);
  }, [])

  const user_authentications = userAuthentications;

  console.log(user_authentications)
  console.log("*****************")
}








export const getServerSideProps = async ({ params, req,res }) => {
    // const id = params.id;
    // const slug = params.slug;
    console.log("lllkkkkkk")

    const cookie_usertoken = getCookie('cookie-usertoken', { req, res});
    const token = cookie_usertoken;
    const useToken = `Bearer ${token}`;

    const urlUserAuthentication = `${process.env.apiUrl}api/v1/user/`;

    const resUserAuthentication = await axios.get(urlUserAuthentication, { headers: { Authorization: useToken } })
                        .then(res => res.data)
                        .catch(err => err)

    console.log(resUserAuthentication)    

    let resUserAuthentication = null
    try {
        const errorCode = resUserAuthentication.response.status;
        return { props: { master:null, errorCode: errorCode} };
    } catch (error) {
        return { props: { master: resUserAuthentication, errorCode:null} };
    }
}