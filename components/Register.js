import variables from '../styles/variables.module.scss';
import styles from '../styles/Home.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import Swal from 'sweetalert2'
import {Row, Col, Card, InputGroup, Form, Button} from 'react-bootstrap';

import { useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import Router from 'next/router'
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import Cookies from 'js-cookie'

function Register(props) {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [invalidEmail, setInvalidEmail] = useState('');
  const [invalidPasswords, setInvalidPasswords] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');

  const handleEmail= ({target}) => {
    setEmail(target.value)    
    if (!isValidEmail(email)){
      setInvalidEmail("Email inválido.")
    }
    else{
      setInvalidEmail("")
    } 
  }

  const handlePassword = ({target}) => {
    setPassword(target.value)
  }

  const handlePasswordConfirm = ({target}) => {
    setPasswordConfirm(target.value)  
    if (!passwords(password,target.value)){
      setInvalidPasswords("Las contraseñas no coinciden.")
    }
    else{
      setInvalidPasswords("")
    }
  }

  const handleSubmit = () => {
    if (isValidEmail(email) && passwords(password,password_confirm)){
      var param_data = "email="+email+"&password1="+password+"&password2="+password_confirm

      axios.post(`${process.env.API_URL}rest-auth/registration/`,param_data)
      .then(response => {      
        // this.signup = response.data;
        // this.isLoading = false;
        // this.isAbejita = true;
        setMsg("¡Felicidades! te haz registrado satisfactoriamente, hemos enviado un correo electrónico para su verificación. Siga el enlace proporcionado para finalizar el proceso de registro. Por favor contáctenos si no lo recibe en unos minutos.")
        // this.msgRegister = "¡Felicidades! te haz registrado satisfactoriamente, hemos enviado un correo electrónico para su verificación. Siga el enlace proporcionado para finalizar el proceso de registro. Por favor contáctenos si no lo recibe en unos minutos."
        
        // try {
        //   axios.get(`${process.env.API_URL}api/v1/user/getuseremail/?email=`+email,{
        //     headers: { 'Authorization': 'Token ' + this.tokenGeneric }
        //   })
        //     .then(response => {
        //       this.user_id = response.data.user_id;
              
        //       this.$gtm.push({
        //          event: "signup_success",
        //          ecommerce: {
        //           'impressions':{
        //               'form_id':"001",
        //               'email_address':email,
        //               'user_id':this.user_id
        //              }
        //         }
        //       });            
        //       //this.getResourceDetail(this.historyPath);
        //     })
        //     .catch(e => {
        //       console.log("error path user signup_success")
        //     })
        //   }
        //   catch (e) {
        //     console.log("error: signup_success")
        //     console.log(e)
        //   }                    
          // setTimeout( () => this.$router.push({ path: '/login'}), 5000);
        })
        .catch(error => {
          console.log("error")        
      }); 
    }        
  }  

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  } 
  
  function passwords(password1,password2){    
    if (password1===password2){      
      return true;
    }
    else{
      return false
    }
  }  

  return (
    <div className="login-container">
    {msg? 
    <Card>
      <Card.Body className='text-center m-2'>
        {msg}
      </Card.Body>
    </Card>  :
    <div>
      <Col lg={props.size} className={"login m-0 "+msg? ' d-block ':' d-none ' }>        
        <Card className={ props.shadow ? styles["shadow-sm"]+' '+styles["roundedbtn"] : styles["roundedbtn"]}
        style={{padding: "30px"}}>
          <Card.Body>
            <h1 className="title-slide">Regístrate</h1>
            <small>Ya tengo mi cuenta
              <Link href="login" style={{color: variables.tertiaryColor}}> Iniciar sesión</Link>
            </small>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ fontSize: 14,}}
                />
              </InputGroup.Text>
              <Form.Control
                placeholder="Correo electrónico"
                aria-label="Email"
                aria-describedby="basic-addon1"
                type="text"
                value={email}
                onChange={handleEmail}
              />                       
            </InputGroup>
            <div className="mb-3" style={{color:'red'}}>
              <small>{invalidEmail}</small>
            </div>     
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon
                  icon={faUnlock}
                  style={{ fontSize: 14, color: '#495057'}}
                />
              </InputGroup.Text>
              <Form.Control
                placeholder="Contraseña"
                aria-label="Password"
                aria-describedby="basic-addon1"
                type="password"
                value={password}
                onChange={handlePassword}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon
                  icon={faUnlock}
                  style={{ fontSize: 14, color: '#495057'}}
                />
              </InputGroup.Text>
              <Form.Control
                placeholder="Contraseña (de nuevo)"
                aria-label="Password"
                aria-describedby="basic-addon1"
                type="password"
                value={password_confirm}
                onChange={handlePasswordConfirm}
              />
            </InputGroup>            
            <div className="mb-3" style={{color:'red'}}>
              <small>{invalidPasswords}</small>
            </div>     
            <div className="d-grid gap-2 mt-2">
              <Button variant="outline-danger" className="m-1 rounded" type='submit'
              onClick={handleSubmit}>Registrarme</Button>
            </div>
            <small className='text-center'>Powered by <a></a> ©2023</small>
          </Card.Body>
        </Card>
      </Col>  
    </div>
    }    
          
      <style global jsx>{`
        .login-container .rounded {
          border-radius: 30px !important;
        }
        .login-container .title-slide {
          font-size: 24px;
        }
        .login-container .title-slide {
          font-size: 24px;
        }
        .login-container .login {
          margin-top: 100px;
        }
        .login-container .form-control {
          border-top-right-radius: 20px !important;
          border-bottom-right-radius: 20px !important;
        }
        .login-container .input-group-text {
          border-top-left-radius: 20px !important;
          border-bottom-left-radius: 20px !important;
        }
      `}</style>
    </div>
  );
}

export default Register;
