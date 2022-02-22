import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
const Navigation = () => {
  return (
  <div className="container">
    <Navbar fixed="top" bg="white" expand="lg">
        <Navbar.Brand href="#home">PathFinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Starting Node</Nav.Link>
            <Nav.Link href="#link">Ending Node</Nav.Link>
            <Nav.Link href="#link">Walls</Nav.Link>
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Djikstra's</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">A*</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Run Algorithm</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  </div>
  );
}
export default Navigation;