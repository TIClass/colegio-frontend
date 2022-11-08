
import { Form, Container, Button, Row, Col, Card} from 'react-bootstrap';
import styles from '../../../styles/Home.module.scss';
import variables from '../../../styles/variables.module.scss';

import { useEffect, useState} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';

function FormStepCuatro(props) {
  const [terms, setTerms] = useState(props?.userObj?.terms_conditions);

  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const axiosTermsConditions = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setTerms(true))
          .catch(err => err)
  }

  useEffect(() => {
  }, [])

  const getTermsConditions = (check) => {
    const urlTermsConditions = `${process.env.API_URL}api/v1/user/students-user-parent/?kind=${'terms-conditions'}`
    axiosTermsConditions(urlTermsConditions);
    props.setUserObj({...props?.userObj, ['terms_conditions']:true})
    return true
  }

  const checkedTerms = () => {
    if (props?.userObj?.terms_conditions) {
      return "checked"
    }
    else{
      return ""
    }
  }

  return (
    <div>
      <Container className='mt-4'>
        <h2 className='text-center mb-2' style={{marginBottom:'2px'}}>Términos y condiciones</h2>
        <Card className='mb-2'>
          <Card.Body>
            <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
            deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non prov
            ident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est e
            ligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum n
            ecessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque ear
            um rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur au
            t perferendis doloribus asperiores repellat.
            </p>
            <Form >
            <Form.Group className=" mt-2 d-flex align-items-center" controlId="userNotiWhatsApp">
              <Form.Check
                type='checkbox'
                className='me-2'
                id="selectNotification"
                defaultChecked={terms}
                disabled={terms}
                onChange={e => {
                  setTerms(e.target.checked)
                  getTermsConditions(e.target.checked)
                  }
                }
                />
              <Form.Label className='m-0'>
                <span style={{display:'block', fontSize:'small', fontWeight:'200'}}>Acepto los términos y condiciones</span>
              </Form.Label>
            </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default FormStepCuatro;
