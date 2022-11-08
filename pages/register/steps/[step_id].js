import { Container, Row, Col, Card, Alert, Button} from 'react-bootstrap';
import styles from '../../../styles/Home.module.scss';
import { Steps, Panel, Placeholder,  } from "rsuite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';
import { useRouter } from 'next/router'
import React from 'react';
import Router from 'next/router'

import FormStepUno from '../../../components/register/steps/FormStepUno';
import FormStepDos from '../../../components/register/steps/FormStepDos';
import FormStepDosParent from '../../../components/register/steps/FormStepDosParent';
import FormStepTres from '../../../components/register/steps/FormStepTres';
import FormStepCuatro from '../../../components/register/steps/FormStepCuatro';

export default function Steps2(props) {
  props.onAuthenticationUser();
  const router = useRouter();
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const { step_id } = router.query

  const [userObj, setUserObj] = useState('');
  const [checkParent, setCheckParent] = useState('');
  const [errorUserObj, setErrorUserObj] = useState('');
  const [loadedUserObj, setLoadedUserObj] = useState('');

  const onNext = () => onChange(parseInt(step_id) + 1);
  const onPrevious = () => onChange(parseInt(step_id) - 1);


  const isFinalized = () => {
    Router.push(`/mis-cursos`)
  };

  const onChange = (nextStep) => {
    Router.push(`/register/steps/${nextStep}`)
  };

  useEffect(() => {
    const urlUser = `${process.env.API_URL}api/v1/user/`
    getUser(urlUser)
  }, [])

  const axiosUserInfo = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setUserObj(response.data.results[0]))
      .catch((error) => setErrorUserObj(error.message))
      .finally(() => setLoadedUserObj(true));
    return null
  }

  const getUser = (url) => {
    return new Promise((resolve, reject) => {
      resolve(axiosUserInfo(url))
    });
  }

  const stepNav = (is_parent) => {
    if (checkParent || is_parent) {
      return (
        <Steps current={parseInt(step_id)-1}>
          <Steps.Item/>
          <Steps.Item/>
          <Steps.Item/>
          <Steps.Item/>
        </Steps>
      )
    }
    else{
      return(
        <Steps current={parseInt(step_id)-1}>
          <Steps.Item/>
          <Steps.Item/>
          <Steps.Item/>
        </Steps>
      )
    }
  }

  return (
    <div>
    <Container className='mt-4'>
      <Row className="justify-content-md-center">
        <Col md="9">
          <Card>
            <Card.Body>
              <Alert variant='info'>
                <h3>¡No tan rápido pequeñín!</h3>
                Antes de partir usando Natiboo, necesitamos saber unos pequeños datos que nos permitiran guiarte a conseguir tu objetivo de manera efectiva.
              </Alert>

              {stepNav(userObj?.is_parent)}

              {parseInt(step_id)-1 === 0 && loadedUserObj
                ?<div><FormStepUno userObj={userObj} setUserObj={setUserObj} checkParent={checkParent} setCheckParent={setCheckParent}/></div>
                :<div></div>
              }
              {parseInt(step_id)-1 === 1 && userObj.is_parent  && loadedUserObj
                ?<div><FormStepDosParent userObj={userObj}/></div>
                :<div></div>
              }

              {parseInt(step_id)-1 === 1 && !userObj.is_parent && loadedUserObj
                ?<div><FormStepTres userObj={userObj}/></div>
                :<div></div>
              }

              {parseInt(step_id)-1 === 2 && userObj.is_parent && loadedUserObj
                ?<div><FormStepTres userObj={userObj}/></div>
                :<div></div>
              }

              {parseInt(step_id)-1 === 2 && !userObj.is_parent && loadedUserObj
                ?<div><FormStepCuatro setUserObj={setUserObj} userObj={userObj}/></div>
                :<div></div>
              }

              {parseInt(step_id)-1 === 3 && userObj.is_parent && loadedUserObj
                ?<div><FormStepCuatro setUserObj={setUserObj} userObj={userObj}/></div>
                :<div></div>
              }

              {parseInt(step_id)-1 === 3 && !userObj.is_parent && loadedUserObj
                ?<div>Gracias tu registro a finalizado</div>
                :<div></div>
              }

              {parseInt(step_id)-1 === 4 && userObj.is_parent && loadedUserObj
                ?<div className="text-center pt-4">
                  <h2>Muchas Gracias, <br/>Tu registro a finalizado</h2>
                  <Button className={"text-white btn-success "+styles["roundedbtn"]} onClick={isFinalized}>
                    Ir a mis cursos
                  </Button>
                </div>
                :<div></div>
              }
              <Col md="12">
                <div className='d-flex justify-content-between'>
                  { parseInt(step_id)-1 === 0 || parseInt(step_id)-1 === 4 && userObj.is_parent || parseInt(step_id)-1 === 3 && !userObj.is_parent ?
                  <div></div> :
                  <Button className={"text-white btn-success "+styles["roundedbtn"]} onClick={onPrevious} disabled={parseInt(step_id) === 1}>
                    Anterior
                  </Button>
                  }

                  { parseInt(step_id)-1 === 4 && userObj.is_parent || parseInt(step_id)-1 === 3 && !userObj.is_parent ?
                    <div></div> :
                    <Button className={"text-white btn-success "+styles["roundedbtn"]} onClick={onNext} >
                      Siguiente
                    </Button>
                  }
                </div>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <style global jsx>{`
      .btn-success {
        background: #00cac9 !important;
        border-color: #00cac9 !important;
      }
      .btn-success:hover {
        background: #138496 !important;
        border-color: #138496 !important;
      }
    `}</style>
    </div>
  );
};
