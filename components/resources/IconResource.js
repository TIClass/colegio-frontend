import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt, faNewspaper, faQuestion } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router'
import { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';

export const getServerSideProps = async ({ params, req,res }) => {
  return { props: {}}
}

function IconResource(props) {
  const router = useRouter();
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`
  const [estadoObj, setEstadoObj] = useState(props.resourse_set[0].id);
  const [progressResourceObj, setProgressResourceObj] = useState([]);
  const [errorprogressResourceObj, setErrorProgressResourceObj] = useState("");
  const [loadedprogressResourceObj, setLoadedProgressResourceObj] = useState(false);

  const change = (index) => {
    const resource_id = props.resourse_set[index].id
    setEstadoObj(props.resourse_set[index].id)
    props.handlepadre(resource_id)
  }

  const axiosProgressResource = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setProgressResourceObj(progressResourceObj => [...progressResourceObj, response.data]))
      .catch((error) => setErrorProgressResourceObj(error.message))
      .finally(() => setLoadedProgressResourceObj(true));
    return null
  }

  const getInfo = (url) => {
    return new Promise((resolve, reject) => {
      resolve(axiosProgressResource(url))
    });
  }

  const getApiProgress = () => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      for (var i = 0; i < props?.resourse_set?.length; i++) {
        const url_list_studentes = `${process.env.API_URL}api/v1/progressusers/getprogressuserresource/?resource_pk=${props?.resourse_set[i]?.id}&packcourse_pk=${mc_id}`
        getInfo(url_list_studentes)
      }
    }
  }

  useEffect(() => {
    getApiProgress()
  },[])

  const funcionPor = (recurso_pk) => {
    for (var i = 0; i < progressResourceObj?.length; i++) {
      if (progressResourceObj[i]?.history_user_resource?.resource == recurso_pk){
        return progressResourceObj[i]?.history_user_resource?.pct
      }
    }
    return 0
  }

  const funcion2 = (recurso_pk, recurso_type) => {
    const value = funcionPor(recurso_pk)
    return (
      <>
        <CircularProgressbarWithChildren value={value}
          styles={buildStyles({pathColor: `#ffffff`,textColor: '#f88',trailColor: 'rgba(209, 208, 212, 0.3)',backgroundColor: '#3e98c7'})}>
            {recurso_type== 'material'?
              <div>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className='me-1'
                  style={{ fontSize: 14,color:'fff', marginLeft:'3px',width: 20}}
                />
                {estadoObj == recurso_pk ?
                  <span className='text-white' style={{position:'absolute',marginTop:'18px',marginLeft:'-17px'}}>•</span> : <div></div>
                }
              </div>
              : <div></div>
            }
            {recurso_type== 'lesson'?
              <div>
                <FontAwesomeIcon
                  icon={faYoutube}
                  className='me-1'
                  style={{ fontSize: 14,color:'fff', marginLeft:'3px',width: 20}}
                />
                {estadoObj == recurso_pk ?
                  <span className='text-white' style={{position:'absolute',marginTop:'18px',marginLeft:'-17px'}}>•</span> : <div></div>
                }
              </div>
              : <div></div>
            }
            {recurso_type== 'quiz'?
              <div>
                <FontAwesomeIcon
                  icon={faQuestion}
                  className='me-1'
                  style={{ fontSize: 14,color:'fff', marginLeft:'3px',width: 20}}
                />
                {estadoObj == recurso_pk ?
                  <span className='text-white' style={{position:'absolute',marginTop:'18px',marginLeft:'-17px'}}>•</span> : <div></div>
                }
              </div>
              : <div></div>
            }
            {recurso_type== 'article'?
              <div>
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className='me-1'
                  style={{ fontSize: 14,color:'fff', marginLeft:'3px',width: 20}}
                />
                {estadoObj == recurso_pk ?
                  <span className='text-white' style={{position:'absolute',marginTop:'18px',marginLeft:'-17px'}}>•</span> : <div></div>
                }
                </div>
              :
              <div>
              </div>
              }
          </CircularProgressbarWithChildren>
      </>
    )
  }

  return (
  <div className='d-flex'>
    {props?.resourse_set?.map((item,i)=>{
      return (
        <div key={i}>
            <div style={{ width: 25, height: 25, display:'flex',alignItems:'center'}} className="m-1"  onClick={()=>{change(i)}}>
            {funcion2(item.id,item.name_model)}
            </div>
        </div>)
    })}

    <style global jsx>{`
      .circule-resource{
        left: 0;
        width: 26px;
        height: 26px;
        border: 2px solid rgba(212, 222, 192, 0.6);
        border-radius: 50%;
        display: inline-block;
      }
    `}</style>
  </div>
  );
}

export default IconResource;
