import { Container } from "react-bootstrap";
import Ratio from 'react-bootstrap/Ratio';
import Spinner from 'react-bootstrap/Spinner';

import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next';
import axios from 'axios';

import Vimeo from '@u-wave/react-vimeo';

function LessonResource(props) {

  const router = useRouter();
  const [dataObj, setDataObj] = useState([]);
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const axiosCourseObj= (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setDataObj(res.data))
          .catch(err => err)
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      const { c_id } = router.query
      const urlCourses = `${process.env.API_URL}api/v1/ticourse/my-courses/packcourse/${mc_id}/?coursetema_pk=${c_id}&info=True`
      axiosCourseObj(urlCourses);
    }
  }, [router])

  const axiosPostObj= (url, data) => {
    axios.post(url, data, { headers: { Authorization: useToken } })
          .then(res => res.data)
          .catch(err => err)
    return null
  }

  const getVideoStreaming = (streaming) => {
    if (streaming) {
      return (<Ratio aspectRatio="16x9">
              <Vimeo video={streaming}
                onPause={handlePlayerPause}
                onPlay={handlePlayerPlay}
                onTimeUpdate={handleonTimeUpdate}
                onReady={handleonReady}
                onEnd={handleonEnd}
                autoplay
                className="embed-responsive-item ratio ratio-16x9"
                height="450px" width="900px" frameBorder="0"
                webkitallowfullscreen mozallowfullscreen allowfullscreen/>
              </Ratio>)
    } else {
      if (streaming?.iframe_video) {
        return (parse(''+streaming?.iframe_video))
      } else {
        return (
          <div className="text-center">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
          </div>
        )
      }

    }
  }

  const [stateVimeo, setStateVimeo] = useState({ videoIndex: 0, volume: 50, paused: false});
  const handlePlayerPause = (data, id) => {
    // mandar la info al backend
    let seconds = data.seconds
    let percent = data.percent
    let duration = data.duration
    let { t_id } = router.query
    const urlTrackingVideo = `${process.env.API_URL}api/v1/historyusers/`
    const data_tracking = {
      pack_pk:dataObj?.packcourse?.pack_id,
      course_pk:dataObj?.course_data?.id,
      resource_pk:props.resource.id,
      ua_pk:t_id,
      display: seconds
    }
    axiosPostObj(urlTrackingVideo, data_tracking)
    setStateVimeo({ paused: true });
  }
  const handlePlayerPlay = (data, id) => {
    setStateVimeo({ paused: false });
  }

  const handleonTimeUpdate = (data, id) => {
    // no lo ocuparemos
  }

  const handleonReady = (data, id) => {
    // cuando el video está listo para hacer play
    // console.log('handleonReady')
  }
  const handleonEnd = (data, id) => {
    // no lo ocuparemos
    console.log('handleonEnd')
  }

  return (
    <div>
      <div className="embed-responsive embed-responsive-16by9 iframe_class">
        {getVideoStreaming(props.video_code)}
      </div>
      <style global jsx>{`
        .embed-responsive-16by9 {
            border-radius: 20px !important;
            border-bottom-right-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
        }
        .embed-responsive {
            position: relative;
            display: block;
            width: 100%;
            padding: 0;
            overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default LessonResource;
