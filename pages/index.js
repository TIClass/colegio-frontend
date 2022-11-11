import Head from 'next/head'
import styles from '../styles/Home.module.scss';
import variables from '../styles/variables.module.scss';

import CourseCard from '../components/landing/CourseCard';
import LadingLogin from '../components/landing/LadingLogin'
import { Container, Row, Col, Carousel} from 'react-bootstrap';

import axios from 'axios';
import { getCookie} from 'cookies-next';
import { useEffect, useState} from 'react';

export const getServerSideProps = async ({ params, req,res }) => {
  const locationParts = req.headers.host.split('.');
  const subdomain = locationParts[0]
    return { props: {subdomain:subdomain}}
  }

export default function Home(props) {
  props.onAuthenticationUser();
  const [LandingObj, setLandingObj] = useState([]);
  const [CoursesObj, setCoursesObj] = useState([]);
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
