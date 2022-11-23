import Head from 'next/head'
import styles from '../../styles/Home.module.scss';
import { Container, Row, Col, Button} from 'react-bootstrap';
import CourseCard from '../../components/landing/CourseCard';
import { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Link from 'next/link'
import Router from 'next/router'

import { getLogo, getClassLanding } from '../../methods/getLogoClass';

export const getServerSideProps = async ({ params, req,res }) => {
  const locationParts = req.headers.host.split('.');
  const subdomain = locationParts[0]

  const cookieUserToken = req.cookies['cookie-usertoken'];
  if (cookieUserToken == undefined) {
    return { redirect: { permanent: false, destination: "/accounts/login/?from="+req.url}, props:{},};
  }

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

export default function MyCourses(props) {
  props.onAuthenticationUser();
  props.onImgLogo(props.imgLogo);

  const [CoursesObj, setCoursesObj] = useState([]);
  const token = getCookie('cookie-usertoken');

  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/`

  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setCoursesObj(res.data))
          .catch(err => err)
  }
  useEffect(() => {
    axiosCourseObj(urlCourses);
  }, [])

  const courses_obj = CoursesObj;

  return (
    <div>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>{props.dataSeo.title} | Mis Cursos</title>
          <meta name="description" content={props.dataSeo.description} />
          <meta property="og:site_name" content={props.dataSeo.site} />
          <meta property="og:title" content={props.dataSeo.title +' | Mis Cursos'} key="title" />
          <meta property="og:description" content={props.dataSeo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={props.urlReferer}/>
          <meta property="og:image" content={props.dataSeo.image}/>

          <meta property="fb:app_id" content="111111111" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={props.dataSeo.title +' | Mis Cursos'} />
          <meta property="twitter:site" content={'@'+props.dataSeo.title} />
          <meta property="twitter:creator" content={'@ticlasscom'} />
          <meta property="twitter:description" content={props.dataSeo.description} />
          <meta property="twitter:image" content={props.dataSeo.image} />

          <link rel="canonical" href={props.urlReferer} />
          <link rel="icon" href="/logos/img/favicon.png" />
      </Head>
      <section>
        <Container>
          <Row className='pt-5'>
            <Col md="6">
              <h2>Mis cursos</h2>
            </Col>
            <Col md="6">
            <Link href="/cursos">
              <Button variant="outline-danger float-right" className={"m-1 "+styles["float-right"]}>Otros cursos</Button>
            </Link>
            </Col>
            <div className='m-0 p-0'>
              <Row className='pt-5'>
              {courses_obj.results?.map(pack => (
                <Col lg="4" md="6" sm="12" xs="12" key={pack.id}>
                  <CourseCard is_price={false} pack_id={pack.id}
                    name={pack.course_data.name} desc={pack.course_data.description_min}
                    image={pack.course_data.image} />
                </Col>
              ))}
              </Row>
            </div>
          </Row>
        </Container>
      </section>
    </div>
  )
}
