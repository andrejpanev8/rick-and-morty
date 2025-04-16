import { Outlet, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './Layout.css';

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            Rick & Morty Views
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/pagination" className="mx-2">
                Paginated
              </Nav.Link>
              <Nav.Link as={Link} to="/client-filter" className="mx-2">
                Client Filter
              </Nav.Link>
              <Nav.Link as={Link} to="/api-filter" className="mx-2">
                API Filter
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="site-content">
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>

      <footer className="site-footer bg-light py-3">
        <Container>
          <p className="text-center mb-0">
            © {new Date().getFullYear()} Rick & Morty Views
          </p>
        </Container>
      </footer>
    </div>
  );
}