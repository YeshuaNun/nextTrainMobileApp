import { useEffect, useMemo, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, ProgressBar, Row, Stack } from "react-bootstrap";
import cardsJson from "../data/nextStationLondon/cards/station_cards.json"
import type { CardMeta } from "../types";
import { createDeckEngine } from "../engine";

export default function Play() {

  const CARDS = useMemo(() => cardsJson as CardMeta[], []);

  const [engine] = useState(() => createDeckEngine(CARDS));
  const [last, setLast] = useState<CardMeta | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    CARDS.forEach(c => { const i = new Image(); i.src = c.img; });
  }, [CARDS]);

  const drawn = engine.getDrawn();
  const finished = engine.isFinished();

  const drawnPct = Math.round((drawn.length / engine.getTotal()) * 100);
  const specialPct = Math.round((engine.getSpecialDrawn() / engine.getSpecialTarget()) * 100);

  function forceRefresh() { setVersion(v => v + 1); }

  function onDraw() {
    const c = engine.drawOne();
    if (c) setLast(c);
    forceRefresh();
  }

  function onNewRound() {
    engine.reset();
    setLast(null);
    forceRefresh();
  }

  return (
    <Container className="py-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h1 className="h4 mb-0">Play</h1>
        </Col>
        <Col className="text-end">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Badge bg="secondary">Drawn {drawn.length}/{engine.getTotal()}</Badge>
            <Badge bg="info" text="dark">Special {engine.getSpecialDrawn()}/{engine.getSpecialTarget()}</Badge>
            <Badge bg="dark">Remaining {engine.getRemainingCount()}</Badge>
          </Stack>
        </Col>
      </Row>

      {finished && (
        <Alert variant="success" className="mb-3">
          Round finished — {engine.getRemainingCount() === 0 ? 'all cards drawn.' : 'all special cards shown.'}
        </Alert>
      )}

      <Row className="g-3">
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            {/* If you built PlayingCard, you can swap the whole card with <PlayingCard card={last} /> */}
            {last ? (
              <Card.Img variant="top" src={last.img} alt={last.title} style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />
            ) : (
              <div style={{ aspectRatio: '3 / 4', background: '#111', display: 'grid', placeItems: 'center' }}>
                <span className="text-secondary">No card yet</span>
              </div>
            )}
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span>{last ? last.title : '—'}</span>
                <Badge bg={last?.category === 'SPECIAL' ? 'primary' : last ? 'success' : 'secondary'}>
                  {last ? last.category : '—'}
                </Badge>
              </Card.Title>

              <div className="mb-2">
                <div className="small text-muted mb-1">Round progress</div>
                <ProgressBar now={drawnPct} label={`${drawnPct}%`} />
              </div>
              <div>
                <div className="small text-muted mb-1">Specials shown</div>
                <ProgressBar variant="info" now={specialPct} label={`${specialPct}%`} />
              </div>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2 mt-3">
            <Button onClick={onDraw} disabled={finished} size="lg">
              {finished ? 'Round Finished' : 'Draw'}
            </Button>
            <Button variant="outline-secondary" onClick={onNewRound} size="lg">
              {finished ? 'New Round (reshuffle)' : 'Reset Round'}
            </Button>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>This round</Card.Title>
              {drawn.length === 0 ? (
                <p className="text-muted mb-0">Tap “Draw” to begin.</p>
              ) : (
                <div className="row g-2">
                  {drawn.map((c, i) => (
                    <div key={`${c.id}-${i}`} className="col-4 col-sm-3">
                      <img
                        src={c.img}
                        alt={c.title}
                        className="img-fluid rounded"
                        style={{ objectFit: 'cover', width: '100%', height: 'auto', border: '1px solid rgba(0,0,0,.125)' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}