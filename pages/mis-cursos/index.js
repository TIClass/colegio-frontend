import Head from 'next/head'
import styles from '../../styles/Home.module.scss';
import { Container, Row, Col, Button} from 'react-bootstrap';
import CourseCard from '../../components/landing/CourseCard';
import { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Link from 'next/link'
import Router from 'next/router'

export const getServerSideProps = async ({ params, req,res }) => {
  const cookieUserToken = req.cookies['cookie-usertoken'];
  if (cookieUserToken == undefined) {
    return { redirect: { permanent: false, destination: "/accounts/login/?from="+req.url}, props:{},};
  }
  return { props: {}}
}

export default function MyCourses(props) {
  props.onAuthenticationUser();

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
