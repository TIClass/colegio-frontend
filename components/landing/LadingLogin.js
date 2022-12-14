import styles from '../../styles/Home.module.scss';
import variables from '../../styles/variables.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import Avatar from 'react-avatar';

import { useRouter } from 'next/router'
import Router from 'next/router'
import Link from 'next/link'

import {Row, Col, Card, InputGroup, Form, Button, Alert} from 'react-bootstrap';

import { useEffect, useState} from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import Cookies from 'js-cookie'
import axios from 'axios';

function LadingLogin(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { from } = router.query

  const userAuthentications = props.userAuthentications;

  const handleUsername= ({target}) => {
    setUsername(target.value)
  }

  const handlePassword = ({target}) => {
    setPassword(target.value)
  }

  const handleChangePass = (e) => { 
    if(e.target.checked) {
      document.getElementById('form-password').type = 'text';
    } else {
      document.getElementById('form-password').type = 'password';
    }    
  };

  const logueo = (from) => {
    let CLIENT_ID = `${process.env.CLIENT_ID}`;
    let CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;

    let urlLogueo = `${process.env.API_URL}o/token/`;
        
    var param_data = "username="+username.toLowerCase().trim()+"&password="+password+"&grant_type=password"

    axios.post(urlLogueo, param_data, {
      headers: {
        Authorization:
          "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
          "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        setData(res.data)
        // if (process.env.PRODUCTION) {
        //     Cookies.set('cookie-usertoken', res.data.access_token, { domain: `${process.env.COOKIE_SITE_URL}` })
        // } else {
        //     setCookie("cookie-usertoken", res.data.access_token);
        // }
        //Cookies.set('cookie-usertoken', res.data.access_token, { domain: `${process.env.COOKIE_SITE_URL}` })
        setCookie("cookie-usertoken", res.data.access_token);
        if (from) {
          // Router.push(from)
          Router.push('/mis-cursos')
        } else {
          Router.push('/mis-cursos')
        }
      })
      .catch(err => 
        {
          setError(err)     
          setAlert("Tu usuario y/o contrase??a no son v??lidos, int??ntelo de nuevo.")     
        }
        );
  }

  return (
    <div className="login-container">      
      <Col lg={props.size} className="login m-0">
        <Card className={ props.shadow ? styles["shadow-lg"]+' '+styles["roundedbtn"] : styles["roundedbtn"]}
        style={{padding: "30px"}}>
          {userAuthentications ?
            <Card.Body className="text-center">
              <Avatar name={userAuthentications.first_name} size="150"
                round={true}
                src={userAuthentications.avatar_url}/>
              <br></br>
              <br></br>
              <Link href="/mis-cursos">
                <Button style={{background: variables.purpleColor}} className="m-1 rounded text-white">??ir a mis cursos!</Button>
              </Link>
            </Card.Body>
          :
          <Card.Body>
            { props.shadow ?
              <h1 className="title-slide" style={{color: variables.primaryColor}}>Ingresa</h1> :
              <div className='mb-2'>
                <h1 className="title-slide" style={{color: variables.secondaryColor}}>Iniciar sesi??n</h1>
                <small>??Aun no te haz registrado en TIClass?
                  <Link href={"signup"} style={{color: variables.tertiaryColor}}> Reg??strate</Link>
                </small>
              </div>
            }
            <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ fontSize: 14,}}
                />
              </InputGroup.Text>
              <Form.Control
                name='username'
                placeholder="Email o Usuario"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="text"
                value={username}
                onChange={handleUsername}
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
                id="form-password"
                name='password'
                placeholder="Contrase??a"
                aria-label="Password"
                aria-describedby="basic-addon1"
                type="password"
                value={password}
                onChange={handlePassword}
              />            
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Check 
                type='checkbox'
                label={`Mostrar contrase??a`}
                id={`disabled-default-checkbox`}
                onChange={handleChangePass}
              />
            </InputGroup>
            {alert ?
            <Alert variant='danger'>
              {alert}
            </Alert>:<div></div>
            }            
            </Form>
            { props.shadow ?
              <div className="text-left" style={{color: variables.primaryColor}}>
                <small><Link href="reset/password" className="forget-password">??Olvid?? su contrase??a?</Link></small>
              </div> :
              <div className="text-left">
                <a href="reset/password" className="forget-password" style={{color: variables.tertiaryColor}}>??Olvid?? su contrase??a?</a>
                <br></br>
                <label className='mt-2'>
                  <input type="checkbox"></input>
                  Rec??erdame
                </label>
                <div className="d-grid gap-2 mt-2">
                  <Button variant="outline-danger" className="m-1 rounded" type='submit'
                  onClick={e => logueo(from)}
                  >Ingresar</Button>
                </div>
                <small className='text-center'>Powered by TIClass ??2023</small>
              </div>
            }

            { props.shadow ?
            <div>
              <div className="alert alert-danger d-none" role="alert">
                Tu usuario y/o contrase??a no son validas, int??ntelo nuevamente
              </div>
              <div className="text-left botones">
                <Button variant="secondary" className="m-1 rounded " style={{background: variables.secondaryColor}}
                type='submit' onClick={logueo}
                >Ingresar</Button>
                <Link href='accounts/signup'>
                  <Button variant="danger" className="m-1 rounded">Reg??strate</Button>
                </Link>
              </div>
              <div className="d-grid gap-2">
                <Button variant="outline-warning" className="m-1 rounded">??Quiero cotizar!</Button>
              </div>
            </div> :
            <div></div>
            }
          </Card.Body>
          }
        </Card>
      </Col>
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

export default LadingLogin;
