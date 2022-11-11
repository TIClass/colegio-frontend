import {Card, Row, Col} from 'react-bootstrap';
import Link from 'next/link'

import { formatPrice } from '../../methods/utils';

import styles from '../../styles/Home.module.scss';
import variables from '../../styles/variables.module.scss';
import {Button} from 'react-bootstrap';

function CourseCard(props) {

    const urlDetail = (is_price) => {
      if (is_price) {
        return `/cursos/${encodeURIComponent(props.pack_id)}/detalle`
      } else {
        return `/mis-cursos/${encodeURIComponent(props.pack_id)}`
      }
    }

    return(
      <div>
        <Card className={'hand-click mb-4 ' + styles["shadow-md"] +' '+ styles["roundedbtn"]}>
          <Card.Img variant="top" src={props.image} />
          <Link href={urlDetail(props.is_price)}>
          <Card.Body className='body-card'>
            <h4 style={{color: props.is_price ? variables.primaryColor : variables.blackColor }}>
              {props.name}
            </h4>
            <p className='mb-0'>{props.desc}</p>

            { props.is_price ?
            <div>
              <Row>
                <Col md="12" className=''>
                  <hr></hr>
                </Col>
              </Row>
              {props.subscription_set?.map(susc => (
               <Row key={susc.id}>
                <Col md="9" className='d-flex mt-2'>
                  <span className='d-inline-block font-weight-bold'>Valor:</span>
                  { susc.offer_price == '0.0000' ?
                    <div>
                      <h5 className={styles["font-italic"]} style={{color: variables.primaryColor}}>
                      {formatPrice(susc.price)}
                      </h5>
                    </div> :
                    <div className='d-flex align-items-center'>
                      <span className={styles["font-italic"] +' '+ styles["offer"]}>{formatPrice(susc.price)}</span>
                      <h5 className={styles["font-italic"]} style={{color: variables.primaryColor}}>
                       {formatPrice(susc.offer_price)}
                      </h5>
                    </div>
                  }
                </Col>
                <Col md="3">
                <Link href={`/cursos/${encodeURIComponent(props.pack_id)}/detalle`}>
                  <Button style={{background: variables.tertiaryColor}} className={ 'btn float-right btn-red ' + styles["roundedbtn"]} >Ver</Button>
                </Link>
                </Col>
              </Row>
              ))}
              </div>
              : <div></div>
            }
          </Card.Body>
          </Link>
        </Card>
        <style global jsx>{`
        .card .body-card:hover {
          background-color: #f0f0f0;
          border-bottom-right-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        .btn-red {
          color: ${variables.whiteColor};
            a:hover{
              color: ${variables.blackColor};
            }
        }
      `}</style>
      </div>
    )
}

export default CourseCard;
