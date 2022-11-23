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
            {props.item.text}
            </p>
            <div className='px-5 d-flex align-content-center'>
              <div><Avatar size="50px" round={true} src={"/landing/img/abeta-testimonio.png"}/></div>
              <div className='mx-2'>
                <h6 className='mt-3'>{props.item.title}</h6>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default TestimonialCard;
