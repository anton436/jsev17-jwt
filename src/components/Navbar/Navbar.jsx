import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContextProvider";
import favoritesIcon from "../../assets/heart.svg";

function NavScrollExample() {
  const navigate = useNavigate();
  const { currentUser, logout, checkAuth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      checkAuth();
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate("/register")}>
                Register
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/login")}>
                Login
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Product" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigate("/add")}>
                Add
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/products")}>
                Products
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              {currentUser ? currentUser : "No auth user"}
            </Nav.Link>
          </Nav>
          <img
            width={30}
            src={favoritesIcon}
            style={{ cursor: "pointer" }}
            alt=""
            onClick={() => navigate("/favorites")}
          />
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
