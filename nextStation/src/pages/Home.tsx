import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h4 mb-1">Next Station</h1>
          <p className="text-muted mb-0">Choose an option to get started.</p>
        </Col>
      </Row>

      <Row className="g-3">
        <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Play Game</Card.Title>
              <Card.Text className="text-muted flex-grow-1">
                Start a new round and draw cards until the stop condition is reached.
              </Card.Text>
              <div className="d-grid">
                <Button onClick={() => navigate('/play')} size="lg">
                  Start Game
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>View Rules</Card.Title>
              <Card.Text className="text-muted flex-grow-1">
                Read the game rules in PDF format. Available offline once opened.
              </Card.Text>
              <div className="d-grid">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate('/rules')}
                  size="lg"
                >
                  View Rules
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}