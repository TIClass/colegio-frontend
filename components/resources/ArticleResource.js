import { Container } from 'react-bootstrap';  

function ArticleResource(props) {        
    
  return (    
    <Container>
      <h3>{props.name}</h3>
      <h5>{props.body}</h5>
    </Container>                                        
  );
  }
  
  export default ArticleResource;
