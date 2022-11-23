import Head from 'next/head'
import variables from '../../../styles/variables.module.scss';

import { Container, Row, Col, } from 'react-bootstrap';
import CardCustom from '../../../components/CardCustom';
import BuyCard from '../../../components/curso/BuyCard';
import CourseCardDetail from '../../../components/curso/CourseCardDetail';

import axios from 'axios';
import { getCookie} from 'cookies-next';
import { useEffect, useState} from 'react';

import { useRouter } from 'next/router'

import { getLogo, getClassLanding } from '../../../methods/getLogoClass';

export const getServerSideProps = async ({ params, req, res, query }) => {
  const locationParts = req.headers.host.split('.');
  const subdomain = locationParts[0]
  const { id } = query
  const useTokenSeoA = `Token ${process.env.TOKEN_GENERIC_API}`
  const urlSeoA = `${process.env.API_SEO_URL}api/v1/ticourse/seo/?proyect_name=${subdomain}`
  const urlCourses = `${process.env.API_SEO_URL}api/v1/ticourse/${id}/?proyect_name=${subdomain}`
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

  const resCourses = await fetch(urlCourses, options)
  const dataCourses = await resCourses.json()
  const urlReferer = req.headers.referer
  const urlHost = req.headers.host
  return { props: {subdomain:subdomain, dataSeo:dataSeo, dataCourses:dataCourses,
                    urlReferer:urlReferer, urlHost:urlHost, classLanding:getClassLanding(subdomain), imgLogo:getLogo(subdomain)
                  }
          }
}

export default function CourseDetail(props) {
  props.onAuthenticationUser();
  props.onImgLogo(props.imgLogo);

  const router = useRouter();

  const [coursesObj, setCoursesObj] = useState([]);
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const axiosCourseObj= (url, id) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setCoursesObj(res.data))
          .catch(err => err)
  }

  useEffect(() => {
    // if (router.asPath !== router.route) {
    //   const { id } = router.query
    //   const urlCourses = `${process.env.API_URL}api/v1/ticourse/${id}/?proyect_name=${props.subdomain}`
    //   axiosCourseObj(urlCourses);
    // }
  }, [router])

  const courses_obj = props.dataCourses;
  return (
    <div>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>{props.dataSeo.title} | {courses_obj.name}</title>
          <meta name="description" content={courses_obj.description} />
          <meta property="og:site_name" content={props.urlHost} />
          <meta property="og:title" content={props.dataSeo.title +' | '+ courses_obj.name} key="title" />
          <meta property="og:description" content={courses_obj.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={props.urlReferer}/>
          <meta property="og:image" content={courses_obj.image}/>

          <meta property="fb:app_id" content="111111111" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={props.dataSeo.title +' | '+ courses_obj.name} />
          <meta property="twitter:site" content={'@'+props.dataSeo.title} />
          <meta property="twitter:creator" content={'@ticlasscom'} />
          <meta property="twitter:description" content={courses_obj.description} />
          <meta property="twitter:image" content={courses_obj.image} />

          <link rel="canonical" href={props.urlReferer} />
          <link rel="icon" href="/logos/img/favicon.png" />
      </Head>
      <section className='py-4'>
        <Container>
          <Row>
            <Col md="8">
              <CourseCardDetail
              namePack={courses_obj.name}
              desc={courses_obj.description}
              image={courses_obj.image}
              packCourse={courses_obj.packcourse_set}
              sellerNumber={courses_obj.seller_number}
              />
            </Col>
            <Col md="4">
              <BuyCard sellerNumber={courses_obj.seller_number}
                namePack={courses_obj.name} subscriptionSet={courses_obj?.subscription_set} />
            </Col>
            <Col md="8" className='mb-4'>
              <CardCustom color={variables.primaryColor}
                kind='learning'
                title='Lo que aprenderás'
                packCourse={courses_obj.packcourse_set}
              />
            </Col>
            <Col md="8" className='mb-4'>
              <CardCustom color={variables.primaryColor}
                kind='requirement'
                title='Requisitos'
                packCourse={courses_obj.packcourse_set}
               />
            </Col>
            <Col md="8" className='mb-4'>
              <CardCustom color={variables.primaryColor}
                kind='description'
                title='Descripción'
                packCourse={courses_obj.packcourse_set}
              />
            </Col>
            <Col md="8" className='mb-4'>
              <CardCustom color={variables.primaryColor}
                kind='contents'
                title='Contenido del curso'
                packCourse={courses_obj.packcourse_set}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
