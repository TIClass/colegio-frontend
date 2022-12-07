import { Form, Container, Row, Col, Card, Alert, Button} from 'react-bootstrap';
import styles from '../../../styles/Home.module.scss';

import Swal from 'sweetalert2'

import { useEffect, useState} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

import Moment from 'react-moment';
import moment from 'moment';

function FormStepUno(props) {
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const [profielJson, setProfielJson] = useState(props?.userObj);
  const [startDate, setStartDate] = useState(new Date(moment(profielJson.birthdate)));
  const [zones, setZones]= useState('');
  const [invalidEmail, setInvalidEmail] = useState('');

  const [fieldEmpty, setFieldEmpty]= useState(null);

  useEffect(() => {
    const urlZones = `${process.env.API_URL}api/v1/user/getnationalitycomunne/`
    getZones(urlZones)
  }, [])

  const getZones = (url) => {
    axios.get(url,  { headers: { Authorization: useToken } })
    .then(res => {
      setZones(res.data)
    })
    .catch(err => err)
  }

  const setStartDateClone = (e) => {
    setProfielJson({...profielJson, ['birthdate']: e})
    setStartDate(e)
  }

  const onSave = () => {
    let txtvalidar = ''
    if (!profielJson.first_name || !profielJson.last_name || !profielJson.email || !profielJson.rut
      || !profielJson.birthdate || !profielJson.phone || profielJson.nationality == null  || profielJson.country == null
      || profielJson.commune == null) {
        if (!profielJson.first_name) {
          txtvalidar = txtvalidar +'<li>Nombre es requerido</li>'
        }
        if (!profielJson.last_name) {
          txtvalidar = txtvalidar +'<li>Apellido es requerido</li>'
        }
        if (!profielJson.email) {
          txtvalidar = txtvalidar +'<li>Email es requerido</li>'
        }
        if (!profielJson.rut) {
          txtvalidar = txtvalidar +'<li>RUT es requerido</li>'
        }
        if (!profielJson.birthdate) {
          txtvalidar = txtvalidar +'<li>Fecha de nacimiento es requerido</li>'
        }
        if (!profielJson.phone) {
          txtvalidar = txtvalidar +'<li>Teléfono es requerido</li>'
        }
        if (profielJson.nationality == null) {
          txtvalidar = txtvalidar +'<li>Nacionalidad es requerido</li>'
        }
        if (profielJson.country == null) {
          txtvalidar = txtvalidar +'<li>País es requerido</li>'
        }
        if (profielJson.commune == null) {
          txtvalidar = txtvalidar +'<li>Comuna es requerido</li>'
        }
        setFieldEmpty(`<ul>${txtvalidar}</ul>`)
    } else {
      setFieldEmpty(null)


      // console.log(profielJson.first_name, profielJson.last_name, profielJson.email)
      // console.log(profielJson.rut, profielJson.birthdate, profielJson.phone, profielJson.nationality)
      // console.log(profielJson.country, profielJson.commune)

      props.setUserObj(profielJson)
      props.setUserAuthentications(profielJson)
      axios.put(profielJson.url, profielJson, {headers: { Authorization: useToken }})
      .then(res => {
        Swal.fire({
          title: 'Listo!',
          text: 'Datos guardados satisfactoriamente!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      })
      .catch(err => console.log(err))

    }
  }

  const checkedParent = (check) => {
    props.setCheckParent(check)
    if (check) {
      return "checked"
    }
    else{
      return ""
    }
  }

  function isValidEmail(email) {       
    return /\S+@\S+\.\S+/.test(email)    
  } 

  return (
    <div>
      <Container className='mt-4'>
      { fieldEmpty ?
        <Alert  variant='danger'><div dangerouslySetInnerHTML={{ __html: fieldEmpty }} /> </Alert>: <div></div>
      }
      <Form className='mt-4'>
        <Row>
          <Col md="6">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userFirstName">
              <Form.Label className='me-4'>
                <strong>Nombre</strong>
              </Form.Label>
              <Form.Control
              type="text"
              name='first_name'
              defaultValue={profielJson.first_name}
              onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userLastName">
              <Form.Label className='me-4'>
                <strong>Apellidos</strong>
              </Form.Label>
              <Form.Control
              type="text"
              name='last_name'
              defaultValue={profielJson.last_name}
              onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="d-flex align-items-center" controlId="userEmail">
              <Form.Label className='me-4'>
                <strong>Correo electrónico</strong>
              </Form.Label>
              <Form.Control
              type="text"
              name='email'
              defaultValue={profielJson.email}
              onChange={e => {
                setInvalidEmail(!isValidEmail(e.target.value)? 'Email inválido.':'')
                setProfielJson({...profielJson, [e.target.name]: e.target.value})
              }
                }
              />
            </Form.Group>
            {invalidEmail ? 
            <div className="mb-3 text-center" style={{color:'red'}}>
            <small>{invalidEmail}</small>
          </div>     : <div></div>
            }         
          </Col>
          <Col md="6">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userRut">
              <Form.Label className='me-4'>
                <strong>RUT</strong>
              </Form.Label>
              <Form.Control
              type="text"
              name='rut'
              defaultValue={profielJson.rut}
              onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userBirthday">
              <Form.Label className='me-4'>
                <strong>Fecha de nacimiento</strong>
              </Form.Label>
              <DatePicker
                locale="es"
                selected={startDate}
                name='birthdate'
                dateFormat="dd/MM/yyyy"
                className="form-control"
                onChange={e => setStartDateClone(e)}
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formPhone">
              <Form.Label className='me-4'>
                <strong>Teléfono</strong>
              </Form.Label>
              <Form.Control
              type="text"
              placeholder="Ingresa tu teléfono"
              name='phone'
              defaultValue={profielJson.phone}
              onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col md="4">
          <Form.Group className="mb-3 d-flex align-items-center" controlId="formComunity">
            <Form.Label className='me-4'>
              <strong>Nacionalidad</strong>
            </Form.Label>
            <Form.Select id='nationality'
              name='nationality'
              onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
              value={profielJson.nationality}>
            <option value={null}>Seleccionar</option>
              {zones?.nationality?.map((item,index) => {
                return (
                  <option key={index} value={item?.id}>{item?.name}</option>
                )
              })}
            </Form.Select>
          </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userCountry">
              <Form.Label className='me-4'>
                <strong>País</strong>
              </Form.Label>
              <Form.Select id='country'
                name='country'
                onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                value={profielJson.country}
              >
              <option value={null}>Seleccionar</option>
                {zones?.countries?.map((item,index) => {
                  return (
                    <option key={index} value={item?.id}>{item.name}</option>
                  )
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userCommune">
              <Form.Label className='me-4'>
                <strong>Comuna</strong>
              </Form.Label>
              <Form.Select id='commune'
                name='commune'
                onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                value={profielJson.commune}>
              <option value={null}>Seleccionar</option>
                {zones?.comunne?.map((item,index) => {
                  return (
                    <option key={index} value={item?.id}>{item?.name}</option>
                  )
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="6">
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
          </Col>
          <Col md="6">
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
          </Col>
          <Col md="6">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="parentNotiIsParent">
              <Form.Label className='me-4'>
                <strong>¿Usted es apoderado?
                  <span style={{display:'block', fontSize:'small', fontWeight:'200'}}>¿Desea que sus hijos o familiares utilicen la plataforma?</span>
                </strong>
              </Form.Label>
              <Form.Check
                type='checkbox'
                id="parent"
                name="is_parent"
                defaultChecked = {checkedParent(profielJson.is_parent)}
                onChange={e =>
                  {
                    setProfielJson({...profielJson, [e.target.name]: e.target.checked})
                    props.setCheckParent(e.target.checked)
                  }
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="text-center">
            <Button size="lg" className={"text-white btn-danger "+styles["roundedbtn"]} onClick={onSave}>
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
      </Container>
    </div>
  );
}

export default FormStepUno;
