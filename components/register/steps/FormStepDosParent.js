import { Form, Container, Row, Col, Card, Button} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import styles from '../../../styles/Home.module.scss';

import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

import validator from 'validator'
import { validate as validateRut, format as formatRut } from 'rut.js'

import Swal from 'sweetalert2'

import { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

import Moment from 'react-moment';
import moment from 'moment';

function FormStepDosParent(props) {
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const [showPopover, setShowPopover] = useState(false);
  const target = useRef(null);

  const [studentArrayForm, setStudentArrayForm] = useState([]);

  const studentUsers = []
  const [cont, setCont] = useState(1);
  const [validatorEmails, setValidatorEmails] = useState([]);
  const [validatorRuts, setValidatorRuts] = useState([]);
  const [confirmarFormatoRuts, setConfirmarFormatoRuts] = useState([]);
  const [confirmarFormatoEmails, setConfirmarFormatoEmails] = useState([]);

  const [countPerson, setCountPerson] = useState('');


  const [msjEmail, setMsjEmail] = useState('');
  const [msjNewEmail, setMsjNewEmail] = useState('');
  const [emailTerm, setEmailTerm] = useState(1);
  const [validateEmailObj, setValidateEmailObj] = useState('');
  const [profielJson, setProfielJson] = useState(props?.userObj);
  const [startDate, setStartDate] = useState(new Date(moment(profielJson.birthdate)));
  const [zones, setZones]= useState('');
  const [createStudentsUserObj, setCreateStudentsUserObj]= useState('');
  const [studentsUserJson, setStudentsUserJson]= useState([]);

  const [studentUserObj, setStudentUserObj] = useState('');
  const [errorStudentUserObj, setErrorStudentUserObj] = useState('');
  const [loadedStudentUserObj, setLoadedStudentUserObj] = useState('');

  useEffect(() => {
    const urlZones = `${process.env.API_URL}api/v1/user/getnationalitycomunne/`
    const urlStudentsUser = `${process.env.API_URL}api/v1/user/students-user-parent/`
    getZones(urlZones)
    axiosStudentUserInfo(urlStudentsUser)
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

  const AxiosValidateEmail = async (email, index, student_pk) => {
    const urlValidateEmail = `${process.env.API_URL}api/v1/user/students-user-parent/?kind=${'validate-email'}&email=${email}&student_pk=${student_pk}`
    try {
       const response = await axios.get(urlValidateEmail, { headers: { Authorization: useToken } });
       return response.data
    } catch (error) {
        throw error;
    }
  }

  const AxiosValidateRut = async (rut, index, student_pk) => {
    const urlValidateRut = `${process.env.API_URL}api/v1/user/students-user-parent/?kind=${'validate-rut'}&rut=${rut}&student_pk=${student_pk}`
    try {
       const response = await axios.get(urlValidateRut, { headers: { Authorization: useToken } });
       return response.data
    } catch (error) {
        throw error;
    }
  }

  const addUser = () => {
    setCont(cont+1)
    //setStudentArrayForm([true])
    setStudentArrayForm(studentArrayForm => [...studentArrayForm, true])
  }

  const onSave = (cont) => {
    for (var i = 0; i < cont ; i++ ){
      var selector_first_name = document.querySelector(`#studentsFirstName${i}`)
      var student_pk = selector_first_name.dataset.userpk
      var student_name = document.querySelector(`#studentsFirstName${i}`).value
      var student_last_name = document.querySelector(`#studentsLastName${i}`).value
      var student_email = document.querySelector(`#studentsEmail${i}`).value
      var student_rut = document.querySelector(`#studentsRut${i}`).value
      studentUsers.push(
        {
          id : student_pk,
          first_name : student_name,
          last_name : student_last_name,
          rut : formatRut(student_rut),
          email : student_email
        }
      )
    }

    const formData = new FormData();
    formData.append('studentsUsers', JSON.stringify(studentUsers));

    const urlStudentsUser = `${process.env.API_URL}api/v1/user/students-user-parent/`
    createStudentsUser(formData, urlStudentsUser, setCreateStudentsUserObj)

    Swal.fire({
      title: 'Listo!',
      text: 'Datos de estudiantes guardados satisfactoriamente!',
      icon: 'success',
      confirmButtonText: 'Ok'
    })

  }

  const axiosFunction = (formData, URL, setObj) => {
        const data = formData;
        const cookie_usertoken = getCookie('cookie-usertoken');
        const token = cookie_usertoken;
        const useToken = token ? `Bearer ${token}` : `Token ${process.env.tokenGenericApi}`
        //const useToken = `Token ${process.env.tokenGenericApi}`
        const resAdminMaster = axios.post(URL, data,{ headers: { Authorization: useToken, "Content-Type":"multipart/form-data"} })
                            .then(res => setObj(res.data))
                            .catch(err => err)
  }

  const axiosStudentUserInfo = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => {
        setStudentUserObj(response.data)
        setCont(response.data.length)
        setCountPerson(response.data.length)
        setValidatorEmails([...response.data.map(res=> (false))])
        setValidatorRuts([...response.data.map(res=> (false))])
        setConfirmarFormatoRuts([...response.data.map(res=> (false))])
        setConfirmarFormatoEmails([...response.data.map(res=> (false))])
      })
      .catch((error) => setErrorStudentUserObj(error.message))
      .finally(() => {
        setLoadedStudentUserObj(true)
      });
    return null
  }

  const createStudentsUser = (data, url, setCreateStudentsUserObj) => {
      return new Promise((resolve, reject) => {
              resolve(axiosFunction(data, url));
          });
  }

  //Estamos ocupando esta función
  const handleRut = async (e, index) => {
    const rut = e.target.value;
    if (validatorRuts.length < index+1) {
      validatorRuts.push(false)
      confirmarFormatoRuts.push(false)
    }
    const selector_first_name = document.querySelector(`#studentsFirstName${index}`)
    const student_pk = selector_first_name.dataset.userpk
    if (rut.length >=9 && validateRut(formatRut(rut))){
      const isValid = await AxiosValidateRut(formatRut(rut),index, student_pk);
      if (isValid.occupied) {
        const nuevoArray = validatorRuts.map((element,index2) => {
          if (index2 == index) {
            return true
          } else {
            return element
          }
        })
        setValidatorRuts(nuevoArray)
        const nuevoArray2 = confirmarFormatoRuts.map((element,index2) => {
          if (index2 == index) {
            return false
          } else {
            return element
          }
        })
        setConfirmarFormatoRuts(nuevoArray2)
      } else {
        const nuevoArray = validatorRuts.map((element,index2) => {
          if (index2 == index) {
            return false
          } else {
            return element
          }
        })
        setValidatorRuts(nuevoArray)
        const nuevoArray2 = confirmarFormatoRuts.map((element,index2) => {
          if (index2 == index) {
            return false
          } else {
            return element
          }
        })
        setConfirmarFormatoRuts(nuevoArray2)
      }

      return formatRut(rut)
    } else {
      const nuevoArray = validatorRuts.map((element,index2) => {
        if (index2 == index) {
          return false
        } else {
          return element
        }
      })
      setValidatorRuts(nuevoArray)
      const nuevoArray2 = confirmarFormatoRuts.map((element,index2) => {
        if (index2 == index) {
          return true
        } else {
          return element
        }
      })
      setConfirmarFormatoRuts(nuevoArray2)
    }
    return formatRut(rut)
  }

  const handleEmail = async (e,index) => {
    const email = e.target.value;
    if (validatorEmails.length < index+1) {
      validatorEmails.push(false)
      confirmarFormatoEmails.push(false)
    }
    const selector_first_name = document.querySelector(`#studentsFirstName${index}`)
    const student_pk = selector_first_name.dataset.userpk
    if (validator.isEmail(email)){
      const isValid = await AxiosValidateEmail(email,index, student_pk);
      if (isValid.occupied) {
        const nuevoArray = validatorEmails.map((element,index2) => {
          if (index2 == index) {
            return true
          } else {
            return element
          }
        })
        setValidatorEmails(nuevoArray)
        const nuevoArray2 = confirmarFormatoEmails.map((element,index2) => {
          if (index2 == index) {
            return false
          } else {
            return element
          }
        })
        setConfirmarFormatoEmails(nuevoArray2)
      } else {
        const nuevoArray = validatorEmails.map((element,index2) => {
          if (index2 == index) {
            return false
          } else {
            return element
          }
        })
        setValidatorEmails(nuevoArray)
        const nuevoArray2 = confirmarFormatoEmails.map((element,index2) => {
          if (index2 == index) {
            return false
          } else {
            return element
          }
        })
        setConfirmarFormatoEmails(nuevoArray2)
      }

      return email
    } else {
      const nuevoArray = validatorEmails.map((element,index2) => {
        if (index2 == index) {
          return false
        } else {
          return element
        }
      })
      setValidatorEmails(nuevoArray)
      const nuevoArray2 = confirmarFormatoEmails.map((element,index2) => {
        if (index2 == index) {
          return true
        } else {
          return element
        }
      })
      setConfirmarFormatoEmails(nuevoArray2)
    }
    return email
  }

  return (
    <div>
      <Container className='mt-4'>
        <Row>
          {studentUserObj ?
          <Form className='mt-4'>
          {studentUserObj ?
          studentUserObj?.map((item,index)  => {
            return(
              <Row key={index}>
                <h3> Persona {index+1}</h3>
                <hr></hr>
              <Col md="6">
              <Form.Group className="mb-3 d-flex align-items-center" controlId={`studentsFirstName${index}`}>
                <Form.Label className='me-4'>
                  <strong>Nombre</strong>
                </Form.Label>
                <Form.Control
                type="text"
                name='first_name'
                defaultValue={item.first_name}
                data-userpk={item.id ? item.id : 0}
                required
                // onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="mb-3 d-flex align-items-center" controlId={`studentsLastName${index}`}>
                <Form.Label className='me-4'>
                  <strong>Apellidos</strong>
                </Form.Label>
                <Form.Control
                type="text"
                name='last_name'
                defaultValue={item.last_name}
                // onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="mb-0 d-flex align-items-center" controlId={`studentsEmail${index}`}>
                <Form.Label className='me-4'>
                  <strong>Correo electrónico</strong>
                </Form.Label>
                <Form.Control
                type="text"
                name='email'
                defaultValue={item.email}
                onChange={(e) => handleEmail(e,index)}
                />
              </Form.Group>
              { validatorEmails[index] ?
                <Alert  variant='danger'>
                  Está ocupado 🥲
                </Alert> : <div></div>
              }

            </Col>
            <Col md="6">
              <Form.Group className="mb-3 d-flex align-items-center" controlId={`studentsRut${index}`}>
                <Form.Label className='me-4'>
                  <strong>RUT</strong>
                </Form.Label>
                <Form.Control
                type="text"
                name='rut'
                defaultValue={item.rut}
                placeholder="11.111.111-1"
                onChange={(e) => handleRut(e,index)}
                />
              </Form.Group>
              { confirmarFormatoRuts[index] ?
                <Alert  variant='info'>
                  El Rut no es válido
                </Alert> : <div></div>
              }
              { validatorRuts[index] ?
                <Alert  variant='danger'>
                  Está ocupado 🥲
                </Alert> : <div></div>
              }
            </Col>
            </Row>
            )
          })
       : <div></div>
        }

      </Form> : <div></div>

        }
          <Col md="12" className="text-center pb-2">
            <Button size="lg" className={"text-white btn-warning "+styles["roundedbtn"]+" "+styles["float-right"]} onClick={e => addUser()}>
              Añadir personas
            </Button>
          </Col>
        </Row>
        <Row>
        {studentArrayForm?.map((item,index) => {
          return(
          <div key={index}>
          <>
          <h3> Persona {countPerson+index+1} </h3>
          <hr></hr>
          <Row>
            <Col md="6">
            <Form.Group className="mb-3 d-flex align-items-center" controlId={`studentsFirstName${countPerson+index}`}>
              <Form.Label className='me-4'>
                <strong>Nombre</strong>
              </Form.Label>
              <Form.Control
              type="text"
              name='first_name'
              defaultValue=''
              data-userpk={0}
              required
              // onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
              />
            </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="mb-3 d-flex align-items-center" controlId={`studentsLastName${countPerson+index}`}>
                <Form.Label className='me-4'>
                  <strong>Apellidos</strong>
                </Form.Label>
                <Form.Control
                type="text"
                name='last_name'
                defaultValue=''
                // onChange={e => setProfielJson({...profielJson, [e.target.name]: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="mb-3 d-flex align-items-center" controlId={`studentsEmail${countPerson+index}`}>
                <Form.Label className='me-4'>
                  <strong>Correo electrónico</strong>
                </Form.Label>
                <Form.Control
                type="text"
                name='email'
                defaultValue=''
                onChange={(e) => handleEmail(e,countPerson+index)}
                />
              </Form.Group>
              { validatorEmails[countPerson+index] ?
                <Alert  variant='danger'>
                  Está ocupado 🥲
                </Alert> : <div></div>
              }
            </Col>
            <Col md="6">
              <Form.Group className="mb-3 d-flex align-items-center" controlId={`studentsRut${countPerson+index}`}>
                <Form.Label className='me-4'>
                  <strong>RUT</strong>
                </Form.Label>
                <Form.Control
                type="text"
                name='rut'
                defaultValue=''
                onChange={(e) => handleRut(e,countPerson+index)}
                />
              </Form.Group>
              { confirmarFormatoRuts[countPerson+index] ?
                <Alert  variant='info'>
                  El Rut no es válido
                </Alert> : <div></div>
              }
              { validatorRuts[countPerson+index] ?
                <Alert  variant='danger'>
                  Está ocupado 🥲
                </Alert> : <div></div>
              }
            </Col>
          </Row>
          </>
          </div>)
        })}
        </Row>
        <Row>
          <Col md="12" className="text-center">
            <Button size="lg" className={"text-white btn-danger "+styles["roundedbtn"]} onClick={e => {onSave(cont)}}>
              Guardar
            </Button>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default FormStepDosParent;
