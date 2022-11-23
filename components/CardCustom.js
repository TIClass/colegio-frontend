
import Markdown from 'markdown-to-jsx';
import { Card } from 'react-bootstrap';
import styles from '../styles/Home.module.scss';

function CardCustom(props) {
  return (
    <div>
      <Card className={styles["shadow-sm"] +' '+ styles["roundedbtn"]}>
        <Card.Body>
          <h2 style={{color:props.color, fontSize: '1.4rem'}}>{props.title}</h2>
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
              {props.kind == 'contents' ?
                <ul>
                {packcourse.course_data.contents.map((item, index) => {
                  return (
                    <div>
                      <li key={index}>{item.subject_name}</li>

                      <ul>
                      {item.temas.map((_item, _index) => {
                        return (<li key={_index}>{_item.tema_name}</li>)
                      })}
                      </ul>
                  </div>
                  )
                })}
                </ul>
              : <div></div>}
            </div>
            ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardCustom;
