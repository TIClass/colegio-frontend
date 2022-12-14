import Head from 'next/head'
import { Container, Row, Col, Card, Alert, Button} from 'react-bootstrap';
import styles from '../../../styles/Home.module.scss';
import { Steps, Panel, Placeholder,  } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';
import { useRouter } from 'next/router'
import React from 'react';
import Router from 'next/router'

import {isAuthenticationUser} from '../../../methods/utils';

import FormStepUno from '../../../components/register/steps/FormStepUno';
import FormStepDos from '../../../components/register/steps/FormStepDos';
import FormStepDosParent from '../../../components/register/steps/FormStepDosParent';
import FormStepTres from '../../../components/register/steps/FormStepTres';
import FormStepCuatro from '../../../components/register/steps/FormStepCuatro';

import { getLogo, getClassLanding } from '../../../methods/getLogoClass';

export const getServerSideProps = async ({ params, req,res }) => {
  const cookieUserToken = req.cookies['cookie-usertoken'];
  if (cookieUserToken == undefined) {
    return { redirect: { permanent: true, destination: "/accounts/login/?from="+req.url}, props:{},};
  }
  const locationParts = req.headers.host.split('.');
  const subdomain = locationParts[0]

  const useTokenSeoA = `Token ${process.env.TOKEN_GENERIC_API}`
  const urlSeoA = `${process.env.API_SEO_URL}api/v1/ticourse/seo/?proyect_name=${subdomain}`
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': useTokenSeoA
    }
  }

  const resSeo = await fetch(urlSeoA, options)
  const dataSeo = await resSeo.json()

  const urlReferer = `https://${req.headers.host}${req.url}`
  const urlHost = req.headers.host
  return { props: {subdomain:subdomain, dataSeo:dataSeo, urlReferer:urlReferer, urlHost:urlHost,
      classLanding:getClassLanding(subdomain), imgLogo:getLogo(subdomain)}}
}

export default function Steps2(props) {
  props.onAuthenticationUser();
  props.onImgLogo(props.imgLogo);

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
    if (!token) {
      Router.push('/accounts/login')
    }
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
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{props.dataSeo.title} | {props.dataSeo.slogan}</title>
        <meta name="description" content={props.dataSeo.description} />
        <meta property="og:site_name" content={props.dataSeo.site} />
        <meta property="og:title" content={props.dataSeo.title +' | '+ props.dataSeo.slogan} key="title" />
        <meta property="og:description" content={props.dataSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.urlReferer}/>
        <meta property="og:image" content={props.dataSeo.image}/>

        <meta property="fb:app_id" content="111111111" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={props.dataSeo.title +' | '+ props.dataSeo.slogan} />
        <meta property="twitter:site" content={'@'+props.dataSeo.title} />
        <meta property="twitter:creator" content={'@ticlasscom'} />
        <meta property="twitter:description" content={props.dataSeo.description} />
        <meta property="twitter:image" content={props.dataSeo.image} />

        <link rel="canonical" href={props.urlReferer} />
        <link rel="icon" href="/logos/img/favicon.png" />
    </Head>
    <Container className='mt-4'>
      <Row className="justify-content-md-center">
        <Col md="9">
          <Card>
            <Card.Body>
              <Alert variant='info'>
                <h3>??No tan r??pido peque????n!</h3>
                Antes de partir usando TIClass, necesitamos saber unos peque??os datos que nos permitiran guiarte a conseguir tu objetivo de manera efectiva.
              </Alert>

              {stepNav(userObj?.is_parent)}

              {parseInt(step_id)-1 === 0 && loadedUserObj
                ?<div><FormStepUno userObj={userObj} setUserObj={setUserObj} setUserAuthentications={props.setUserAuthentications} checkParent={checkParent} setCheckParent={setCheckParent}/></div>
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
                ?<div className="text-center pt-4">
                <h2>Muchas Gracias, <br/>Tu registro a finalizado</h2>
                <Button className={"text-white btn-success "+styles["roundedbtn"]} onClick={isFinalized}>
                  Ir a mis cursos
                </Button>
              </div>
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
