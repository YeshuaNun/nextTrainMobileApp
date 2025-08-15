import { Button, Col, Container, Row } from "react-bootstrap";

const PDF_URL = import.meta.env.BASE_URL+'/docs/NextStationLondon-Rules-EN.pdf'


export default function Rules() {
  return (
    <Container fluid className="py-3">
      <Row className="mb-2">
        <Col className="d-flex justify-content-between align-items-center">
          <h1 className="h5 mb-0">Rules</h1>
          <div className="d-flex gap-2">
            <Button as="a" href={PDF_URL} target="_blank" rel="noopener">
              Open in New Tab
            </Button>
            <Button as="a" href={PDF_URL} download variant="outline-secondary">
              Download PDF
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div style={{ height: '80vh', border: '1px solid rgba(0,0,0,.1)', borderRadius: 8, overflow: 'hidden' }}>
            <iframe
              title="Rules PDF"
              src={`${PDF_URL}#toolbar=1&navpanes=0&view=FitH`}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}