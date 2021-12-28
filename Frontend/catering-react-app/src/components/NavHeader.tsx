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
import Recipes from './Recipes/Recipes';
import Products from './Products';
import Orders from './Home';
import EventsCalendar from './calendar/EventsCalendar';
import { Avatar } from '@mui/material';
import logo from '../assets/logo.jpg';
import Home from './Home';

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
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top"  style={{zIndex: 1000}}>
              {/* <Container> */}
              <Navbar.Brand href="/"><img src={logo} width="170px" style={{marginLeft: '100px'}}></img></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className={classes.nav}>
                  <Link to="/orders" className="link">אירועים</Link>
                  <Link to="/products" className="link">מוצרים</Link>
                  <Link to="/recipes" className="link">מתכונים</Link>
                  <Link to="/about" className="link">אודות</Link>
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
              {/* </Container> */}
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
        <Switch>
              <Route path="/recipes" exact component={Recipes}></Route>
              <Route path="/products" exact component={Products}></Route>
              <Route path="/orders" exact component={EventsCalendar}></Route>
              <Route path="/about" exact></Route>
              <Route path="/" component={Home} exact></Route>
        </Switch>
        </>
    );
}

export default NavHeader;