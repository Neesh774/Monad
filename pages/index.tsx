import { Container, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import Link from "next/link";

import MetaTags from "components/MetaTags";
import Footer from "components/Footer";

export default function Home() {
  return (
    <div className="home-parent">
      <MetaTags />
      <Container>
        <div className="createsnippet">
          <Col>
            <h1>
              Create a <span className="blue">Snippet</span>
            </h1>
          </Col>
          <Form>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-3"
              >
                <Form.Control type="text" />
              </FloatingLabel>
            </Col>
			<Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Snippet"
                className="mb-3"
              >
                <Form.Control as="textarea" maxLength={1000}/>
              </FloatingLabel>
            </Col>
			<Col>
			  <FloatingLabel
                controlId="floatingInput"
                label="Snippet"
                className="mb-3"
              >
                <Form.Control as="text"/>
              </FloatingLabel>
			  <Button>Submit</Button>
            </Col>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
