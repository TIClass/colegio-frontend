import { Form, Container, Row, Col, Card, Alert, Button} from 'react-bootstrap';
import styles from '../../../styles/Home.module.scss';

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

function FormStepDos(props) {  
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const [profielJson, setProfielJson] = useState(props?.userObj);
  const [startDate, setStartDate] = useState(new Date(moment(profielJson.birthdate)));
  const [zones, setZones]= useState('');

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
    axios.put(profielJson.url, profielJson, {headers: { Authorization: useToken }})
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Container className='mt-4'>
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
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userEmail">
              <Form.Label className='me-4'>
                <strong>Correo electrónico</strong>
              </Form.Label>
              <Form.Control
              type="text"
              name='email'
              defaultValue={profielJson.email}
              onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
              />
            </Form.Group>
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
          <Col md="4">
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
          <Col md="4">
            <Form.Group className="mb-3 d-flex align-items-center" controlId="userCountry">
              <Form.Label className='me-4'>
                <strong>País</strong>
              </Form.Label>
              <Form.Select id='country'
                name='country'
                onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                defaultValue={profielJson.country}
              >
              <option value={-1}>País</option>
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
                defaultValue={profielJson.commune}>
              <option value={-1}>Comuna</option>
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
                checked={profielJson.is_parent}
                onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.checked})}
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

export default FormStepDos;
