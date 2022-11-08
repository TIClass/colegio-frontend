import { Container, Row, Col, Button, Card, InputGroup, Alert} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { useEffect, useState} from 'react';

import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

import axios from 'axios';
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next';

import Router from 'next/router'
import { Link } from 'react-router-dom';

// import { useUAQuiz } from '../../hooks/useUAQuiz';
// import { useUAQuestionQuiz } from '../../hooks/useUAQuestionQuiz';

export const getServerSideProps = async ({ params, req,res }) => {
  return { props: {}}
}

function QuizResource(props) {
  const router = useRouter();
  const [dataObj, setDataObj] = useState([]);
  const [isCorrectObj, setIsCorrectObj] = useState(null);
  const [errorIsCorrectObj, setErrorIsCorrectObj] = useState("");
  const [dataQuizObj, setDataQuizObj] = useState(null);
  const [errorQuizObj, setErrorQuizObj] = useState("");
  const [loadedQuizObj, setLoadedQuizObj] = useState(false);
  const [loadedIsCorrectObj, setLoadedIsCorrectObj] = useState(false);

  const [dataQuestionQuizObj, setDataQuestionQuizObj] = useState(null);
  const [errorQuestionQuizObj, setErrorQuestionQuizObj] = useState("");
  const [loadedQuestionQuizObj, setLoadedQuestionQuizObj] = useState(false);
  const [indexQuestionQuiz, setIndexQuestionQuiz] = useState(0);

  const [btnNextQuestionQuiz, setBtnNextQuestionQuiz] = useState(false);
  const [showAlertFacebook, setShowAlertFacebook] = useState(false);

  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const axiosQuiz = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setDataQuizObj(response.data))
      .catch((error) => setErrorQuizObj(error.message))
      .finally(() => setLoadedQuizObj(true));
    return null
  }

  const axiosQuestionQuiz = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setDataQuestionQuizObj(response.data))
      .catch((error) => setErrorQuestionQuizObj(error.message))
      .finally(() => setLoadedQuestionQuizObj(true));
    return null
  }

  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setDataObj(res.data))
          .catch(err => err)
  }
  let { t_id } = router.query
  const trackingApiQuiz = (question_pk, alternative) => {
    // mandar la info al backend
    const urlTrackingVideo = `${process.env.API_URL}api/v1/historyusers/`
    const data_tracking = {
      pack_pk:dataObj?.packcourse?.pack_id,
      course_pk:dataObj?.course_data?.id,
      resource_pk:props.resource?.id,
      ua_pk:t_id,
      question_pk:question_pk,
      alternative_pk: alternative
    }
    axiosPostObj(urlTrackingVideo, data_tracking)
  }

  const axiosPostObj= (url, data) => {
    axios.post(url, data, { headers: { Authorization: useToken } })
          .then(res => res.data)
          .catch(err => err)
    return null
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      const { c_id } = router.query
      const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/${mc_id}/?coursetema_pk=${c_id}&info=True`
      axiosCourseObj(urlCourses);
    }
    axiosQuiz(`${process.env.API_URL}api/v1/ticlassapps/tischool/quizs/${props.resource_id}/`)
  }, [router])

  if (loadedQuizObj) {
    const questionquiz_id = dataQuizObj.questionquiz_set[indexQuestionQuiz]?.question
    const urlQuestionQuiz = `${process.env.API_URL}api/v1/ticlassapps/tischool/questions/${questionquiz_id}/`
    if (!loadedQuestionQuizObj) {
      axiosQuestionQuiz(urlQuestionQuiz)
    }
  }

  const nextQuestion = (index) => {
    if (index <= dataQuizObj?.total_questions ) {
      setIndexQuestionQuiz(index);
      setLoadedQuestionQuizObj(false);
      setBtnNextQuestionQuiz(false);
      setShowAlertFacebook(false);
    } else {
      //modal termino su quiz
      setIndexQuestionQuiz(index);
    }
  }

  const is_correct = (question_pk, alternative_pk) => {
    const url = `${process.env.API_URL}api/v1/ticlassapps/tischool/question-answer/?question_pk=${question_pk}&alternative_pk=${alternative_pk}`
    axios
        .get(url, { headers: { Authorization: useToken } })
        .then((response) => setIsCorrectObj(response.data))
        .catch((error) => setErrorIsCorrectObj(error.message))
        .finally(() => setLoadedIsCorrectObj(true));
      return null
    }


  const checkFeedback = (resource) => {
    const alternative = null
    const questionquiz_respuesta = document.querySelector('input[name="questionquiz_respuesta"]:checked');
    if (resource.msg_feedback == true){
      //Para pregunta omitida
      if (questionquiz_respuesta == null){
        alternative = 0
      } else {
        alternative = questionquiz_respuesta.value
      }
      trackingApiQuiz(dataQuestionQuizObj?.id,alternative)
      is_correct(dataQuestionQuizObj?.id,alternative)
      // Router.push(`/mis-cursos/${dataObj.packcourse.id}/clase/${dataObj.id}/ua/${t_id}/feedback/${props.resource?.id}/`)

    }
  }

  // Revisa que se llame la función is_correct
  if (loadedIsCorrectObj) {
    setLoadedIsCorrectObj(false)
    setBtnNextQuestionQuiz(true)
    setShowAlertFacebook(true)

  }

  const openInNewTab = (e) => {
    e.preventDefault();
    const url = e.target.href
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const getButtonQuestionQuiz = (msg_feedback) => {
    if (msg_feedback) {
      if (indexQuestionQuiz <= dataQuizObj?.total_questions && !btnNextQuestionQuiz) {
        return (<Button variant="info" className="text-white btn-resp" size="lg" onClick={()=>{checkFeedback(props.resource)}}>Enviar respuesta</Button>)
      }
      if (indexQuestionQuiz+1 < dataQuizObj?.total_questions && btnNextQuestionQuiz) {
        return (<Button variant="warning" className="text-white btn-resp" size="lg" onClick={()=>{nextQuestion(indexQuestionQuiz+1)}}>Siguiente</Button>)
      }
      if (indexQuestionQuiz+1 == dataQuizObj?.total_questions) {
        return (
          <Button variant="danger" className="text-white btn-resp" size="lg"
            onClick={e => openInNewTab(e)}
            href={"/mis-cursos/"+dataObj.packcourse.id+"/clase/"+dataObj.id+"/ua/"+t_id+"/feedback/"+props.resource?.id}
          >Finalizado</Button>
        )
      }
    } else {
      if (indexQuestionQuiz <= dataQuizObj?.total_questions) {
        return (<Button variant="info" className="text-white btn-resp" size="lg" onClick={()=>{checkFeedback(props.resource)}}>Enviar respuesta</Button>)
      } else {
        return (<Button variant="danger" className="text-white btn-resp" size="lg" onClick={()=>{checkFeedback(props.resource)}}>Finalizado</Button>)
      }
    }
  }

  const getAlertFeedBack = (msg_feedback) => {
    if (msg_feedback) {
      if (showAlertFacebook) {
        const variant = null
        const msg = null
        if (isCorrectObj?.qss?.id) {
            variant = isCorrectObj?.qss?.correct_answer ? `success` : `danger`
            msg = isCorrectObj?.qss?.correct_answer ? `Correcto, sigue así!` : `Pucha no, pero a la otra sí!`
        } else {
          variant = `warning`
          msg = `Omitida, no te la jugaste`
        }
        return(<Alert key={1} variant={variant}>
          {msg}
          </Alert>)
      }
    }
  }

  const renderLatext = (text) => {
    if (text != undefined) {
        return(<Latex strict>{text}</Latex>)
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col md="6">
              <h4>{dataQuizObj?.questionquiz_set[indexQuestionQuiz]?.sort_order} de {dataQuizObj?.total_questions} preguntas </h4>
              <p className="card-text">
                {renderLatext(dataQuestionQuizObj?.name)}
              </p>
            </Col>
            <Col md="6">
              {loadedQuizObj && loadedQuestionQuizObj == true?
                <div>
                  <h4>Responder:</h4>
                  <div className="card-text alternativas">
                    <div className="list-group item radio-toolbar">
                      {dataQuestionQuizObj?.questionsimpleselection_set?.map( (item,index)=>{
                        return(
                          <div className="d-block" key={index}>
                            <InputGroup className="mb-3 inputGroup">
                              <Form.Check type='radio' id={`default-radio-`+index} name="questionquiz_respuesta" label={renderLatext(item.alternative)} className="inputradio"
                              defaultValue={item.id}/>
                            </InputGroup>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <Row>
                    {getAlertFeedBack(props.resource.msg_feedback)}
                    {getButtonQuestionQuiz(props.resource.msg_feedback)}
                  </Row>
                </div>
                : <div></div>
              }
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <style global jsx>{`
        .btn-resp {
          border-radius: 20px !important;
        }
        .powered-logo-footer{
          width: 70px;
          height: 35px;
          background-size: 70px 50px;
          margin: auto;
        }
        .alert {
            -webkit-border-radius: 20px!important;
            -moz-border-radius: 20px!important;
            border-radius: 20px!important;
        }
        .inputGroup {
        	 background-color: #fff;
        	 display: block;
        	 margin: 10px 0;
        	 position: relative;
        }
         .inputGroup label {
        	 padding: 12px 30px;
        	 width: 100%;
        	 display: block;
        	 text-align: left;
        	 color: #3C454C;
        	 cursor: pointer;
        	 position: relative;
        	 z-index: 2;
        	 transition: color 200ms ease-in;
        	 overflow: hidden;
        }
         .inputGroup label:before {
        	 width: 10px;
        	 height: 10px;
        	 content: &#39;
        	&#39;
        	;
        	 background-color: #3d86c6 !important;
        	 position: absolute;
        	 left: 50%;
        	 top: 50%;
        	 transform: translate(-50%,-50%) scale3d(1,1,1);
        	 transition: all 300ms cubic-bezier(0.4,0.0,0.2,1);
        	 opacity: 0;
        	 z-index: -1;
        }
         .inputGroup input:checked ~ label {
        	 color: #fff;
        }
         .inputGroup input:checked ~ label:before {
        	 transform: translate(-50%,-50%) scale3d(56,56,1);
        	 opacity: 1;
        }
         .inputGroup input {
        	 width: 32px;
        	 height: 32px;
        	 order: 1;
        	 z-index: 2;
        	 position: absolute;
        	 right: 30px;
        	 top: 50%;
        	 transform: translateY(-50%);
        	 cursor: pointer;
        	 visibility: hidden;
        }
         .inputGroup .custom-control-label {
        	 border-radius: 20px !important;
        	 border: 1px solid #ebedf0;
        }
         .inputGroup .custom-control-label:before {
        	 background-color: #3d86c6 !important;
        }
         .inputGroup .custom-control-label:after {
        	 background-color: #3d86c6 !important;
        }
         .inputGroup .custom-control-input:checked~.custom-control-label::before {
        	 color: #fff;
        	 border-color: #3d86c6 !important;
        	 background-color: #3d86c6 !important;
        }

        .alternativas {
        	 display: block;
        	 margin-top: 20px;
        }
         .alternativas .item {
        	 width: 100%;
        	 display: inline-block;
        	 margin-top: 0px;
        }
        .alternativas .form-check {
            display: block;
            min-height: 1.5rem;
            padding-left: 0 !important;
            margin-bottom: 0.125rem;
        }
         .alternativas .item input {
        	 opacity: 0;
        	 position: absolute;
        	 display: none;
        }
         .alternativas .item label {
        	 border: 1px solid #dadada;
        	 padding: 10px;
        	 border-radius: 6px;
        	 background: #fff;
        	 transition: 0.4s;
        	 width: 100%;
        }
         .alternativas .item label img {
        	 width: 100%;
        	 margin: 10px 0;
        }
         .alternativas .item label:hover {
        	 background: #eaeaea;
        }
         .alternativas .item input[type=radio]:checked + label {
        	 background: #333;
        	 border: 1px solid #333;
        	 color: #fff !important;
        }
         .alternativas .item input[type=radio]:checked + label p {
        	 color: #fff;
        }


      `}</style>
    </div>
  );
}

export default QuizResource;
