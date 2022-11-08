import styles from '../../../../styles/Home.module.scss'; 
import Avatar from 'react-avatar';
import { Container, Card, Alert, Row, Col, Form, Button} from 'react-bootstrap';   
import Modal from 'react-bootstrap/Modal';

import { useRouter } from 'next/router'
import { useEffect, useState} from 'react';
import Router from 'next/router'
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import axios from 'axios';

export default function ChangePassword(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  props.onAuthenticationUser();  
  const router = useRouter();
  
  const [password_1, setPassword_1] = useState('');    
  const [password_2, setPassword_2] = useState('');    
     
  const handlePassword1 = ({target}) => {
    setPassword_1(target.value)        
  }
 
  const handlePassword2 = ({target}) => {
    setPassword_2(target.value)        
  }

  const NewPassword = () => {         
    const { uid } = router.query
    const { token } = router.query

    const data = {
      uid: uid,
      token: token,
      new_password1: password_1,
      new_password2: password_2
    };

    let urlResetPassword = `${process.env.API_URL}rest-auth/password/reset/confirm/`;  

    axios.post(urlResetPassword,`uid=${uid}&token=${token}&new_password1=${password_1}&new_password2=${password_2}`)
      .then(res => {
        handleShow()          
        setTimeout( () => Router.push('/accounts/login'), 1500);        
      })
      .catch(err => console.log(err))        
    }
  
  return (    
    <Container className='mt-4'>
      <Row className='d-flex justify-content-center'>
        <Modal show={show} onHide={handleClose} centered>        
          <Modal.Body>
            <h5 className='m-2 text-center'>¡Felicidades!</h5>
            <h5 className='m-2 text-center'>Ya puedes ingresar a Natiboo</h5>          
          </Modal.Body>        
        </Modal>        
        <Col md="6">
          <Card className={styles["shadow-sm"] +' '+ styles["roundedbtn"]} style={{padding:'10px 15px'}}>
          <Card.Body>               
            <h1 style={{fontSize: '2.5rem;'}}>Cambia tu contraseña</h1>
            <p>Ingresa tu nueva contraseña, recuerda que debe tener mínimo 8 caracteres</p>            
            <Form>                  
              <Form.Group className="mb-3" controlId="password1">                
                <Form.Control 
                  name='new_password1'
                  type="password" 
                  placeholder="Contraseña nueva" 
                  value={password_1}
                  onChange={handlePassword1}
                />                
              </Form.Group>  
              <Form.Group className="mb-3" controlId="password2">                
                <Form.Control 
                  name='new_password2'
                  type="password" 
                  placeholder="Repetir contraseña" 
                  value={password_2}
                  onChange={handlePassword2}
                />                
              </Form.Group>               
              <Button variant="danger" className={"text-white "+styles["roundedbtn"]} style={{width:'100%'}} onClick={NewPassword}>Cambiar</Button>              
            </Form>
          </Card.Body>          
          </Card>
          <Alert variant='danger'>
            This is a alert—check it out!
          </Alert>
        </Col>
      </Row>      
    </Container>    
  )

}