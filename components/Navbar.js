import styles from '../styles/Home.module.scss';
import variables from '../styles/variables.module.scss';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Button, Dropdown } from 'react-bootstrap';
import Image from 'next/image'
import Router from 'next/router'
import Link from 'next/link'

import { useEffect, useState} from 'react';
import Avatar from 'react-avatar';
import { setCookies, getCookie, deleteCookie } from 'cookies-next';
import axios from 'axios';

const TNavbar = (props) => {
  const imgLogoObj = props.imgLogoObj;
  const userAuthentications = props.userAuthentications;


  const logout = (e) => {
    let resp = null;
    let _token = getCookie('cookie-usertoken');
    let CLIENT_ID = `${process.env.CLIENT_ID}`;
    let CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
    let apiURL = `${process.env.API_URL}o/revoke_token/`;

      if (_token) {
       var param_data = "token="+_token+"&client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET
       axios.post(apiURL, param_data)
       .then(response => {
         resp = response.data;
         deleteCookie('cookie-usertoken',);
         deleteCookie('user-info-basic',);
         //Router.push('/');
         window.location.replace("/");
       })
       .catch(error => {
         resp = error.response
       })
    } else {
      window.location.replace("/");
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white" className={styles["shadow-sm"]}>
      <Container>
        <Link href="/">
          <Navbar.Brand >
            <Image src={imgLogoObj} alt="Colegio Natiboo" width={150} height={55} className={styles["logo-login"]+ ' logo-login'} />
          </Navbar.Brand>
        </Link>
        {userAuthentications?
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          : <div></div>
        }
        {userAuthentications?
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='ms-auto d-flex align-items-center'>
            <Dropdown className='me-2'>
                <Dropdown.Toggle variant="outline-success" bg="" id="dropdown-basic" className={styles["roundedbtn"]}>
                {userAuthentications?.first_name} {userAuthentications?.last_name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item href="/mis-cursos">Mis cursos</Dropdown.Item>
                  <Dropdown.Item href="/accounts/perfil/editar">Mi perfil</Dropdown.Item>
                  <hr></hr>
                  <Dropdown.Item href="/accounts/password/change">Cambiar contraseña</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Avatar name={userAuthentications.first_name} size="30"
              round={true}
              src={userAuthentications.avatar_url}/>
            </Nav>

        </Navbar.Collapse>
        :
        <Link href='/accounts/login'>
          <Button variant="secondary" className={"m-1 "+styles["roundedbtn"]} style={{background: variables.secondaryColor}}>Iniciar sesión</Button>
        </Link>
        }
      </Container>

      <style global jsx>{`
        .btn-outline-success {
          color: #00cac9;
          border-color: #00cac9;
        }
        .btn-outline-success:hover {
          color: #fff;
          background-color: #00cac9;
          border-color: #00cac9;
      }
        .logo {
          width: 150px;
        }
      `}</style>
    </Navbar>
  );
}

export default TNavbar;
