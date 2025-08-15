import './App.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import Rules from './pages/Rules';

export default function App() {
  return (
    <>
      <Navbar bg="light" expand="md" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Next Station</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/play">Play</Nav.Link>
              <Nav.Link as={Link} to="/rules">Rules</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </>
  );
}
