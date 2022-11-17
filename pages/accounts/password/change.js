
import styles from '../../../styles/Home.module.scss';
import Avatar from 'react-avatar';
import { Container, Card, Alert, Row, Col, Form, Button} from 'react-bootstrap';   
import Modal from 'react-bootstrap/Modal';

import { useRouter } from 'next/router'
import { useEffect, useState} from 'react';
import Router from 'next/router'
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import axios from 'axios';

export default function ChangePassword(props) {  
  props.onAuthenticationUser();   
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);   

  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`  
  const [actualPassword, setActualPassword] = useState('');  
  const [newPassword1, setNewPassword1] = useState('');    
  const [newPassword2, setNewPassword2] = useState('');    
  const [error, setError] = useState('');    

  const handleActualPassword = ({target}) => {
    setActualPassword(target.value)        
  }
     
  const handlePassword1 = ({target}) => {
    setNewPassword1(target.value)        
  }
 
  const handlePassword2 = ({target}) => {
    setNewPassword2(target.value)        
  }

  const ChangePassword = () => {         
    const data = {            
      new_password1: newPassword1,
      new_password2: newPassword2,
      old_password: actualPassword
    };

    let urlChangePassword = `${process.env.API_URL}rest-auth/password/change/`;  
    
    axios.post(urlChangePassword, data, { headers: { Authorization: useToken } })
      .then(res => {
        handleShow()          
        setTimeout( () => Router.push('/mis-cursos'), 1500);        
      })
      .catch(err => setError(err))
  }
    
  return (    
    <Container className='mt-4'>
      <Row className='d-flex justify-content-center'>
        <Modal show={show} onHide={handleClose} centered>        
          <Modal.Body>            
            <h5 className='m-2 text-center'>Tu contraseña fue cambiada correctamente</h5>          
          </Modal.Body>        
        </Modal>
        <Col md="6">
          <Card className={styles["shadow-sm"] +' '+ styles["roundedbtn"]} style={{padding:'10px 15px'}}>
          <Card.Body>   
            <h1 style={{fontSize: '2.5rem;'}}>Cambiar contraseña</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formActualPassword">                
                <Form.Control 
                type="password" 
                placeholder="Contraseña actual"
                value={actualPassword}
                onChange={handleActualPassword}
                 />                
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNewPassword">                
                <Form.Control 
                type="password" 
                placeholder="Contraseña nueva" 
                value={newPassword1}
                onChange={handlePassword1}
                />
              </Form.Group>              
              <Form.Group className="mb-3" controlId="formPassword2">                
                <Form.Control 
                type="password" 
                placeholder="Nueva contraseña (de nuevo)" 
                value={newPassword2}
                onChange={handlePassword2}
                />
              </Form.Group>              
              {error ? 
                <Alert variant='danger' className='mt-2'>
                  ¡Algo salió mal!
                </Alert> : <div></div>
              }       
              <Button variant="danger" className={"text-white "+styles["roundedbtn"]} style={{width:'100%'}} onClick={ChangePassword}>Cambiar contraseña</Button>              
            </Form>                 
          </Card.Body>          
          </Card>
        </Col>
      </Row>      
    </Container>    
  )

}