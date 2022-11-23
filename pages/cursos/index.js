import Head from 'next/head'
import { Container, Row, Col, Alert} from 'react-bootstrap';
import { getCookie } from 'cookies-next';
import { useEffect, useState} from 'react';
import axios from 'axios';
import CourseCard from '../../components/landing/CourseCard';

import { getLogo, getClassLanding } from '../../methods/getLogoClass';

export const getServerSideProps = async ({ params, req, res, query }) => {
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

export default function Courses(props) {
  props.onAuthenticationUser();
  props.isInfoComplete();
  props.onImgLogo(props.imgLogo);

  const [CoursesObj, setCoursesObj] = useState([]);
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const urlCourses = `${process.env.API_URL}api/v1/ticourse/?proyect_name=${props.subdomain}`
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
        <title>{props.dataSeo.title} | Encontrarás cursos para preparar los exámenes libres</title>
        <meta name="description" content={props.dataSeo.description} />
        <meta property="og:site_name" content={props.dataSeo.site} />
        <meta property="og:title" content={props.dataSeo.title +' | Encontrarás cursos para preparar los exámenes libres'} key="title" />
        <meta property="og:description" content={props.dataSeo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.urlReferer}/>
        <meta property="og:image" content={props.dataSeo.image}/>

        <meta property="fb:app_id" content="111111111" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={props.dataSeo.title +' | Encontrarás cursos para preparar los exámenes libres'} />
        <meta property="twitter:site" content={'@'+props.dataSeo.title} />
        <meta property="twitter:creator" content={'@ticlasscom'} />
        <meta property="twitter:description" content={props.dataSeo.description} />
        <meta property="twitter:image" content={props.dataSeo.image} />

        <link rel="canonical" href={props.urlReferer} />
        <link rel="icon" href="/logos/img/favicon.png" />
      </Head>
      <section style={{ background: "#f8f7ff"}}>
        <Container>
          <Row className='pt-5'>
            <Col md="12">
              <h1 className='text-center'>Mira nuestros cursos</h1>
            </Col>
            <Col md={{ span: 6, offset: 3 }}>
              <Alert  variant={'success'} className="text-center pt-2 pb-2">
                Selecciona el curso que mejor se acomode a tus necesidades y logra tus objetivos y metas con TIClass Colegio!
              </Alert>
            </Col>
          </Row>
          <Row className='pt-5'>
            {courses_obj.results?.map(pack => (
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
    </div>
  )
}
