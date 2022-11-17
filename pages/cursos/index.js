import Head from 'next/head'
import { Container, Row, Col} from 'react-bootstrap';  
import { getCookie } from 'cookies-next';
import { useEffect, useState} from 'react';
import axios from 'axios';
import CourseCard from '../../components/landing/CourseCard';

export default function Courses(props) {  
  props.onAuthenticationUser();
  props.isInfoComplete();  

  const [CoursesObj, setCoursesObj] = useState([]);  
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const urlCourses = `${process.env.API_URL}api/v1/ticourse/`  
  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setCoursesObj(res.data))
          .catch(err => err)
  }
  useEffect(() => {
    axiosCourseObj(urlCourses);
  }, [])
      
  const courses_obj = CoursesObj;     

  console.log(courses_obj,"popo")
  
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
      <section style={{ background: "#f8f7ff"}}>
        <Container>
          <Row className='pt-5'>
            <Col md="12">
              <h2 className='text-center'>Cursos</h2>
            </Col>                 
            {courses_obj.results?.map(pack => (                                         
              <Col lg="4" md="6" sm="12" xs="12" key={pack.id}>                  
              <CourseCard 
                is_price={true}
                name={pack.name}
                desc={pack.description}
                subscription_set={pack.subscription_set}
                pack_id={pack.id} 
                />
             </Col>                                                                                               
            ))}                      
          </Row>          
        </Container>
      </section>
    </div>
  )
}
