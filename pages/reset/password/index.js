import styles from '../../../styles/Home.module.scss'; 
import Avatar from 'react-avatar';
import { Container, Card, Alert, Row, Col, Form, Button} from 'react-bootstrap';  
import Modal from 'react-bootstrap/Modal';

import { useEffect, useState} from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import Router from 'next/router'
import axios from 'axios';

export default function ResetPassword(props) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  props.onAuthenticationUser();  
  
  const [email, setEmail] = useState('');    
     
  const handleEmail = ({target}) => {
    setEmail(target.value)        
  }
 
  const newPassword = () => {    
    let urlResetPassword = `${process.env.API_URL}rest-auth/password/reset/`;    
    
    axios.post(urlResetPassword, `email=${email.toLowerCase()}`)
      .then(res => {
        handleShow()         
        setTimeout( () => Router.push('/accounts/login'), 1500);   
      })
      .catch(err => setError(err))        
  }
  
  return (    
    <Container className='mt-4'>
      <Row className='d-flex justify-content-center'>
        <Modal show={show} onHide={handleClose} centered>        
          <Modal.Body>
            <h5 className='m-2 text-center'>¡Genial!</h5>
            <h5 className='m-2 text-center'>Ya hemos enviado un email</h5>          
          </Modal.Body>        
        </Modal>
        <Col md="6">
          <Card className={styles["shadow-sm"] +' '+ styles["roundedbtn"]} style={{padding:'10px 15px'}}>
          <Card.Body>   
            <h1 style={{fontSize: '2.5rem;'}}>¿Olvidáste tu contraseña?</h1>
            <p>Para reestablecer tu contraseña por favor ingresa tu email</p>
            <Form>
              <Form.Group className="mb-3 d-flex align-items-center" controlId="formEmail">                
                <Form.Control 
                type="" 
                placeholder="Email"
                value={email}
                onChange={handleEmail} />                    
              </Form.Group> 
              {error ? 
                <Alert variant='danger' className='mt-2'>
                  ¡Algo salió mal!
                </Alert> : <div></div>
              }                            
              <Button variant="danger" className={"text-white "+styles["roundedbtn"]} style={{width:'100%'}} onClick={newPassword}>Enviar</Button>              
            </Form>
          </Card.Body>          
          </Card>
        </Col>
      </Row>      
    </Container>    
  )

}