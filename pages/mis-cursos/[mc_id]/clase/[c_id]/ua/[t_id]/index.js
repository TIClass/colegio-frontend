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

export const getServerSideProps = async ({ params, req,res }) => {
  return { props: {}}
}

export default function Task(props) {
  props.onAuthenticationUser();
  props.isInfoComplete();  

  const router = useRouter();

  const [DataObj, setDataObj] = useState([]);
  const [ResourceId, setResourceId] = useState();
  const [SelectResource, setSelectResource] = useState();
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
      const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/${mc_id}/?coursetema_pk=${c_id}&info=True`
      axiosCourseObj(urlCourses);
    }
  }, [router])

  const handlepadre = (id) => {
    setResourceId(id)
    const urlResourceId = `${process.env.API_URL}api/v1/ticlassapps/programs/resources/${id}/`
    axiosResourceId(urlResourceId)
  }

  return (
    <div>
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
                <Button className={styles["roundedbtn"]}>Volver</Button>
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
