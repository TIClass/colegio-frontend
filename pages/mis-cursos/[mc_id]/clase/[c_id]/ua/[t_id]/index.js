import Head from 'next/head'

import { Container, Row, Col, Button, Card} from 'react-bootstrap';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

import styles from '../../../../../../../styles/Home.module.scss';

import { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import axios from 'axios';
import IconResource from '../../../../../../../components/resources/IconResource';
import Resource from '../../../../../../../components/resources/Resource';
import { getLogo, getClassLanding } from '../../../../../../../methods/getLogoClass';
import Link from 'next/link';

export const getServerSideProps = async ({ params, req,res }) => {
  const cookieUserToken = req.cookies['cookie-usertoken'];
  if (cookieUserToken == undefined) {
    return { redirect: { permanent: false, destination: "/accounts/login/?from="+req.url}, props:{},};
  }
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

export default function Task(props) {
  props.onAuthenticationUser();
  props.isInfoComplete();
  props.onImgLogo(props.imgLogo);

  const router = useRouter();

  const [DataObj, setDataObj] = useState([]);
  const [ResourceId, setResourceId] = useState();
  const [SelectResource, setSelectResource] = useState();
  const [arrayRouterID, setArrayRouterID] = useState([]);
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setDataObj(res.data))
          .catch(err => err)
    return null
  }
  const axiosResourceId= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setSelectResource(res.data))
          .catch(err => err)
    return null
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      const { c_id } = router.query
      const array = [mc_id, c_id]
      setArrayRouterID(array)
      const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/${mc_id}/?coursetema_pk=${c_id}&info=True`
      axiosCourseObj(urlCourses);
    }
  }, [router])

  const handlepadre = (id) => {
    setResourceId(id)
    const urlResourceId = `${process.env.API_URL}api/v1/ticlassapps/programs/resources/${id}/`
    axiosResourceId(urlResourceId)
  }

  console.log(DataObj)

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
      <Container className='pt-4'>
      <Col md={{ span: 10, offset: 1 }} className='mt-2'>
        <Card className={'mb-4 '+styles['shadow-sm']+' '+styles['roundedbtn'] }>
          <div>
            <Resource resource={SelectResource||DataObj?.tema_data?.learningunits[0].resource_set[0]}></Resource>
          </div>
          <Card.Header style={{'background':'#5F0DFA'}} >
            <Row>
              <Col md="8" className='d-flex align-items-center'>
              {DataObj?.tema_data?.learningunits?.map((task, index) => (
                <div key={index}>
                    <IconResource resourse_set={task.resource_set} handlepadre={handlepadre}></IconResource>
                </div>
              ))}
              </Col>
              <Col md="4" className='d-flex justify-content-end'>
                <Link key={1} href={`/mis-cursos/${arrayRouterID[0]}/clase/${arrayRouterID[1]}`}>
                  <Button variant="primary" className={styles["roundedbtn"]}>Volver</Button>
                </Link>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="8">
                <h4 style={{'color':'#5F0DFA'}}>{SelectResource?.name||DataObj?.tema_data?.learningunits[0].resource_set[0].name}</h4>
              </Col>
              <Col md="4">
                <Button className={ styles['roundedbtn']} bg="" style={{'width':'100%', 'background':'#5F0DFA', 'border':'3px solid #fff'}}>
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className='me-1'
                    style={{ 'fontSize': 14, }}
                    />
                  Archivo de la tarea
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      </Container>
    </div>
  )
}
