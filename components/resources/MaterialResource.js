import { faCloudDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from 'react-bootstrap/Spinner';

import { Row, Col, Container } from 'react-bootstrap';  
import { Card } from "react-bootstrap";
import Ratio from 'react-bootstrap/Ratio';

import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next';
import axios from 'axios';

import parse from 'html-react-parser';

import Vimeo from '@u-wave/react-vimeo';
import { Link } from "react-router-dom";

function MaterialResource(props) {  
  const router = useRouter();
  const [dataObj, setDataObj] = useState([]);    
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setDataObj(res.data))
          .catch(err => err)
  }
  const files = []  

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      const { c_id } = router.query
      const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/${mc_id}/?coursetema_pk=${c_id}&info=True`
      axiosCourseObj(urlCourses);
    }
  }, [router])
    
  const trackingApiMaterial = () => {
    // mandar la info al backend    
    let { t_id } = router.query
    const urlTrackingVideo = `${process.env.API_URL}api/v1/historyusers/`
    const data_tracking = {
      pack_pk:dataObj?.packcourse?.pack_id,
      course_pk:dataObj?.course_data?.id,
      resource_pk:props.resource.id,
      ua_pk:t_id,
      material:true
    }    
    axiosPostObj(urlTrackingVideo, data_tracking)    
  }  

  const axiosPostObj= (url, data) => {
    axios.post(url, data, { headers: { Authorization: useToken } })
          .then(res => res.data)
          .catch(err => err)
    return null
  }

  const downloadFile = (url) => {    
    window.open(url)
  }

  //Por defecto trackeamos el material
  trackingApiMaterial()
    
  if (props.resource?.resource?.files) {
    for (let i = 0; i < props.resource?.resource?.files.length; i++){
      files.push(        
        <Col md="4" key={i}> 
          <a onClick={()=>{downloadFile(props.resource?.resource?.files[i].file_url)}} >
          <Card className="m-4" style={{background:'#2283FF', cursor:'pointer'}}> 
            <Card.Body className="text-center">
              <FontAwesomeIcon
                icon={faCloudDownload}
                className='me-1'
                style={{ fontSize: 14, color:'#fff' }}
                />
                <br></br>
                <p className="text-white" style={{marginRight:'5px'}}>{props.resource?.resource?.files[i].file_description}</p>   
              </Card.Body>             
            </Card>   
            </a>      
          </Col>  
                                    
        ) 
      }  
    }  
      

  return (    
    <div>
      <Container>      
        <Row className="d-flex">                      
          {files}        
        </Row>           
      </Container>                    
    </div>                                     
  );
  }
  
  export default MaterialResource;
