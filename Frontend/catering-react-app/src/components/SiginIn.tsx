import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Cookie } from '../Cookies';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: 'rgba(223, 152, 20, 0.925)'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(128, 128, 128, 0.493)"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey"
    },
    "& .MuiOutlinedInput-input": {
      color: "rgba(128, 128, 128, 0.493)"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "grey"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "grey"
    },
    "& .MuiInputLabel-outlined": {
      color: "rgba(128, 128, 128, 0.493)"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "grey"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "grey"
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: 'red !important'
    },
    "& .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
      color: 'red !important'
    }
  }
}));

export default function SignIn(props: any) {
  const dispatch = useDispatch();
  const connectedUser = useSelector((state: any) => state.userReducer.connectedUser);
  const history = props.history;
  const cookie = new Cookie();
  const classes = useStyles();
  const [userName, setUserName] = useState(connectedUser.name);
  const [userPassword, setUserPassword] = useState(connectedUser.password);
  const [changeUser, setChangeUser] = useState(false);
  const [saveUser, setSaveUser] = useState(false);

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('UserName is required')
      .min(6, 'UserName must be at least 6 characters')
      .max(20, 'UserName must not exceed 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (cookie.getCookie("userId") && cookie.getCookie("userName") && cookie.getCookie("userPassword")) {
      setUserName(cookie.getCookie("userName"));
      setUserPassword(cookie.getCookie("userPassword"));
      setSaveUser(true);
    }
  }, []);

  const changeValueName = (e: any) => {
    setChangeUser(true);
    setUserName(e.target.value);
  }
  const changeValuePassword = (e: any) => {
    setChangeUser(true);
    setUserPassword(e.target.value);
  }

  const onChangeValueRemember = (e: any) => {
    if (e.target.checked) {
      e.target.value = "remember";
      setSaveUser(true);
    }
    else {
      e.target.value = "dontRemember";
      setSaveUser(false);
    }
  }

  //פונקציה שבודקת האם המשתמש קיים ומעבירה אותו לדף ניהול הזמנות
  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    try {
      const manager: any = await api.get(`/Manager/Login?name=${data.userName}&password=${data.password}`).then(res => res.data);
      if (manager) {
        //debugger
        alert(JSON.stringify(manager, null, 2));
        if (changeUser && saveUser) {
          console.log(manager.name);
          cookie.setCookie("userId", manager.managerId, 365);
          cookie.setCookie("userName", manager.name, 365);
          cookie.setCookie("userPassword", manager.password, 365);
        }
        else if(!saveUser){
          cookie.deleteCookie("userId");
          cookie.deleteCookie("userName");
          cookie.deleteCookie("userPassword");
        }
        dispatch({ type: 'USER_CONNECTION', payload: { managerId: manager.managerId, name: manager.name, password: manager.password } });
        history.push('/orders');
      }
      else {
        alert("שם משתמש או סיסמא אינם נכונים")
        history.push('/SiginIn');
      }
    }
    catch {

    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            className={classes.root}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="שם משתמש"
            autoComplete="userName"
            autoFocus
            {...register('userName')}
            error={errors.userName ? true : false}
            value={userName}
            onChange={changeValueName}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.userName?.message}
          </Typography>
          <TextField
            className={classes.root}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="סיסמא"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password ? true : false}
            value={userPassword}
            onChange={changeValuePassword}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" onChange={onChangeValueRemember} checked ={saveUser} />}
            label="זכור אותי"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`p-button ${classes.submit}`}
            onClick={handleSubmit(onSubmit)}
          >
            התחברות
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/passwordForget">
                שכחת סיסמא?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/SiginUp">
                {"אין לך חשבון? הרשמה"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}