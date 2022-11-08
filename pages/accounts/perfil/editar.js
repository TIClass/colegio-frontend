
import styles from '../../../styles/Home.module.scss';
import Avatar from 'react-avatar';
import { Container, Card, Alert, Row, Col, Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

import { useEffect, useState} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';
import Router from 'next/router'

export default function Profile(props) {
  props.onAuthenticationUser();
  props.isInfoComplete();  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [profielJson, setProfielJson] = useState('');

  const [avatar, setAvatar] = useState('');
  const [notification, setNotification] = useState('');

  const [sexReq, setSexReq] = useState(false);

  const [comunnes, setComunnes] = useState('');
  const [zones, setZones]= useState('');
  const [orientation, setOrientation] = useState('');
  const [comunneSelect, setComunneSelect] = useState('');
  const [nationalitySelect, setNationalitySelect] = useState('');
  const [orientationSelect, setOrientationSelect] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const handleAvatar = ({target}) => {
    setAvatar(target.value)
  }

  useEffect(() => {
    const url = `${process.env.API_URL}api/v1/user/`
    const urlOrientation = `${process.env.API_URL}api/v1/tiinfos/orientations/`
    const urlZones = `${process.env.API_URL}api/v1/user/getnationalitycomunne/`
    getUser(url)
    getZones(urlZones)
    getOrientation(urlOrientation)
  }, [])

  const getZones = (url) => {
    axios.get(url,  { headers: { Authorization: useToken } })
    .then(res => {
      setZones(res.data)
    })
    .catch(err => err)
  }

  const getOrientation = (url) => {
    axios.get(url,  { headers: { Authorization: useToken } })
    .then(res => {
      setOrientation(res.data)
    })
    .catch(err => err)
  }

  const getUser = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
      .then(res => {
        setProfielJson(res.data.results[0])
      })
      .catch(err => err)
  }


  const setStartDateClone = (e) => {
    setProfielJson({...profielJson, ['birthdate']: e})
    setStartDate(e)
  }

  const changeDataUser = () => {
    axios.put(profielJson.url, profielJson, {headers: { Authorization: useToken }})
    .then(res => {
      getUser()
      handleShow()
      setTimeout( () => Router.push('/mis-cursos'), 1500);
    })
    .catch(err => err)
  }

  getUser()  

  return (
    <Container className='mt-4'>
      <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <h5 className='m-2 text-center'>¡Tus datos fueron guardados correctamente!</h5>
          </Modal.Body>
        </Modal>
        <Card>
          <Card.Body>
            <Alert className='alert-info'>
              <strong>Hola 👋
                {/* {props?.userAuthentications?.results[0]?.first_name} {props?.userAuthentications?.results[0]?.last_name}  */}
              ! Necesitamos que llenes toda la información que se encuentre en (*)</strong>
            </Alert>
            <h4 className='text-center'>Añade información de tu perfil</h4>
            <Row className='mt-4'>
              <Col lg="4" md="12" sm="12" className='d-flex justify-content-center mb-2'>
              <Avatar name="avatar" size="250"
                round={true}
                />
                <div>
                  <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>
                  <FontAwesomeIcon
                    icon={faCameraAlt}
                    className='me-1'
                    style={{ fontSize: 50,cursor:'pointer',color:'#828282', position:'absolute', top:'350px', left:'14.375rem'}}
                    />
                    </Form.Label>
                    <Form.Control
                    type="file"
                    value={avatar}
                    onChange={handleAvatar}
                    style={{display:'none'}}/>
                  </Form.Group>
                </div>
              </Col>
              <Col lg="8" md="12" sm="12">
                <Form>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formName">
                    <Form.Label className='me-4'>
                      <strong>Nombre(*)</strong>
                    </Form.Label>
                    <Form.Control
                    type="text"
                    name='first_name'
                    placeholder="Ingresa tu nombre"
                    defaultValue={profielJson.first_name}
                    onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formLastName">
                    <Form.Label className='me-4'>
                      <strong>Apellido(*)</strong>
                    </Form.Label>
                    <Form.Control
                    type="text"
                    name='last_name'
                    placeholder="Ingresa tu apellido"
                    defaultValue={profielJson.last_name}
                    onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formRut">
                    <Form.Label className='me-4'>
                      <strong>Rut(*)</strong>
                    </Form.Label>
                    <Form.Control
                    type="text"
                    name='rut'
                    placeholder="Ingresa tu rut"
                    defaultValue={profielJson.rut}
                    onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formComunity">
                    <Form.Label className='me-4'>
                      <strong>Nacionalidad</strong>
                    </Form.Label>
                    <Form.Select id='nationality'
                      name='nationality'
                      onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                      value={profielJson.nationality}>
                    <option value={-1}>Nacionalidades</option>
                      {zones?.nationality?.map((item,index) => {
                        return (
                          <option key={index} value={item?.id}>{item?.name}</option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formComunity">
                    <Form.Label className='me-4'>
                      <strong>País</strong>
                    </Form.Label>
                    <Form.Select id='country'
                      name='country'
                      onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                      value={profielJson.country}>
                    <option value={-1}>Países</option>
                      {zones?.countries?.map((item,index) => {
                        return (
                          <option key={index} value={item?.id}>{item?.name}</option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formComunity">
                    <Form.Label className='me-4'>
                      <strong>Comuna</strong>
                    </Form.Label>
                    <Form.Select id='commune'
                      name='commune'
                      onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                      value={profielJson.commune}>
                    <option value={-1}>Comuna</option>
                      {zones?.comunne?.map((item,index) => {
                        return (
                          <option key={index} value={item?.id}>{item?.name}</option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formComunity">
                    <Form.Label className='me-4'>
                      <strong>¿Cúal es tu género?(*)</strong>
                    </Form.Label>
                    <Form.Select id='sex'
                      name='sex'
                      onChange={e => {
                        setProfielJson({...profielJson, [e.target.name]: e.target.value})
                        if(e.target.value === '-1') {
                            setSexReq(true)
                        } else {
                          setSexReq(false)
                        }
                      }}
                      value={profielJson.sex}>
                      <option value={-1}>Generos</option>
                      <option key={1} value={'woman'}>{'Femenino'}</option>
                      <option key={2} value={'man'}>{'Masculino'}</option>
                      <option key={3} value={'notsay'}>{'No decir'}</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
                { sexReq ?
                  <Alert  variant='danger'>
                    (*) Este campo es obligatorio
                  </Alert> : <div></div>
                }
              </Col>
              <Col md="12">
                <Form>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formEmail">
                    <Form.Label className='me-4'>
                      <strong>Email(*)</strong>
                    </Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Ingresa tu email"
                    name='email'
                    defaultValue={profielJson.email}
                    onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formPhone">
                    <Form.Label className='me-4'>
                      <strong>Teléfono(*)</strong>
                    </Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Ingresa tu teléfono"
                    name='phone'
                    defaultValue={profielJson.phone}
                    onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="formBirthday">
                    <Form.Label className='me-4'>
                      <strong>Fecha de Nacimiento(*)</strong>
                    </Form.Label>
                    <Col md="4" className='d-flex'>
                    <DatePicker
                      locale="es"
                      selected={startDate}
                      name='birthdate'
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                      onChange={e => setStartDateClone(e)}
                    />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="userNotiWhatsApp">
                    <Form.Label className='me-4'>
                      <strong>Notificación por WhatsApp
                        <span style={{display:'block', fontSize:'small', fontWeight:'200'}}>¿Desea recibir notificaciones por WhatsApp?</span>
                      </strong>
                    </Form.Label>
                    <Form.Check
                      type='checkbox'
                      id="selectNotification"
                      name="notify_wsp"
                      checked={profielJson.notify_wsp}
                      onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.checked})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center" controlId="userNotiEmail">
                    <Form.Label className='me-4'>
                      <strong>Notificación por correo electrónico
                        <span style={{display:'block', fontSize:'small', fontWeight:'200'}}>¿Desea recibir notificaciones por correo electrónico?</span>
                      </strong>
                    </Form.Label>
                    <Form.Check
                      type='checkbox'
                      id="selectNotification"
                      name="notify_email"
                      checked={profielJson.notify_email}
                      onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.checked})}
                    />
                  </Form.Group>
                </Form>
              </Col>
              {/* <Col md="12">
                <Button variant="warning" className={"text-white "+styles["roundedbtn"] }>
                  Deseo agregar apoderado
                </Button>
              </Col> */}
              <Col md="12">
                <Button className={"text-white btn-success "+ styles['float-right']+' '+styles["roundedbtn"]} onClick={changeDataUser}>
                  Guardar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <style global jsx>{`
        .alert-info {
          color: #0c5460;
          background-color: #d1ecf1;
          border-color: #bee5eb;
        }
        .btn-success {
          background: #00cac9;
          border-color: #00cac9;
        }
        .btn-success:hover {
          background: #138496;
          border-color: #138496;
        }
      `}</style>

    </Container>
  )

}
