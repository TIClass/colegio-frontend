import Link from 'next/link';
import Image from 'next/image'; 

import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (    
    <footer>
    <Container>
      <Col md="12 mb-4" className='text-center'>
        <small className="d-block text-muted">
          Powered by
          <Link href="https://www.ticlass.com/">
            <Image src="/logos/img/logo-ticlass.svg" alt="TIClass" width={70} height={50} className={'powered-logo-footer pb-1 m-2'} />
          </Link>©2015-2023
        </small>
      </Col>
    </Container>

    <style global jsx>{`
    `}</style>
  </footer>
  );
}

export default Footer;
