import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Home.module.scss';
import { Container, Row, Col, Button} from 'react-bootstrap';
import Register from '../../components/Register'

import { getLogo, getClassLanding } from '../../methods/getLogoClass';

export const getServerSideProps = async ({ params, req,res }) => {
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

export default function SignUp(props) {
  props.onImgLogo(props.imgLogo);
  console.log(props.subdomain,"ppppppppppppppppppp")
  
  return (
    <div style={{ background: "#f8f7ff"}} className='login'>
      <section>
        <Row className='m-0'>
          <div className='d-flex justify-content-center align-items-center'>
            <Col md="4" className='mt-4'>
              <Col md="12">
                <div className='d-flex justify-content-center align-items-center'>
                  <Link href="/">
                    <Image src="/logos/img/logo-natiboo-by-ticlass.svg" alt="Colegio Natiboo" width={220} height={100} className={styles["logo-login"]+ ' logo-login'} />
                  </Link>
                </div>
              </Col>
              <Col md="12" className='mt-4'>
                <Register size="12" shadow={true}  />
              </Col>
            </Col>
          </div>
          </Row>
      </section>
      <style global jsx>{`
      .login{
        height: 100vh;
      }
      `}</style>
    </div>
  )
}
