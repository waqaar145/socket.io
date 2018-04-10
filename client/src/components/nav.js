import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
  } from 'reactstrap';

import './nav.css'
import {NavLink} from 'react-router-dom'

class FaasosNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
      <Container>
        <Navbar color="faded" light expand="md" style={{borderBottom: '1px solid grey'}}>
          <NavbarBrand href="/">Dalviroo</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/add-dish">Add Dish</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/kitchen-display">Kitchen Display </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/sample-report">Sample Report</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <br /><br />
      </Container>
    );
  }
}

export default FaasosNav;
