import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export const NavBar = () => {
  return (
    <>
      <Navbar
        color="primary"
        expand="md"
      >
        <Nav navbar>
          <NavbarBrand href="/">Hillary's Haircare</NavbarBrand>
          <NavItem>
            <NavLink href="/stylists">Stylists</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};
