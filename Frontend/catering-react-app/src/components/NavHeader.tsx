import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SiginIn from './SiginIn';
import SiginUp from './SiginUp';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStylesNav = makeStyles((theme: Theme) =>
    createStyles({
      nav:{
        marginRight: '25%',
        marginLeft: '25%',
      },
      dropdown:{
        textAlign: 'start',
        textDecoration : 'none',
        color: 'black !important'
      }
    }),
);

function NavHeader(){
    const classes = useStylesNav();
    return(
      <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
              <Container>
              <Navbar.Brand href="/">הקיטרינג שלנו</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={classes.nav}>
                  <Link to="/orders" className="link">הזמנות</Link>
                  <Link to="/products" className="link">מוצרים</Link>
                  <Link to="/recipes" className="link">מתכונים</Link>
                  <Link to="/menus" className="link">תפריטים</Link>
                </Nav>
                <Nav className="me-auto">
                  <NavDropdown title="אזור אישי" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/myAccount" className={classes.dropdown}>פרופילים</NavDropdown.Item>
                    <NavDropdown.Item href="/SiginIn" className={classes.dropdown}>התחברות</NavDropdown.Item>
                    <NavDropdown.Item href="/SiginUp" className={classes.dropdown}>הרשמה</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/SiginOut" className={classes.dropdown}>התנתקות</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/* <Switch>
          <Route path="/#SiginIn" exact>
            <SiginIn />
          </Route>
          <Route path="/SiginUp" exact>
            <SiginUp />
          </Route>
          <Route path="/">
            <span>שלום דף הבית</span>
          </Route>
        </Switch> */}
        </>
    );
}

export default NavHeader;