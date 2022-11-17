
import Markdown from 'markdown-to-jsx';
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
              {props.kind == 'learning' ?
              <Markdown>{packcourse.course_data.learning}</Markdown>
              : <div></div>}
              {props.kind == 'requirement' ?
              <Markdown>{packcourse.course_data.requirement}</Markdown>
              : <div></div>}
              {props.kind == 'description' ?
              <Markdown>{packcourse.course_data.description}</Markdown>
              : <div></div>}
            </div>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardCustom;
