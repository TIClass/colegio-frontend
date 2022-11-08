import Link from 'next/link';
import Image from 'next/image';

import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Col md="12 mb-4" className='text-center'>
          <small className="d-block text-muted">
            Powered by
            <Link href="https://www.ticlass.com/">
              <Image src="/logos/img/logo-ticlass.svg" alt="TIClass" width={70} height={50} className={'powered-logo-footer pt-4'} />
            </Link>©2015-2023
          </small>
        </Col>
      </Container>

      <style global jsx>{`
        .powered-logo-footer{
          width: 70px;
          height: 35px;
          background-size: 70px 50px;
          margin: auto;
        }

      `}</style>
    </footer>
  );
}

export default Footer;
