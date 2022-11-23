import Head from 'next/head'
import variables from '../../../../../../../../styles/variables.module.scss';

import { Badge, Card, Col, Container, Row, Button, Tab, Tabs, Nav} from "react-bootstrap";
import Feedback from '../../../../../../../../components/resources/Feedback';

import { getLogo, getClassLanding } from '../../../../../../../../methods/getLogoClass';

import { useRouter } from 'next/router'
import { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';

import Link from 'next/link';

export const getServerSideProps = async ({ params, req,res }) => {
  const cookieUserToken = req.cookies['cookie-usertoken'];
  if (cookieUserToken == undefined) {
    return { redirect: { permanent: false, destination: "/accounts/login/?from="+req.url}, props:{},};
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

export default function Feddback(props) {
  props.onAuthenticationUser();
  props.onImgLogo(props.imgLogo);

  const router = useRouter();
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const [historyQuestionObj, setHistoryQuestionObj] = useState([]);
  const [errorHistoryQuestionObj, setErrorHistoryQuestionObj] = useState("");
  const [loadedHistoryQuestionObj, setLoadedHistoryQuestionObj] = useState(false);

  const [arrayRouterID, setArrayRouterID] = useState([]);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { r_id } = router.query
      const { mc_id } = router.query //packCourse
      const { c_id } = router.query //tema lesson
      const { t_id } = router.query // ua
      const array = [mc_id, c_id, t_id]
      setArrayRouterID(array)
      const url = `${process.env.API_URL}api/v1/historyusers/gethistoryuserresource/?resource_pk=${r_id}`
      history_question(url)
    }
  }, [])

  const history_question = (url) => {
    axios
        .get(url, { headers: { Authorization: useToken } })
        .then((response) => setHistoryQuestionObj(response.data))
        .catch((error) => setErrorHistoryQuestionObj(error.message))
        .finally(() => setLoadedHistoryQuestionObj(true));
      return null
    }


  return (
    <div>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{props.dataSeo.title} | Feedback</title>
        <meta name="description" content={props.dataSeo.description} />
        <meta property="og:site_name" content={props.dataSeo.site} />
        <meta property="og:title" content={props.dataSeo.title +' | Feedback'} key="title" />
        <meta property="og:description" content={props.dataSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.urlReferer}/>
        <meta property="og:image" content={props.dataSeo.image}/>

        <meta property="fb:app_id" content="111111111" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={props.dataSeo.title +' | Feedback'} />
        <meta property="twitter:site" content={'@'+props.dataSeo.title} />
        <meta property="twitter:creator" content={'@ticlasscom'} />
        <meta property="twitter:description" content={props.dataSeo.description} />
        <meta property="twitter:image" content={props.dataSeo.image} />

        <link rel="canonical" href={props.urlReferer} />
        <link rel="icon" href="/logos/img/favicon.png" />
    </Head>
      <h6 className="text-center text-white p-1" style={{background:variables.purpleColor}}>Feddback</h6>
      <Container>
        <Row>
          <Col md="12" className='pt-4'>
            <h5>Resultados de la evaluación</h5>
            <div className="d-flex justify-content-end">
              <Link key={1} href={`/mis-cursos/${arrayRouterID[0]}/clase/${arrayRouterID[1]}/ua/${arrayRouterID[2]}`}>
                <Button variant="primary" className="roundedbtn">Volver</Button>
              </Link>
            </div>
            <Card>
              <Card.Body>
                <Row>
                  <Col md="3">
                    <Row>
                      <Col md="6">Nota</Col>
                      <Col md="6">
                        <Card className='text-center'>
                          <Card.Body>
                            {historyQuestionObj?.history_user_resource?.historyuserresourcenote?.note}
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="3">
                    <Row>
                      <Col md="6">Puntaje</Col>
                      <Col md="6">
                        <Card className='text-center'>
                          <Card.Body>
                            0.0
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Card>
                      <Card.Body>
                        <p className='mb-1'>Resumen</p>
                        <div className='d-flex justify-content-between'>
                          <p className='m-0'>Correctas</p>
                          <Badge bg="success">{historyQuestionObj?.history_user_resource?.historyuserresourcenote?.correct}</Badge>
                        </div>
                        <hr className='mt-2 mb-2'></hr>
                        <div className='d-flex justify-content-between'>
                          <p className='m-0'>Incorrectas</p>
                          <Badge bg="danger">{historyQuestionObj?.history_user_resource?.historyuserresourcenote?.incorrect}</Badge>
                        </div>
                        <hr className='mt-2 mb-2'></hr>
                        <div className='d-flex justify-content-between'>
                          <p className='m-0'>Omitidas</p>
                          <Badge bg="warning">{historyQuestionObj?.history_user_resource?.historyuserresourcenote?.omitted}</Badge>
                        </div>

                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
          </Col>
          <Col md="12" className='pt-4'>
            <h5 className='text-center'>Preguntas</h5>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col md={12}>
                  <Nav variant="pills" className="mb-4 d-flex justify-content-center question-num">
                  {historyQuestionObj?.history_user_resource?.historyuserresourcequestion_set?.map((item,index) => {
                    const classColorAnswer = item.kind_answer
                    if(index == 0) {
                        return (<Nav.Item><Nav.Link eventKey={`first`} className={`rounded-circle me-2 `+classColorAnswer}>{index + 1}</Nav.Link></Nav.Item>)
                    } else {
                      return (<Nav.Item><Nav.Link eventKey={`num-`+index} className={`rounded-circle me-2 `+classColorAnswer}>{index + 1}</Nav.Link></Nav.Item>)
                    }

                  })}
                  </Nav>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Tab.Content>
                  {historyQuestionObj?.history_user_resource?.historyuserresourcequestion_set?.map((item,index) => {
                    if(index == 0) {
                        return (<Tab.Pane eventKey={`first`}>
                                  <Feedback answer={item.answer} enunciate={item.question.name} alternatives={item.question.questionsimpleselection_set} explanation={item.question.response} ></Feedback>
                                </Tab.Pane>)
                    } else {
                      return (<Tab.Pane eventKey={`num-`+index}>
                                <Feedback answer={item.answer}  enunciate={item.question.name} alternatives={item.question.questionsimpleselection_set} explanation={item.question.response} ></Feedback>
                              </Tab.Pane>)
                    }
                  })}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
      <style global jsx>{`
        .question-num .correct {
          background: #a3e692;
          color: #fff;
        }
        .question-num .incorrect {
          background: #ff9c9c;
          color: #fff;
        }
        .question-num .omitted {
          background: #ffdb74;
          color: #fff;
        }
        .nav-pills .nav-link.active.correct, .nav-pills .show>.nav-link {
          color: #fff;
          background-color: green;
        }
        .nav-pills .nav-link.active.incorrect, .nav-pills .show>.nav-link {
          color: #fff;
          background-color: #dc3545;
        }
        .nav-pills .nav-link.active.omitted, .nav-pills .show>.nav-link {
          color: #fff;
          background-color: #ffc008;
        }
      `}</style>
    </div>
  )
}
