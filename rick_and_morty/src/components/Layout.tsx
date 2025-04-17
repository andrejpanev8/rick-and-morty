import { Outlet, Link } from 'react-router-dom';
import { Container, Navbar, Nav, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Layout.css';

export default function Layout() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="site-wrapper">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            {t('title')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/pagination" className="mx-2">
                {t('pagination')}
              </Nav.Link>
              <Nav.Link as={Link} to="/scrolled" className="mx-2">
                {t('scrolled')}
              </Nav.Link>
            </Nav>

            <ButtonGroup className="ms-3">
              <Button
                variant={i18n.language === 'en' ? 'primary' : 'outline-primary'}
                onClick={() => changeLanguage('en')}
              >
                EN
              </Button>
              <Button
                variant={i18n.language === 'de' ? 'primary' : 'outline-primary'}
                onClick={() => changeLanguage('de')}
              >
                DE
              </Button>
            </ButtonGroup>
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
            © {new Date().getFullYear()} {t('title')}
          </p>
        </Container>
      </footer>
    </div>
  );
}
