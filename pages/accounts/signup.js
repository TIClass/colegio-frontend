import Image from 'next/image'

import styles from '../../styles/Home.module.scss';
import { Container, Row, Col, Button} from 'react-bootstrap';
import Register from '../../components/Register'

export default function SignUp() {
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
                <Register size="12" shadow={true} />
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
