
import { Form, Container, Button, Row, Col} from 'react-bootstrap';
import styles from '../../../styles/Home.module.scss';
import variables from '../../../styles/variables.module.scss';

import { useEffect, useState} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';

function FormStepTres() {
  const [userObj, setUserObj] = useState('');
  const [coursesObj, setCoursesObj] = useState('');
  const [studentUserObj, setStudentUserObj] = useState('');
  const [userSubscription, setUserSubscription] = useState('');
  const [errorStudentUserObj, setErrorStudentUserObj] = useState('');
  const [loadedStudentUserObj, setLoadedStudentUserObj] = useState('');
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setCoursesObj(res.data))
          .catch(err => err)
  }

  const axiosVideoTutorial= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => res.data)
          .catch(err => err)
  }

  const axiosStudentUserInfo = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setStudentUserObj(response.data))
      .catch((error) => setErrorStudentUserObj(error.message))
      .finally(() => setLoadedStudentUserObj(true));
    return null
  }

  useEffect(() => {
    const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/`
    const urlStudentsUser = `${process.env.API_URL}api/v1/user/students-user-parent/`
    const urlVideoTutorial = `${process.env.API_URL}api/v1/user/students-user-parent/?kind=${'video-tutorial'}`
    axiosCourseObj(urlCourses);
    axiosStudentUserInfo(urlStudentsUser);
    axiosVideoTutorial(urlVideoTutorial);
  }, [])

  const handleSubscription = (user_first_name, e) => {
    setUserSubscription(e.target.value)
    setUserObj(user_first_name)
  }

  return (
    <div>
      <Container className='mt-4'>
          <h2 className='text-center mb-2' style={{marginBottom:'2px'}}>Como utilizar Natiboo</h2>
          <iframe className='mb-4' src="https://player.vimeo.com/video/721091998?autoplay=1&amp;h=81ffeb04c6" width="100%" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </Container>
    </div>
  );
}

export default FormStepTres;
