import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import variables from '../styles/variables.module.scss';

import Image from 'next/image'
import CourseCard from '../components/landing/CourseCard';
import LadingLogin from '../components/landing/LadingLogin';
import { Container, Row, Col, Carousel, Button, Card, Accordion} from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';

import axios from 'axios';
import { getCookie} from 'cookies-next';
import { useEffect, useState} from 'react';
import TestimonialCard from '../components/landing/TestimonialCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { getLogo, getClassLanding } from '../methods/getLogoClass';

function fetchFactAxios(url, useToken) {
    return axios
        .get(url, { headers: { Authorization: useToken } })
        .then((res) => {
            return res.data;
        })
        .catch(err => err);
}

function fetchFact(url, useToken) {
    return fetch(url, {
            method: "GET",
            headers: useToken,
        })
        .then((response) => response.json())
        .then((data) => {
        });
}



export const getServerSideProps = async ({ params, req,res }) => {
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

export default function Home(props) {
  props.onAuthenticationUser();
  props.onImgLogo(props.imgLogo);
  const [LandingObj, setLandingObj] = useState([]);
  const [CoursesObj, setCoursesObj] = useState([]);
  const [landingTestimoniosObj, setLandingTestimoniosObj] = useState([]);
  const [pregFrecObj, setPregFrecObj] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

  const [seoObj, setSeoObj] = useState(null);
  const token = getCookie('cookie-usertoken');

  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  //const useToken = `Token ${process.env.TOKEN_GENERIC_API}`
  const urlCourses = `${process.env.API_URL}api/v1/ticourse/?proyect_name=${props.subdomain}`
  const urlLanding = `${process.env.API_URL}api/v1/tiproyects/landing/?proyect_name=${props.subdomain}`
  const urlLandingTestimonios = `${process.env.API_URL}api/v1/tiproyects/landing/?proyect_name=${props.subdomain}&kind=testimonials`
  const axiosLandingObj = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setLandingObj(res.data))
          .catch(err => err)
  }

  const axiosLandingTestimoniosObj = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setLandingTestimoniosObj(res.data))
          .catch(err => err)
  }

  const userAuthentications = props.userAuthentications
  const imgLogo = props.imgLogo
  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setCoursesObj(res.data))
          .catch(err => err)
  }

  const pregFrecJson = [
    {
      title: "Cómo me inscribo a los exámenes libres",
      description:`
      <ul>
        <li>Si eres mayor de 18 años puedes inscribirte <a target="_blank" class="m-1 rounded btn btn-danger" href="https://www.chileatiende.gob.cl/fichas/2230-examenes-libres-para-mayores-de-18-anos">aquí</a></li>
        <li>Si eres menor de 18 años puedes inscribirte <a target="_blank" class="m-1 rounded btn btn-danger" href="https://www.chileatiende.gob.cl/fichas/11088-examenes-libres-para-menores-de-18-anos">aquí</a></li>
      </ul>`
    },
    {
      title: "¿Cuáles son las fechas para realizar la inscripción y la rendición de los exámenes libres?",
      description:"<ul><li>Inscripción (todos los cursos): desde Abril hasta Mayo.</li> <li>Rendición de exámenes (todos los cursos): Junio.</li></ul>"
    },
    {
      title: "¿Pagando el curso online me aseguro la aprobación del examen?",
      description:"falta info"
    },
    {
      title: "¿La rendición del examen es online o presencial?",
      description:"falta info"
    },
    {
      title: "¿Cuándo comienzan las clases?",
      description:"falta info"
    },
    {
      title: "¿El curso cubre el temario del MINEDUC?",
      description:"falta info"
    }
    ,
    {
      title: "¿Puedo pagar en cuotas?",
      description:"falta info"
    },
    {
      title: "¿Cómo funcionan los exámenes libres?",
      description:"falta info"
    }
    ,
    {
      title: "¿Es un colegio reconocido por el MINEDUC?",
      description:"falta info"
    }
  ]

  useEffect(() => {
    axiosLandingObj(urlLanding);
    axiosLandingTestimoniosObj(urlLandingTestimonios);
    axiosCourseObj(urlCourses);
  }, [])

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
      <section id="myCarousel" className={`landing-home ${props.classLanding} slide p-0`}>
        <Row className='m-0'>
          <Col lg="7" md="12" xs="12">
            <Carousel variant="dark">
            {LandingObj.proyect_landing_slides?.map(pls => (
            <Carousel.Item key={pls.id}>
              <Carousel.Caption>
                <h3 style={{color: variables.primaryColor}}>{pls.title}</h3>
                <p style={{color: variables.primaryColor}}>{pls.text}</p>
                <a className={ 'btn float-right btn-red ' + styles["roundedbtn"]} style={{background: variables.tertiaryColor}}>Contratar</a>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
            </Carousel>
          </Col>
          <Col lg="5" className="d-none d-xl-block d-lg-block d-md-block d-sm-none" style={{padding:"100px 0 0 0"}}>
            <LadingLogin size="8" shadow={true} onAuthenticationUser={props.onAuthenticationUser} userAuthentications={userAuthentications}/>
          </Col>
        </Row>
      </section>
      <section id="section_2" className='pt-2' style={{ background: "#f8f7ff"}}>
        <Container>
          <h2 className="text-center">Cursos</h2>
          <Row>
            {CoursesObj.results?.map(pack => (
              <Col lg="4" md="6" sm="12" xs="12" key={pack.id}>
                <CourseCard
                is_price={true}
                name={pack.name}
                desc={pack.description}
                subscription_set={pack.subscription_set}
                pack_id={pack.id}
                image={pack.image}
                />
              </Col>
            ))}
          </Row>
        </Container>
        <section style={{background:'white'}}>
          <Container>
            <Row>
              <div className='text-center mt-4'>
                <h2>Testimonios</h2>
                <span>Nuestros estudiantes</span>
              </div>
              <Row className='mt-4'>
              {landingTestimoniosObj?.testimonials?.map((item,index)=>{
                return(<Col lg="4" md='6' xs="12" key={index}><TestimonialCard item={item}></TestimonialCard></Col>)
              })}
              </Row>
              <div className='d-flex justify-content-center'>
                <Button className={ 'mb-4 btn ' + styles["roundedbtn"]} style={{background: '#00cac9', border:'1px solid #00cac9'}}>Más Testimonios</Button>
              </div>
            </Row>
          </Container>
        </section>
        <section className='p-4' style={{background:'#eb4856'}}>
          <Container>
            <Row>
              <Col md="12">
                <div className='mt-4 mb-4 text-center'>
                  <h2 className='text-white'>Nuestra Metodología</h2>
                  <span>Así hacemos las cosas</span>
                </div>
                <Row className='mb-4'>
                  <Col lg="3" md="6" className='mb-2'>
                    <Card className={styles["roundedbtn"]}>
                      <Card.Body>
                        <Image src="/logos/img/flip.svg" alt="Flip" width={110} height={110} className={styles["logo-login"]} />
                        <div className='text-center mt-4'>
                          <h5>Flip learning</h5>
                          <p>
                            Nuestra exitosa metodología mezcla momentos de aprendizaje autónomo antes de cada clase, que se desarrollan de forma guiada en la plataforma, más clases en vivo donde se profundiza y resuelven dudas con profesores y los
                            demás estudiantes.
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" className='mb-2'>
                  <Card className={styles["roundedbtn"]}>
                      <Card.Body>
                        <Image src="/logos/img/autonomo.svg" alt="Autonomo" width={110} height={110} className={styles["logo-login"]} />
                        <div className='text-center mt-4'>
                          <h5>Aprendizaje autónomo</h5>
                          <p>
                            Fomentamos desde el día 0 la autonomía del estudiante y la gestión del tiempo para una óptima experiencia de educación online que le servirá para el resto de la vida.
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" className='mb-2'>
                  <Card className={styles["roundedbtn"]}>
                      <Card.Body>
                        <Image src="/logos/img/comunidad.svg" alt="Comunidad" width={110} height={110} className={styles["logo-login"]} />
                        <div className='text-center mt-4'>
                          <h5>Comunidad de aprendizaje</h5>
                          <p>
                            Es el corazón de TIClass, con ello buscamos mejorar el aprendizaje y la convivencia de todas y todos los estudiantes, basado en el Aprendizaje Dialógico.
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="3" md="6" className='mb-2'>
                  <Card className={styles["roundedbtn"]}>
                      <Card.Body>
                        <Image src="/logos/img/pensamiento.svg" alt="Pensamiento" width={110} height={110} className={styles["logo-login"]} />
                        <div className='text-center mt-4'>
                          <h5>Desarrollo de Competencias</h5>
                          <p>
                            Somos el único preuniversitario con clases, guías y talleres exclusivos para el desarrollo de Competencias matemáticas, de lectura y científicas. Estas preguntas son el 100% de la prueba.
                          </p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section style={{background:'white'}}>
          <Container>
            <Row>
              <Col md="12">
                <div className='mt-4 mb-4 text-center'>
                  <h2 style={{color:'#ed3b46'}}>Hablan de nosotros</h2>
                  <span>Lo que dicen los medios de nosotros</span>
                </div>
                <Row>
                  <Col md="4">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href='https://www.youtube.com/watch?v=vLjYGykPb3s' target='_blank'>
                        <Image src="/landing/img/chv.png" alt="" width={102} height={84} />
                      </a>
                      <h5 className='my-4'>Chilevisión Noticias</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="http://www.lun.com:9999/lunmobile//pages/NewsDetailMobile.aspx?IsNPHR=1&dt=2021-02-21&NewsID=0&BodyId=0&PaginaID=11&Name=11&PagNum=1&SupplementId=0&Anchor=20210221_11_0_0" target="_blank">
                        <Image src="/landing/img/lun.jpg" alt="" width={103} height={103} />
                      </a>
                      <h5 className='my-4'>Las Últimas Noticias</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.lanacion.cl/estoy-a-tiempo-de-preparar-una-buena-psu/" target="_blank">
                        <Image src="/landing/img/la-nacion.png" alt="" width={103} height={11} />
                      </a>
                      <h5 className='my-4'>La Nación</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://portal.nexnews.cl/showN?valor=MTU2NVQ0NTY1STQ0NTgwNjk4MzY3ODI3Mzg0NjU0NTQ5NTc1NDUwNTQ1NTUwNTE0NTY2NzE0NTQ4VTQ0NDQ0NDQ0NDQ0NDQ=" target="_blank">
                        <Image src="/landing/img/el-mercurio.png" alt="" width={103} height={37} />
                      </a>
                      <h5 className='my-4'>El Mercurio</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                        <Image src="/landing/img/publimetro.png" alt="" width={103} height={62} />
                      </a>
                      <h5 className='my-4'>Publimetro</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section style={{background:'white'}}>
          <Container>
            <Row >
              <Col md="12" className='mt-4'>
                <div className='mt-4 mb-4 text-center'>
                  <h2 style={{color:'#ed3b46'}}>Confían en nosotros</h2>
                  <span><b>Instituciones educativas</b></span>
                </div>
                <Row>
                  <Col md="3">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                        <Image src="/landing/img/ucen.png" alt="" width={96} height={32}/>
                      </a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                        <Image src="/landing/img/tesla.png" alt="" width={96} height={43}/>
                      </a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                        <Image src="/landing/img/oci.png" alt="" width={96} height={22}/>
                      </a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                        <Image src="/landing/img/servlet.png" alt="" width={96} height={46}/>
                      </a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                        <Image src="/landing/img/cole-abs.png" alt="" width={96} height={116}/>
                      </a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md="3">
                    <Card style={{border: "0"}}>
                      <Card.Body className='text-center'>
                      <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                        <Image src="/landing/img/coleg01.png" alt="" width={96} height={96}/>
                      </a>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <div className='mt-4 text-center'>
                  <span><b>Nos apoyan</b></span>
                  <Row className='pb-4'>
                    <Col md="3">
                      <Card style={{border: "0"}}>
                        <Card.Body className='text-center'>
                        <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                          <Image src="/landing/img/corfo.png" alt="" width={96} height={37}/>
                        </a>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card style={{border: "0"}}>
                        <Card.Body className='text-center'>
                        <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                          <Image src="/landing/img/gob-b.png" alt="" width={96} height={96}/>
                        </a>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card style={{border: "0"}}>
                        <Card.Body className='text-center'>
                        <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                          <Image src="/landing/img/microsoft.png" alt="" width={96} height={20}/>
                        </a>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card style={{border: "0"}}>
                        <Card.Body className='text-center'>
                        <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                          <Image src="/landing/img/imaginelab.png" alt="" width={96} height={56}/>
                        </a>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card style={{border: "0"}}>
                        <Card.Body className='text-center'>
                        <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                          <Image src="/landing/img/socialab.png" alt="" width={96} height={19}/>
                        </a>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md="3">
                      <Card style={{border: "0"}}>
                        <Card.Body className='text-center'>
                        <a href="https://www.publimetro.cl/cl/noticias/2017/08/07/ti-class.html?outputType=amp" target="_blank">
                          <Image src="/landing/img/samsung.png" alt="" width={96} height={34}/>
                        </a>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section style={{background:'#eef4f9'}} id="equipo" >
          <Container>
            <Row className='d-flex justify-content-center'>
              <Col md="8">
                  <Card className={'mt-5 border-0 '+ styles["shadow-sm"]+' '+ styles["roundedbtn"]} style={{background: '#fff'}}>
                    <Card.Body className='text-center'>
                      <h2 style={{color:'#ed3b46'}}>TIClass nació en el 2016</h2>
                      <br></br>
                      <p className='mb-5'>
                      con el propósito de disminuir la deserción universitaria y generar oportunidades a las personas que quieren entrar a la universidad mediante educación de alta calidad y bajo costo. Para esto mezclamos lo mejor de la tecnología
                      existente (TIC) con innovadoras metodologías de aprendizaje (CLASS). TIClass es tecnología y educación al servicio del aprendizaje de las personas. ¡Somos TIClass, el puente entre la escuela y la universidad!.
                      </p>
                    </Card.Body>
                  </Card>
              </Col>
              <Col md="12" className='mt-4 mb-4 pb-4'>
                <Row>
                  <Col lg="4" md="6" className='p-2'>
                    <Card className={'mt-5 border-0 '+ styles["shadow-sm"]+' '+ styles["roundedbtn"]} style={{background: '#fff'}}>
                      <Card.Body>
                        <div className='text-center'>
                          <Image src="/landing/equipo/profe-1.svg" alt="VERÓNICA SALDAÑA" width={110} height={110} />
                        </div>
                        <div >
                          <ul className='d-flex justify-content-center' style={{listStyleType: 'none', marginRight:'40px'}}>
                            <li>
                              <a href="https://www.instagram.com/ticlasscom" target="_blank">
                              <FontAwesomeIcon
                                icon={faInstagram}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.facebook.com/ticlasscom/"  target="_blank">
                              <FontAwesomeIcon
                                icon={faFacebook}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitter.com/ticlasscom/" target="_blank">
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                          </ul>
                          <div className='text-center'>
                          <strong>VERÓNICA SALDAÑA</strong>
                            <br></br>
                            Profesora de matemática y física de la Universidad de Chile. Diplomada en currículum y evaluación. Profesora de programación en Desafío Latam.
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="4" md="6" className='p-2'>
                    <Card className={'mt-5 border-0 '+ styles["shadow-sm"]+' '+ styles["roundedbtn"]} style={{background: '#fff'}}>
                      <Card.Body>
                        <div className='text-center'>
                          <Image src="/landing/equipo/profe-2.svg" alt="FRANCISCA MELGAREJO" width={110} height={110} />
                        </div>
                        <div >
                          <ul className='d-flex justify-content-center' style={{listStyleType: 'none', marginRight:'40px'}}>
                            <li>
                              <a href="https://www.instagram.com/ticlasscom" target="_blank">
                              <FontAwesomeIcon
                                icon={faInstagram}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.facebook.com/ticlasscom/"  target="_blank">
                              <FontAwesomeIcon
                                icon={faFacebook}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitter.com/ticlasscom/" target="_blank">
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                          </ul>
                          <div className='text-center'>
                          <strong>FRANCISCA MELGAREJO</strong>
                            <br></br>
                            Profesora de Lengua y Literatura de la Universidad Alberto Hurtado. Cuenta con más de 5 años de experiencia en preuniversitario online TIClass y en escuelas.
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="4" md="6" className='p-2'>
                    <Card className={'mt-5 border-0 '+ styles["shadow-sm"]+' '+ styles["roundedbtn"]} style={{background: '#fff'}}>
                      <Card.Body>
                        <div className='text-center'>
                          <Image src="/landing/equipo/profe-3.svg" alt="MELISSA MONDACA" width={110} height={110} />
                        </div>
                        <div >
                          <ul className='d-flex justify-content-center' style={{listStyleType: 'none', marginRight:'40px'}}>
                            <li>
                              <a href="https://www.instagram.com/ticlasscom" target="_blank">
                              <FontAwesomeIcon
                                icon={faInstagram}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.facebook.com/ticlasscom/"  target="_blank">
                              <FontAwesomeIcon
                                icon={faFacebook}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitter.com/ticlasscom/" target="_blank">
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                          </ul>
                          <div className='text-center'>
                          <strong>MELISSA MONDACA</strong>
                            <br></br>
                            Profesora de Historia y Geografía de la Universidad Cardenal Silva Henriquez. Cuenta con más de 4 años de experiencia en preuniversitario online TIClass, y más de 10 en preparación PSU. Es Magister en educación.
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="4" md="6" className='p-2'>
                    <Card className={'mt-5 border-0 '+ styles["shadow-sm"]+' '+ styles["roundedbtn"]} style={{background: '#fff'}}>
                      <Card.Body>
                        <div className='text-center'>
                          <Image src="/landing/equipo/profe-5.svg" alt="IGNACIA ROCUANT" width={110} height={110} />
                        </div>
                        <div >
                          <ul className='d-flex justify-content-center' style={{listStyleType: 'none', marginRight:'40px'}}>
                            <li>
                              <a href="https://www.instagram.com/ticlasscom" target="_blank">
                              <FontAwesomeIcon
                                icon={faInstagram}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.facebook.com/ticlasscom/"  target="_blank">
                              <FontAwesomeIcon
                                icon={faFacebook}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitter.com/ticlasscom/" target="_blank">
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                          </ul>
                          <div className='text-center'>
                          <strong>IGNACIA ROCUANT</strong>
                            <br></br>
                            Profesora de Biología de la UAH y bióloga de la Pontificia Universidad Católica. Destacada participante de EducarChile. Cuenta con más de 5 años de experiencia en educación online.
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="4" md="6" className='p-2'>
                    <Card className={'mt-5 border-0 '+ styles["shadow-sm"]+' '+ styles["roundedbtn"]} style={{background: '#fff'}}>
                      <Card.Body>
                        <div className='text-center'>
                          <Image src="/landing/equipo/nico.svg" alt="NICOLÁS MELGAREJO" width={110} height={110} />
                        </div>
                        <div >
                          <ul className='d-flex justify-content-center' style={{listStyleType: 'none', marginRight:'40px'}}>
                            <li>
                              <a href="https://www.instagram.com/naseroc" target="_blank">
                              <FontAwesomeIcon
                                icon={faInstagram}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.facebook.com/ProfeNicoMelgarejo/"   target="_blank">
                              <FontAwesomeIcon
                                icon={faFacebook}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitter.com/naseroc/" target="_blank">
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className='me-2'
                                style={{ fontSize: 14, color:'#999'}}
                              />
                              </a>
                            </li>
                          </ul>
                          <div className='text-center'>
                          <strong>NICOLÁS MELGAREJO</strong>
                            <br></br>
                            Profesor de Matemática y Física de la Universidad de Chile. Diplomado en emprendimiento e innovación educativa de la UDP. Cofundador de TIClass, el preuniversitario online.
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg="4" md="6" className='p-2'>
                  <Card className={'mt-5 border-0 '+ styles["shadow-sm"]+' '+ styles["roundedbtn"]} style={{background: '#fff'}}>
                    <Card.Body>
                      <div className='text-center'>
                        <Image src="/landing/equipo/profe-4.svg" alt="PATRICIO ROMÁN" width={110} height={110} />
                      </div>
                      <div >
                        <ul className='d-flex justify-content-center' style={{listStyleType: 'none', marginRight:'40px'}}>
                          <li>
                            <a href="https://www.instagram.com/ticlasscom" target="_blank">
                            <FontAwesomeIcon
                              icon={faInstagram}
                              className='me-2'
                              style={{ fontSize: 14, color:'#999'}}
                            />
                            </a>
                          </li>
                          <li>
                            <a href="https://www.facebook.com/ticlasscom/"  target="_blank">
                            <FontAwesomeIcon
                              icon={faFacebook}
                              className='me-2'
                              style={{ fontSize: 14, color:'#999'}}
                            />
                            </a>
                          </li>
                          <li>
                            <a href="https://www.twitter.com/ticlasscom/" target="_blank">
                            <FontAwesomeIcon
                              icon={faTwitter}
                              className='me-2'
                              style={{ fontSize: 14, color:'#999'}}
                            />
                            </a>
                          </li>
                        </ul>
                        <div className='text-center'>
                        <strong>PATRICIO ROMÁN</strong>
                          <br></br>
                          Licenciado en Ciencias mención biología de la Universidad de Chile. Cuenta con más de 4 años de experiencia en preuniversitario online TIClass, además de clases particulares de preparación PSU.
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section style={{background:'#ffc200'}}>
          <Container className='pb-4'>
            <div className='mt-4 mb-4 text-center'>
              <h2 className='text-white pt-4'>Preguntas Frecuentes</h2>
            </div>
            <Accordion defaultActiveKey="0">
            {pregFrecJson.map((item,index)=>{
              return(<Accordion.Item eventKey={index}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                </Accordion.Body>
              </Accordion.Item>)
            })}
            </Accordion>

          </Container>
        </section>

        <footer style={{background:'white'}}>
          <Container>
            <Row className='p-4'>
              <Col md="4" >
                <Image src={props.imgLogo} alt="PATRICIO ROMÁN" width={200} height={110} />
                <hr></hr>
                <ul className='d-flex justify-content-start p-0' style={{listStyleType: 'none'}}>
                  <li>
                    <a href="https://www.youtube.com/channel/UCzXXYamApODD2VFlJzyRiuQ" target="_blank">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className='me-2'
                        style={{ fontSize: '2em', color:'#999'}}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/ticlasscom/" target="_blank">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className='me-2'
                        style={{ fontSize: '2em', color:'#999'}}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/ticlasscom" target="_blank">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className='me-2'
                        style={{ fontSize: '2em', color:'#999'}}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/ticlass" target="_blank">
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className='me-2'
                        style={{ fontSize: '2em', color:'#999'}}
                      />
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md="4">
              <ul className=' p-0' style={{listStyleType: 'none'}}>
                  <li>
                    <a href="#equipo">
                      ¿Qué es TIClass?
                    </a>
                  </li>
                  <li>
                    <a href="#section_2">
                      ¿Qué ofrecemos?
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/ticlass" target="_blank">
                      Contacto
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>
      </section>
      <style global jsx>{`
        .slide {
          height: 500px;
        }
        .landing-home-colegio {
          background-color: #fff;
          background-image: url(/landing/img/fondo_slide_colegio.svg);
          background-repeat: no-repeat;
          background-size: cover;
          background-position-y: -200px;
        }
        .landing-home-cursos {
          background-color: #fff;
          background-image: url(/landing/img/fondo_slide_cursos.png);
          background-repeat: no-repeat;
          background-size: cover;
          background-position-y: -200px;
        }
        .landing-home .carousel-inner .carousel-item {
          margin: 310px 0px !important;
        }
        .landing-home .carousel-inner {
          height: 30rem;
        }
        .carousel-dark .carousel-control-prev-icon , .carousel-control-next-icon {
          display: none;
        }
        .carousel-dark .carousel-indicators [data-bs-target] {
          display: none;
        }
      `}</style>
    </div>
  )
}
