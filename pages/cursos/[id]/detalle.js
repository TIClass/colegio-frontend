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

export default function CourseDetail(props) {
  props.onAuthenticationUser();
  props.isInfoComplete();  
  
  const router = useRouter();
  
  const [CoursesObj, setCoursesObj] = useState([]);  
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  
  const axiosCourseObj= (url, id) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setCoursesObj(res.data))
          .catch(err => err)
  }

  useEffect(() => {    
    if (router.asPath !== router.route) {      
      const { id } = router.query      
      const urlCourses = `${process.env.API_URL}api/v1/ticourse/${id}`      
      axiosCourseObj(urlCourses);          
    }
  }, [router])  
  
  const courses_obj = CoursesObj;        
  
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
            <Col md="8">
              <CourseCardDetail 
              namePack={courses_obj.name} 
              desc={courses_obj.description}
              packCourse={courses_obj.packcourse_set}               
              />
            </Col>
            <Col md="4">
              <BuyCard />
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
          </Row>
        </Container>
      </section>
    </div>
  )
}
