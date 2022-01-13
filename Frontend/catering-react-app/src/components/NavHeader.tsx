import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
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
import EventsCalendar from './calendar/EventsCalendar';
import { Avatar } from '@mui/material';
import logo from '../assets/logo.jpg';
import Home from './Home';
import SignOut from './SignOut';

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

function NavHeader(props: any){
    const classes = useStylesNav();
    let { path, url } = useRouteMatch();
    const history = props.history;
    console.log(url);

    const toSignOut = () =>{
      debugger
      if(history.location.pathname === '/')
           history.push('/SignOut');
      else
          history.push(`${history.location.pathname}/SignOut`);
    }

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
                    {/* <NavDropdown.Item href="/myAccount" className={classes.dropdown}>פרופילים</NavDropdown.Item> */}
                    <NavDropdown.Item href="/SiginIn" className={classes.dropdown}>התחברות</NavDropdown.Item>
                    <NavDropdown.Item href="/SiginUp" className={classes.dropdown}>הרשמה</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className={classes.dropdown} onClick={toSignOut}>התנתקות</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              {/* </Container> */}
            </Navbar>

        <Switch>
              <Route path="/recipes" exact component={Recipes}></Route>
              <Route path="/SignOut" component={SignOut} exact></Route>
              <Route path="/products/SignOut" component={SignOut} exact></Route>
              <Route path="/orders/SignOut" component={SignOut} exact></Route>
              <Route path="/recipes/SignOut" component={SignOut} exact></Route>
              <Route path="/products" component={Products}></Route>
              <Route path="/orders" exact component={EventsCalendar}></Route>
              <Route path="/about" exact></Route>
              <Route path="/" component={Home} exact></Route>
        </Switch>
        </>
    );
}

export default NavHeader;