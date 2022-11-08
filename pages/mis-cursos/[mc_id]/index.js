import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Moment from 'react-moment';
import moment from 'moment';

import { Container, Row, Col, Badge, Button} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import styles from '../../../styles/Home.module.scss';
import variables from '../../../styles/variables.module.scss';
import LessonCard from '../../../components/curso/LessonCard';

import React, { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link'

export const getServerSideProps = async ({ params, req,res }) => {
    return { props: {}}
}

export default function MyCourseDetail(props) {
  props.onAuthenticationUser();
  props.isInfoComplete();  

  const router = useRouter();
  const [Temasobj, setTemasObj] = useState(null);
  const [TemasWeekobj, setTemasWeekObj] = useState(null);
  const [streamingLive, setstreamingLive] = useState(null);
  const [streamingAttendence, setStreamingAttendence] = useState(null);
  const [subjectsObj, setSubjectsObj] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [dateListObj, setDateListObj] = useState(null);

  const token = getCookie('cookie-usertoken');
  const useToken = `Bearer ${token}`
  const { mc_id } = router.query

  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setTemasObj(res.data))
          .catch(err => err)
  }

  const axiosWeekCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setTemasWeekObj(res.data))
          .catch(err => err)
  }

  const axioDatesCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setDateListObj(res.data))
          .catch(err => err)
  }

  const axiosStreamingLiveObj = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setstreamingLive(res.data))
          .catch(err => err)
  }

  const axiosStreamingAttendence = (url) => {
    axios.post(url, {"success":true}, { headers: { Authorization: useToken } })
          .then(res => setStreamingAttendence(res.data))
          .catch(err => err)
  }

  const axiosSubjectsObj = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setSubjectsObj(res.data))
          .catch(err => err)
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      const urlStreamingLive = `${process.env.API_URL}api/v1/ticourse/streamings-lives/?packcourse_pk=${mc_id}`
      const urlTemasWeek = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?packcourse_pk=${mc_id}&show_lessons=week`
      axiosWeekCourseObj(urlTemasWeek);
      const urlTemasDates = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?packcourse_pk=${mc_id}&show_lessons=dates`

      axioDatesCourseObj(urlTemasDates);


      axiosStreamingLiveObj(urlStreamingLive)
      const today = new Date();
      const year = today.getFullYear()
      const url_subjects = `${process.env.API_URL}api/v1/ticourse/subjects/?packcourse_pk=${mc_id}&year=${year}`
      axiosSubjectsObj(url_subjects)
    }
  }, [])

  const allTemas = () => {
    const urlTemas = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?packcourse_pk=${mc_id}`
    //const urlTemas = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?packcourse_pk=${mc_id}`
    axiosCourseObj(urlTemas);
  }  

  const allWeek = () => { 
    const urlTemasWeek = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?packcourse_pk=${mc_id}&show_lessons=week`
    axiosWeekCourseObj(urlTemasWeek);
  }

  const attendence = (streaming_id) => {
    const urlStreamingLive = `${process.env.API_URL}api/v1/ticlassapps/streamings/streaming-attendence/?streaming_pk=${streaming_id}`
    axiosStreamingAttendence(urlStreamingLive)
  }  

  const temas_obj = TemasWeekobj;

  const previousPage = (url) => {
    axiosCourseObj(url);

  }

  const nextPage = (url) => {
    axiosCourseObj(url);
  }

  const filterSubject = (subject_pk) => {
    const { mc_id } = router.query
    const urlTemas = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?packcourse_pk=${mc_id}&subject_pk=${subject_pk}`
    axiosCourseObj(urlTemas);
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = (e) => {
    e.preventDefault();
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const formatDate = (date) => {
    if (date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    } else {
      return null
    }
  }
  const handleChange = (e) => {
    setDatePickerVisibility(!isDatePickerVisible);    
    setStartDate(e);
    getDateOne(e)
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const getDateOne = (date) => {
    if (date) {
      const ndate = formatDate(date)
      const urlTemas = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?packcourse_pk=${mc_id}&show_lessons=filter-date&date=${ndate}`
      axiosCourseObj(urlTemas);
    }
    return date
  }

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <FontAwesomeIcon
    icon={faSortDown}
    style={{ fontSize: 14,}}                                
    className="example-custom-input" onClick={onClick} ref={ref}
    />            
  ));
  
  return (
    <div>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Home | Colegio</title>
          <meta name="description" content="description de my Colegio" />
          <meta property="og:site_name" content="Colegio.com" />
          <meta property="og:title" content="My Colegio" key="title" />
          <meta property="og:description" content="description de my Colegio" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.Colegio.com" />
          <meta property="og:image" content="img.jpeg" />

          <meta property="fb:app_id" content="111111111" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="My Colegio" />
          <meta property="twitter:site" content="@Colegio" />
          <meta property="twitter:creator" content="@Colegio" />
          <meta property="twitter:description" content="my Colegio" />
          <meta property="twitter:image" content="img.jpeg" />

          <link rel="canonical" href="https://www.colegio.com/" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='py-4'>
        <Container>
          <Row>
            <Col md="12">
              <div className='d-flex justify-content-end'>
                <div className='me-2'>Filtrar por Asignatura:</div>
                <br></br>
                <div>
                  <Badge className='me-1 roundedbtn' bg="dark" onClick={e => filterSubject(0)}>
                    <a>Todos</a>
                  </Badge>
                </div>
                {subjectsObj?.subjects?.map((item, index) => {
                  return(
                      <div key={index}>
                        <Badge className='me-1 roundedbtn' bg=""
                            style={{backgroundColor: item[2]}}
                            onClick={e => filterSubject(item[0])}><a>{item[1]}</a>
                        </Badge>
                      </div>
                    )
                })}
              </div>
            </Col>
            <Col md="12" className='mt-2'>
              <Link href={mc_id+"/listado-alumnos"}>
                <Button variant="outline-danger" className={'m-1 rounded roundedbtn '+styles['float-right']} type='submit'>Lista de alumnos</Button>
              </Link>
            </Col>
            {streamingLive && streamingLive.streamings != '' &&
            <Col>
              En vivo
              <Row>
                {streamingLive?.streamings?.map((item,index)=>{
                  return(
                    <Col md="4" className='mt-2' key={index}>
                      <div className="m-2" onClick={()=>{attendence(item.id)}}>
                        <LessonCard isLive={true} name={item.name} color={item?.subject_color_html} subject_name_abv={item?.subject_abv} files={item?.files}></LessonCard>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            }
            <Col md="12" className='my-4'>
              <div className='mb-2 d-flex'>
                <span className='me-2'>Filtrar por Fecha</span>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className='me-1'
                  style={{ fontSize: 14,}}
                />
                {formatDate(startDate)}                
                {/* {isDatePickerVisible && (
                  <DatePicker
                    locale="es" selected={startDate}
                    onChange={handleChange}
                    inline
                    includeDates={[...dateListObj?.results?.map(res=> (new Date(res.dates_data)))]}
                    />
                )} */}

                <div className='me-2'>
                  <DatePicker                  
                    selected={startDate}                  
                    onChange={handleChange}
                    withPortal  
                    customInput={<ExampleCustomInput />}
                    includeDates={dateListObj ? [...dateListObj?.results?.map(res=> (new Date(res.dates_data)))] : null}
                  />     
                </div>

              </div>
              <Tab.Container id="left-tabs-example" defaultActiveKey="weekClass">
                <Nav variant="pills" defaultActiveKey="weekClass">
                  <Nav.Item>
                    <Nav.Link className="me-4" eventKey="allClass" onClick={allTemas}>
                      <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className='me-1'
                      style={{ fontSize: 14,}}
                      />
                      Todas las clases
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="weekClass" onClick={allWeek}>
                      <FontAwesomeIcon
                      icon={faCalendar}
                      className='me-1'
                      style={{ fontSize: 14,}}
                      />
                      Clases de la semana
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="allClass">
                  <div className='m-4'>
                    <div className='text-center'>
                      <h3 className='mb-0'>Todas las clases</h3>
                    </div>
                  </div>
                  <Row>
                  {Temasobj?.results?.map((item,index) => {
                    if(item.streaming_datetime) {
                        return (
                          <Link href={`/mis-cursos/${item.packcourse.id}/clase/${item.id}`} key={index}>
                            <Col md="4" className='mt-4'>
                              <LessonCard is_time={true} date_time={item?.tema_data.streaming_datetime_format} bg="bg-green" color={item?.tema_data.color_html}
                                name={item?.tema_data.name} subject_name_abv={item?.tema_data.subject_name_abv}
                                />
                            </Col>
                          </Link>
                        )
                    } else {
                      return (
                        <Link href={`/mis-cursos/${item.packcourse.id}/clase/${item.id}`} key={index}>
                          <Col md="4" className='mt-4'>
                            <LessonCard is_time={false} date_time={null} bg="bg-green" color={item?.tema_data.color_html}
                              name={item?.tema_data.name} subject_name_abv={item?.tema_data.subject_name_abv}
                              />
                          </Col>
                        </Link>
                      )
                    }
                  })}
                  <Pagination>
                    {Temasobj?.previous
                      ?<Pagination.Prev onClick={e => previousPage(Temasobj?.previous)}/>
                      :<Pagination.Prev disabled/>
                    }
                    {Temasobj?.next
                      ?<Pagination.Next onClick={e => nextPage(Temasobj?.next)}/>
                      :<Pagination.Next disabled/>
                    }
                  </Pagination>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="weekClass">
                  <div className='m-4'>
                    <div className='text-center'>
                      <h3 className='mb-0'>Clases de la semana</h3>
                      <span className='small'>(Lunes a Viernes)</span>
                    </div>
                  </div>
                  <Row>
                  {TemasWeekobj?.results?.map((item,index) => {
                    if(item.streaming_datetime) {
                        return (
                          <Link href={`/mis-cursos/${item.packcourse.id}/clase/${item.id}`} key={index}>
                            <Col md="4" className='mt-4'>
                              <LessonCard is_time={true} date_time={item?.tema_data.streaming_datetime_format} bg="bg-green" color={item?.tema_data.color_html}
                                name={item?.tema_data.name} subject_name_abv={item?.tema_data.subject_name_abv}
                                />
                            </Col>
                          </Link>
                        )
                    } else {
                      return (
                        <Link href={`/mis-cursos/${item.packcourse.id}/clase/${item.id}`} key={index}>
                          <Col md="4" className='mt-4'>
                            <LessonCard is_time={false} date_time={null} bg="bg-green" color={item?.tema_data.color_html}
                              name={item?.tema_data.name} subject_name_abv={item?.tema_data.subject_name_abv}
                              />
                          </Col>
                        </Link>
                      )
                    }
                  })}
                  <Pagination>
                    {TemasWeekobj?.previous
                      ?<Pagination.Prev onClick={e => previousPage(TemasWeekobj?.previous)}/>
                      :<Pagination.Prev disabled/>
                    }
                    {TemasWeekobj?.next
                      ?<Pagination.Next onClick={e => nextPage(TemasWeekobj?.next)}/>
                      :<Pagination.Next disabled/>
                    }
                  </Pagination>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
            {/* <div className='d-flex'>
              <div> <Badge className='me-1' bg="dark"><a>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className='me-1'
                  style={{ fontSize: 14, color: "#fff"}}
                />
                Todas las clases
                </a></Badge></div>
              <div> <Badge className='me-1' bg="info"><a>
                <FontAwesomeIcon
                  icon={faCalendar}
                  className='me-1'
                  style={{ fontSize: 14, color: "#fff"}}
                />
                Clases de la semana
                </a></Badge></div>
            </div> */}
          </Row>
        </Container>
      </section>
      <style global jsx>{`
        .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
          background-color: #0dcaf0;
        }
        .nav-link {
          color: black;
      }
      `}</style>
    </div>
  )
}
