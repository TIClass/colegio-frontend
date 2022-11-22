import Navbar from "./Navbar";
import Footer from "./Footer";

import { useEffect, useState} from 'react';
import { setCookie, getCookie } from 'cookies-next';
import axios from 'axios';

const Layout = (props) => {
  return (
    <div>
      <Navbar userAuthentications={props.userAuthentications} imgLogoObj={props.imgLogoObj}/>
        { props.children }
      <Footer />
    </div>
  );
}

export default Layout;
