import {Card, Row, Col, Container} from 'react-bootstrap';

import Avatar from 'react-avatar';
import styles from '../../styles/Home.module.scss';
import variables from '../../styles/variables.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function TestimonialCard(props) {

  return(
    <Container className='mb-4'>
      <Card className={styles["shadow-lg"]+' '+styles["roundedbtn"]}>                      
        <Card.Body>
          <div className='icon'>
            <div className='text-center'>
              <FontAwesomeIcon icon={faStar} style={{ fontSize: '11', fontWeight:'lighter', color: '#fcc032', marginRight:'1px' }}/>         
              <FontAwesomeIcon icon={faStar} style={{ fontSize: '11', fontWeight:'lighter', color: '#fcc032', marginRight:'1px' }}/>         
              <FontAwesomeIcon icon={faStar} style={{ fontSize: '11', fontWeight:'lighter', color: '#fcc032', marginRight:'1px' }}/>         
              <FontAwesomeIcon icon={faStar} style={{ fontSize: '11', fontWeight:'lighter', color: '#fcc032', marginRight:'1px' }}/>         
              <FontAwesomeIcon icon={faStar} style={{ fontSize: '11', fontWeight:'lighter', color: '#fcc032', marginRight:'1px' }}/>                                               
            </div>          
            <p className='text-center mt-2 pb-5'>
            make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
            typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letra
            set sheets containing Lorem Ipsum passages, and more recently with desktop publishing sof
            tware like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            <div className='px-5 d-flex align-content-center'>
              <div><Avatar size="50px" round={true}/></div>
              <div className='mx-2'>
                <h6 className='mb-0'>Nombre Apellido</h6>
                <p>000 pts</p>
              </div>            
            </div>   
          </div>                 
        </Card.Body>
      </Card>      
    </Container>
  )
}

export default TestimonialCard;
