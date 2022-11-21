import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import variables from '../styles/variables.module.scss';

import Image from 'next/image'
import CourseCard from '../components/landing/CourseCard';
import LadingLogin from '../components/landing/LadingLogin'
import { Container, Row, Col, Carousel, Button, Card} from 'react-bootstrap';


import axios from 'axios';
import { getCookie} from 'cookies-next';
import { useEffect, useState} from 'react';
import TestimonialCard from '../components/landing/TestimonialCard';

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
            console.log(data)
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
  return { props: {subdomain:subdomain, dataSeo:dataSeo}}
}

export default function Home(props) {
  props.onAuthenticationUser();
  const [LandingObj, setLandingObj] = useState([]);
  const [CoursesObj, setCoursesObj] = useState([]);

  const [seoObj, setSeoObj] = useState(null);
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  //const useToken = `Token ${process.env.TOKEN_GENERIC_API}`
  const urlCourses = `${process.env.API_URL}api/v1/ticourse/`
  const urlLanding = `${process.env.API_URL}api/v1/tiproyects/landing/`
  const axiosLandingObj = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setLandingObj(res.data))
          .catch(err => err)
  }

  const userAuthentications = props.userAuthentications
  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setCoursesObj(res.data))
          .catch(err => err)
  }

  useEffect(() => {
    axiosLandingObj(urlLanding);
    axiosCourseObj(urlCourses+`?proyect_name=${props.subdomain}`);
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
          <meta property="og:url" content={props.dataSeo.url}/>
          <meta property="og:image" content={props.dataSeo.image}/>

          <meta property="fb:app_id" content="111111111" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={props.dataSeo.title +' | '+ props.dataSeo.slogan} />
          <meta property="twitter:site" content={'@'+props.dataSeo.title} />
          <meta property="twitter:creator" content={'@ticlasscom'} />
          <meta property="twitter:description" content={props.dataSeo.description} />
          <meta property="twitter:image" content={props.dataSeo.image} />

          <link rel="canonical" href={props.dataSeo.url} />
          <link rel="icon" href={props.dataSeo.favicon} />
      </Head>
      <section id="myCarousel" className="landing-home slide p-0">
        <Row className='m-0'>
          <Col lg="7" xs="12">
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
      <section className='pt-2' style={{ background: "#f8f7ff"}}>
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
              <Col md="12" >
                <div className='text-center mt-4'>
                  <h2>Testimonios</h2>
                  <span>Nuestros estudiantes</span>
                </div>   
                <Row className='mt-4'>
                  <Col md='4'>                    
                    <TestimonialCard></TestimonialCard>
                  </Col>
                  <Col md='4'>
                    <TestimonialCard></TestimonialCard>
                  </Col>                                    
                </Row>   
                <div className='d-flex justify-content-center'>
                  <Button className={ 'mb-4 btn ' + styles["roundedbtn"]} style={{background: '#00cac9', border:'1px solid #00cac9'}}>Más Testimonios</Button>                                   
                </div>                
              </Col>
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
                  <Col md="3">
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
                  <Col md="3">
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
                  <Col md="3">
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
                  <Col md="3">
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
      </section>    
      <style global jsx>{`
        .slide {
          height: 500px;
        }
        .landing-home {
          background-color: #fff;
          background-image: url(/landing/img/fondo_slide.svg);
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
