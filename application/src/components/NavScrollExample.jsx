import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MdPostAdd, MdMessage } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavScrollExample({ onLogout, onSearch, onDownload, onTCP }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate(); 

  const goToAbout = () => {
    navigate('/about');
  };

  const goToHome = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <Navbar bg="primary" expand="md" className="bg-primary mx-5 ps-2 py-3 shadow-lg" >
      <Container fluid>
      <MdMessage />
        <Navbar.Brand >Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" onClick={goToHome}>Home</Nav.Link>
            <Nav.Link href="#action2" onClick={onLogout}>Log out</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3" onClick={goToAbout}>About the developer</NavDropdown.Item>
              <NavDropdown.Item href="#action4" onClick={onDownload}>
                Download all tasks (JSON)
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4" onClick={onTCP}>
                Check TCP communication
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchInput}
              onChange={handleInputChange}
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;