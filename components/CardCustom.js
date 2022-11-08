
import { Card } from 'react-bootstrap';
import styles from '../styles/Home.module.scss';

function CardCustom(props) {
  return (
    <div>
      <Card className={styles["shadow-sm"] +' '+ styles["roundedbtn"]}>
        <Card.Body>
          <h4 style={{color: props.color}}>{props.title}</h4>
          {props.packCourse?.map(packcourse => (
            <div key={packcourse.id}>
              <h6>En {packcourse.course_name}</h6>
              {props.kind == 'learning' ?
              <p>{packcourse.course_data.learning}</p> : <div></div>}
              {props.kind == 'requirement' ?
              <p>{packcourse.course_data.requirement}</p> : <div></div>}
              {props.kind == 'description' ?
                <p>{packcourse.course_data.description}</p> : <div></div>}
            </div>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardCustom;
