// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faYoutube } from '@fortawesome/free-brands-svg-icons';
// import { faFileAlt, faNewspaper, faQuestion } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'markdown-to-jsx';
import Nav from 'react-bootstrap/Nav';
import Ratio from 'react-bootstrap/Ratio';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import Avatar from 'react-avatar';

import styles from '../../../../../styles/Home.module.scss';
import variables from '../../../../../styles/variables.module.scss';

import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt, faFileAlt, faPlayCircle, faTicketAlt, faArrowLeftLong, faDownload } from '@fortawesome/free-solid-svg-icons';
import LessonCard from '../../../../../components/curso/LessonCard';
import { Container, Row, Col, Badge, Card, Button, ButtonGroup,Form, InputGroup } from 'react-bootstrap';
import CountDownTimer from '../../../../../components/curso/CountDownTimer';

import { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import parse from 'html-react-parser';

import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

import Vimeo from '@u-wave/react-vimeo';
import useSocket from "../../../../../hooks/useSocket";

export const getServerSideProps = async ({ params, req,res }) => {
  return { props: {}}
}

function LessonDetail(props) {
  props.onAuthenticationUser();
  props.isInfoComplete();

  const router = useRouter();
  const socket = useSocket();
  const [dataObj, setDataObj] = useState([]);
  const [dataObjList, setDataObjList] = useState([]);
  const [packCourseID, setPackCourseID] = useState([]);
  const [defaultActiveKey, setDefaultActiveKey] = useState('streaming');
  const [arrayRouterID, setArrayRouterID] = useState([]);
  const [countLineUser, setCountLineUser] = useState(0);

  const [courseTemaPk, setCourseTemaPk] = useState(0);

  //chat
  //const [messages, setDataChatList] = useState([]);
  const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState([]);

  const user_info = getCookie('user-info-basic');
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setDataObj(res.data))
          .catch(err => err)
  }

  const axiosCourseListObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setDataObjList(res.data))
          .catch(err => err)
  }

  const axiosChatData = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setMessages(res.data))
          .catch(err => err)
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      setPackCourseID(mc_id)
      const { c_id } = router.query
      setCourseTemaPk(c_id)
      const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/${mc_id}/?coursetema_pk=${c_id}&info=False`
      axiosCourseObj(urlCourses);
      const array = [mc_id]
      setArrayRouterID(array)
      const urlCoursesList = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/?coursetema_pk=${c_id}&info=False&lessons=True&packcourse_pk=${mc_id}&lesson_pk=${c_id}`
      axiosCourseListObj(urlCoursesList);

      const urlChatData = `${process.env.API_URL}api/v1/ticourse/coursetema-chat/?coursetema_pk=${c_id}`
      axiosChatData(urlChatData);
    }
  }, [router])

  //socket
  useEffect(() => {
		if (socket) {
      socket.emit('add-user', {'username':JSON.parse(user_info).username, 'coursetema_id':courseTemaPk, 'username_id':JSON.parse(user_info).id});

      socket.on('update-users', function(users) {
        const users_clone = []
        for (var i = 0; i < users.length; i++) {
          if (users[i].coursetema_id === courseTemaPk) {
            users_clone.push(users[i])
          }
        }
        setCountLineUser(users_clone.length)
    });

			socket.on("message.chat1", message => {
				setMessages(messages => [...messages, message]);
			});
		}
	}, [socket]);

  ///unmounted cuando se sale
  useEffect(() => {
    return () => {
      console.log('unmounted')
      if (socket) {
        socket.emit('delete-user', {'username':JSON.parse(user_info).username, 'coursetema_id':dataObj?.id, 'username_id':JSON.parse(user_info).id});
      }
    }
  }, [socket])

  const getVideoStreaming = (streaming) => {
    if (streaming?.code_video) {
      return (<Ratio aspectRatio="16x9">
              <Vimeo video={streaming?.code_video}
                onPause={handlePlayerPause}
                onPlay={handlePlayerPlay}
                onTimeUpdate={handleonTimeUpdate}
                onReady={handleonReady}
                onEnd={handleonEnd}
                paused={stateVimeo.paused}
                autoplay
                className="embed-responsive-item ratio ratio-16x9"
                height="450px" width="900px" frameBorder="0"
                webkitallowfullscreen mozallowfullscreen allowfullscreen/>
              </Ratio>)
      //return (<Ratio aspectRatio="16x9"><iframe id="player" src={`//player.vimeo.com/video/${streaming?.code_video}?api=1&amp;player_id=player-vimeo`} className="embed-responsive-item" height="450px" width="900px" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></Ratio>)
    } else {
      if (streaming?.iframe_video) {
        return (parse(''+streaming?.iframe_video))
      } else {
        return (
          <div className="text-center">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
          </div>
        )
      }

    }
  }


  const axiosPostObj= (url, data) => {
    axios.post(url, data, { headers: { Authorization: useToken } })
          .then(res => res.data)
          .catch(err => err)
    return null
  }

  const [stateVimeo, setStateVimeo] = useState({ videoIndex: 0, volume: 50, paused: false});
  const handlePlayerPause = (data, id) => {
    // mandar la info al backend
    let seconds = data.seconds
    let percent = data.percent
    let duration = data.duration
    const urlTrackingVideo = `${process.env.API_URL}api/v1/historyusers/`
    const data_tracking = {
      pack_pk:dataObj?.packcourse?.pack_id,
      course_pk:dataObj?.course_data?.id,
      temastreaming_pk:dataObj?.tema_data?.streaming.temastreaming_id,
      display: seconds
    }
    axiosPostObj(urlTrackingVideo, data_tracking)
    setStateVimeo({ paused: true });
  }
  const handlePlayerPlay = (data, id) => {
    setStateVimeo({ paused: false });
  }

  const handleonTimeUpdate = (data, id) => {
    // no lo ocuparemos
  }

  const handleonReady = (data, id) => {
    // cuando el video está listo para hacer play
    // console.log('handleonReady')
  }
  const handleonEnd = (data, id) => {
    // no lo ocuparemos
    console.log('handleonEnd')
  }

  const colorHtml = dataObj?.tema_data?.color_html ? dataObj?.tema_data?.color_html : `transparent`

  const handleSelect = (eventKey) => {
    setDefaultActiveKey(eventKey)
    setStateVimeo({ paused: true });
  };

  const previousPage = (url) => {
    axiosCourseListObj(url);

  }

  const nextPage = (url) => {
    axiosCourseListObj(url);
  }

  const axiosFunction = (formData, URL) => {

        const data = formData;
        const cookie_usertoken = getCookie('cookie-usertoken');
        const token = cookie_usertoken;
        const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
        const resAdminMaster = axios.post(URL, data,{ headers: { Authorization: useToken, "Content-Type":"multipart/form-data"} })
                            .then(res => res.data)
                            .catch(err => err)

  }


  const handleChatSubmit = async (event) => {
        event.preventDefault()
        const chat_msg = event.target.chat_msg.value

        const formData = new FormData();
        formData.append('chat_msg', chat_msg);
        //formData.append('course_pk', dataObj?.course_data?.id);
        formData.append('coursetema_pk', dataObj.id);

        const urlSendData = `${process.env.API_URL}api/v1/ticourse/coursetema-chat/`
        axiosFunction(formData, urlSendData)

        const user_name = JSON.parse(user_info).first_name ? `${JSON.parse(user_info).first_name} ${JSON.parse(user_info).last_name}` : JSON.parse(user_info).username
        const user_img_url = JSON.parse(user_info).avatar_url ? JSON.parse(user_info).avatar_url : ''

        socket &&
    			socket.emit("message.chat1", {
            user_name: user_name,
            user_img_url: user_img_url,
    				user_msg: chat_msg,
            user_date: new Date().getTime(),

    			});
  }

  return (
    <section className='section' >
      <Container className='pt-4'>
        <Tab.Container id="left-tabs-example" activeKey={defaultActiveKey}>
          <Row>
            <Col md="1">
              <Link key={1} href={`/mis-cursos/${arrayRouterID[0]}`}>
                <Button variant="primary" className="roundedbtn"
                style={{backgroundColor: colorHtml, borderColor: colorHtml}}>
                <FontAwesomeIcon
                  icon={faArrowLeftLong}
                  className='me-1'
                  style={{ fontSize: 30 ,color:'fff', marginLeft:'3px',width: 30}}
                />
                </Button>
              </Link>
            </Col>
            <Col md="10" className="d-flex align-items-center">
              <Nav variant="pills" activeKey={defaultActiveKey} onSelect={handleSelect}>
                <Nav.Item><Nav.Link eventKey="streaming" >Streaming</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="task" >Tareas</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="guides" >Guías</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="info" >Info</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="class" >Clases</Nav.Link></Nav.Item>
              </Nav>
            </Col>
            <Col md="12">
              <Tab.Content>
                <Tab.Pane eventKey="streaming">
                  <div className='alert-info mt-2'>
                    {dataObj.tema_data?.streaming?.status != 'coming-soon' ?
                    <div></div> :
                    <CountDownTimer targetDate={dataObj.tema_data?.streaming.datetime_comming_soon} />
                  }
                  </div>
                  <Row>
                    <Col md="8" className='mt-2'>
                      <Card className={'mb-4 '+styles['shadow-sm']+' '+styles['roundedbtn'] }>
                        <div className="embed-responsive embed-responsive-16by9 iframe_class">
                        {getVideoStreaming(dataObj?.tema_data?.streaming)}
                        </div>
                        <Card.Body>
                          <Row>
                            <Col md="8">
                              <h4>{dataObj.tema_data?.name}</h4>
                            </Col>
                            <Col md="12" className={'btn-group '+styles['float-right']}>
                              {dataObj?.tema_data?.streaming?.files?
                                <Row className='p-0' style={{width:'100%;'}}>
                                    <Col md="12" className='p-0 mb-1'>
                                      <div style={{ width:'100%'}} className='d-flex align-items-center justify-content-center'>
                                        {dataObj?.tema_data?.streaming?.files?.map((file, index) => {
                                          return(
                                            <div key={index} className='m-2'>
                                              <Button href={file.file_url} download
                                              className={ styles['roundedbtn']} bg="" style={{width:'100%;', background:'#00cac9;', border:'3px solid #fff;'}}>
                                                <FontAwesomeIcon
                                                  icon={faDownload}
                                                  className='me-1'
                                                  style={{ fontSize: 14,}}
                                                  /> {file.file_name}
                                              </Button>
                                            </div>
                                          )
                                        })
                                        }
                                      </div>
                                    </Col>
                                  </Row>  : <div></div>
                                }
                            </Col>
                            <Col md="12">
                              {dataObj?.tema_data?.exit_ticket ?
                                  <div style={{ width:'100%'}} className='d-flex justify-content-end m-2'>
                                    <Button className={ styles['roundedbtn']} href={dataObj.tema_data?.exit_ticket} target='_blank'
                                    variant="danger" style={{width:'100%;', border: '3px solid #fff;'}}>
                                      <FontAwesomeIcon
                                        className='me-1'
                                        icon={faTicketAlt}
                                        style={{ fontSize: 14, color:'fff',background: 'red'}}
                                        />
                                        Ticket de salida
                                    </Button>
                                  </div>
                                : <div></div>
                              }
                            </Col>

                            <Col md="12">
                            {dataObj?.tema_data?.description ?
                            <Markdown>{dataObj?.tema_data?.description}</Markdown>
                            : <div></div>}
                            </Col>
                            <Col md="12" className='d-flex justify-content-between align-items-center'>
                              <ButtonGroup aria-label="Basic example">
                                <span>
                                  <Badge className='me-1' bg="success"><a>
                                    <FontAwesomeIcon
                                    icon={faPlayCircle}
                                    className='me-1'
                                    style={{ fontSize: 14, }}
                                    />
                                    Viendo</a>
                                  </Badge>
                                </span>
                              </ButtonGroup>
                              <div>
                                <small className='text-muted'>0 semanas, 4 días</small>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="4" className='mt-2'>
                      <Card className={styles['roundedbtn']}>
                        <div className='chat' style={{background:colorHtml}}>
                          <h4 className='text-center'>Foro (en line: {countLineUser})</h4>
                        </div>
                        <Card.Body>
                          <div className='caja'>
                            <div className='conversa'></div>
                            <div className='comments'>
                              <div className='dummy'></div>
                              <div className='panel-chats cont-comments'>
                                <ul id='chat-talk'>
                                {messages?.map((msg, index) => (
                                  <li key={index}>
                                      <Avatar name={msg.user_name} size="30" key={index}
                                        round={true}
                                        src={msg.user_img_url}/>
                                      <strong>{msg.user_name}:</strong>
                                      <span className="coment-chat">{msg.user_msg}</span>
                                      <span className="hora">{msg.user_date}</span>
                                  </li>
                        				))}

                                </ul>
                              </div>
                            </div>
                          </div>
                          </Card.Body>
                          <div className='dkk'>
                            <Form className='formchat' onSubmit={handleChatSubmit}>
                              <Form.Group className="mb-3" controlId="chat_msg">
                                <Form.Control as="textarea" rows={3}
                                  placeholder="Ingresa un mensaje" name="chat_msg" />
                              </Form.Group>
                              <Button variant="success" type="submit" className="mt-4" size="lg">Enviar</Button>

                            </Form>
                          </div>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="task">
                  <Row>
                    <Col md="3">
                    {dataObj.tema_data?.learningunits?.map((task, index) => (
                      // <Link key={index} href={`/mis-cursos/${tema.packcourse.id}/clase/${tema.id}/ua/${task.id}`}>
                      <Link key={index} href={`/mis-cursos/${dataObj.packcourse.id}/clase/${dataObj.id}/ua/${task.id}`}>
                        <Card className={'hand-click mt-4 mb-4 '+styles["shadow-sm"]+ ' '+styles["roundedbtn"]}>
                          <Card.Body>
                            <h4>{task?.name}</h4>
                          </Card.Body>
                        </Card>
                      </Link>
                    ))}
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="guides">
                  <Row>
                    {dataObj.tema_data?.guides.map((guide, index) => (
                      <Col md="3" key={index}>
                        {guide?.files.map((file, _index) => (
                          <a key={_index} target="_blank" href={`${file.file_url}`} rel="noopener noreferrer">
                            <Card className={'mt-4 mb-4 '+styles["shadow-sm"]+ ' '+styles["roundedbtn"]}>
                              <Card.Body>
                                <h4>{file.file_name}</h4>
                                <FontAwesomeIcon
                                  icon={faCloudDownloadAlt}
                                  className='me-1'
                                  style={{ fontSize: 14,}}
                                  />
                              </Card.Body>
                            </Card>
                          </a>
                        ))}
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="info">
                  <Row>
                    <Col md="8">
                      <Card className={'mt-4 mb-4 '+styles["shadow-sm"]+ ' '+styles["roundedbtn"]}>
                        <Card.Body>
                          <Card.Text>{dataObj.tema_data?.streaming?.description}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="class">
                  <Row>
                  {dataObjList?.results?.map((item,index) => {
                    if(item.tema_data.streaming_datetime) {
                        return (
                          <Link href={`/mis-cursos/${packCourseID}/clase/${item.tema_data.id}`} key={index}>
                            <Col md="4" className='mt-4' onClick={e => handleSelect('streaming')}>
                              <LessonCard  is_time={true} date_time={item.tema_data.streaming_datetime_format} bg="bg-green" color={item.tema_data.color_html}
                                name={item.tema_data.name} subject_name_abv={item.tema_data.subject_name_abv}
                                />
                            </Col>
                          </Link>
                        )
                    } else {
                      return (
                        <Link href={`/mis-cursos/${packCourseID}/clase/${item.tema_data.id}`} key={index}>
                          <Col md="4" className='mt-4' onClick={e => handleSelect('streaming')}>
                            <LessonCard  is_time={false} date_time={null} bg="bg-green" color={item.tema_data.color_html}
                              name={item.tema_data.name} subject_name_abv={item.tema_data.subject_name_abv}
                              />
                          </Col>
                        </Link>
                      )
                    }
                  })}
                  </Row>
                  <Pagination>
                    {dataObjList?.previous
                      ?<Pagination.Prev onClick={e => previousPage(dataObjList?.previous)}/>
                      :<Pagination.Prev disabled/>
                    }
                    {dataObjList?.next
                      ?<Pagination.Next onClick={e => nextPage(dataObjList?.next)}/>
                      :<Pagination.Next disabled/>
                    }

                  </Pagination>
                </Tab.Pane>
              </Tab.Content>
            </Col>

          </Row>

        </Tab.Container>
      </Container>
      <style global jsx>{`
        #chat-talk li {
            padding: 5px 15px;
            border-radius: 6px;
            background: #dbf1ff;
            margin-bottom: 5px;
            position: relative;
            color: #677b79;
            display: table;
            clear: both;
            min-height: 62px;
            border-radius: 28px !important;
        }
        #chat-talk li:nth-child(odd) {
            background: #a9dcfd;
            color: #7f6e70;
        }
        .panel-chats.cont-comments {
          height: 345px !important;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        .avatar-chat {
            position: absolute;
            left: 0;
            margin-left: -40px;
            width: 26px;
            height: 26px;
            border: 2px solid rgba(212, 222, 192, 0.6);
            border-radius: 50%;
            display: block;
            margin-top: 15px;
        }
        .coment-chat {
            width: 100%;
            clear: both;
            display: block;
            margin-top: -5px;
            line-height: 15px;
        }
        .hora {
            text-align: right;
            font-size: 11px;
            opacity: 0.6;
            margin-top: 10px;
        }
        .embed-responsive-16by9 {
            border-radius: 20px !important;
            border-bottom-right-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
        }
        .embed-responsive {
            position: relative;
            display: block;
            width: 100%;
            padding: 0;
            overflow: hidden;
        }
        .nav-link {
          color: ${colorHtml};
          transition: color .0s ease-in-out,background-color .0s ease-in-out,border-color .0s ease-in-out;
        }
        .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
          color: #fff;
          background-color: ${colorHtml};
          border-radius: 20px !important;
        }
        .alert-info {
          color: #0c5460;
          background-color: #d1ecf1;
          border-color: #bee5eb;
        }
        .cuenta {
          display: flex;
          justify-content: center;
          margin-bottom: 100px;
        }
        .simple-section {
          width: 74px !important;
          height: 74px !important;
          text-align: center;
        }
        .simple-section {
          width: 74px !important;
          height: 74px !important;
          background: #fff;
          margin: 0 20px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          background-color: #fff;
        }
        .card .chat {
          background: ${colorHtml};
          border-radius: 20px 20px 0 0;
        }
        .chat h4{
          padding: 10px 10px 5px 10px;
          color: #fff;
        }
        .caja {
          margin-top: 10px;
        }
        .box-chat{
          padding-top: 15px;
          background: ${colorHtml};
        }
      `}</style>

    </section>
  );
}

export default LessonDetail;
