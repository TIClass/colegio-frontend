import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Home.module.scss';
import { Container, Row, Col, Button} from 'react-bootstrap';
import LadingLogin from '../../components/landing/LadingLogin'
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


const Login = (props) => {
  props.onAuthenticationUser();
  props.onImgLogo(props.imgLogo);
  props.onPageNav('login');
  const imgLogoObj = props.imgLogo;
  return (
    <div>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>{props.dataSeo.title} | Iniciar sesión</title>
          <meta name="description" content={props.dataSeo.description} />
          <meta property="og:site_name" content={props.dataSeo.site} />
          <meta property="og:title" content={props.dataSeo.title +' | Iniciar sesión'} key="title" />
          <meta property="og:description" content={props.dataSeo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={props.urlReferer}/>
          <meta property="og:image" content={props.dataSeo.image}/>

          <meta property="fb:app_id" content="111111111" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={props.dataSeo.title +' | Iniciar sesión'} />
          <meta property="twitter:site" content={'@'+props.dataSeo.title} />
          <meta property="twitter:creator" content={'@ticlasscom'} />
          <meta property="twitter:description" content={props.dataSeo.description} />
          <meta property="twitter:image" content={props.dataSeo.image} />

          <link rel="canonical" href={props.urlReferer} />
          <link rel="icon" href="/logos/img/favicon.png" />
      </Head>
    <div style={{ background: "#f8f7ff"}} className='login'>
      <section>
        <Row className='m-0'>
          <div className='d-flex justify-content-center align-items-center mt-4'>
            <Col md="4" className='mt-4'>
              <Col md="12" className='mt-4'>
                <div className='d-flex justify-content-center align-items-center'>
                  <Link href="/">
                    <Image src={imgLogoObj} alt="logo TIClass" width={220} height={100} className={styles["logo-login"]+ ' logo-login'} />
                  </Link>
                </div>
              </Col>
              <Col md="12" className='mt-4'>
                <LadingLogin size="12" shadow={false} className='mt-4'/>
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
  </div>
  )
}

export default Login;
