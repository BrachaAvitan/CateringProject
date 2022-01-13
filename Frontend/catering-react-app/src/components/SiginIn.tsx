import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Cookie } from '../Cookies';
import { ManagerService } from '../services/ManagerService';

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
    backgroundColor: 'rgba(216, 93, 93, 0.973)'
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
      // color: "rgba(128, 128, 128, 0.493)"
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
    },
    "& .MuiInputLabel-formControl": {
      right: '0',
      marginRight: '20px',
      left: 'auto !important'
    }
  }
}));

export default function SignIn(props: any) {
  const dispatch = useDispatch();
  const connectedUser = useSelector((state: any) => state.userReducer.connectedUser);
  const history = props.history;
  const cookie = new Cookie();
  const managerService = new ManagerService();
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [errorConnection, setErrorConnection] = useState<any>(undefined);

  type FormData = {
    userName: string;
    password: string;
    remember: boolean;
    changeUser: boolean;
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('שדה חובה')
      .min(6, 'שם משתמש חייב להיות לפחות 6 תווים')
      .max(20, 'שם משתמש לא יכול להיות יותר מ20 תווים')
      .matches(/^[a-zA-Z0-9]+$/, 'שם משתמש ללא רווח ומכיל אותיות באנגלית ומספרים בלבד'),
    password: Yup.string()
      .required('שדה חובה')
      .min(6, 'סיסמא חייבת להיות לפחות 6 תווים')
      .max(40, 'הסיסמא לא יכולה להיות יותר מ40 תווים')
      .matches(/[+a-zA-z][a-zA-z0-9]+$/, 'סיסמא מכילה לפחות אות אחת באנגלית ומספרים בלבד')
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (cookie.getCookie("userId") && cookie.getCookie("userName") && cookie.getCookie("userPassword")) {
      setChecked(true);
      setValue("userName", cookie.getCookie("userName"));
      setValue("password", cookie.getCookie("userPassword"));
      setValue("remember", true);
      setValue("changeUser", false);
    }
  }, []);

  const onChangeValueRemember = (e: any) => {
    if (e.target.checked) {
      setValue("remember", true);
      setChecked(true);
    }
    else {
      setValue("remember", false);
      setChecked(false);
    }
  }

  const onChangeUser = (e: any) => {
    setErrorConnection("");
    setValue("changeUser", true);
  }

  //פונקציה שבודקת האם המשתמש קיים ומעבירה אותו לדף ניהול הזמנות
  const onSubmit = async (data: any) => {
      try {
        const manager: any = await managerService.getManager(data.userName, data.password).then((res: any) => res);
        if (manager) {
          debugger
          if (!manager.blocked) {
            if (data.changeUser && data.remember) {
              console.log(manager.name);
              cookie.setCookie("userId", manager.managerId, 365);
              cookie.setCookie("userName", manager.userName, 365);
              cookie.setCookie("userPassword", manager.password, 365);
            }
            else if (!data.changeUser && !data.remember) {
              cookie.deleteCookie("userId");
              cookie.deleteCookie("userName");
              cookie.deleteCookie("userPassword");
            }
            dispatch({ type: 'USER_CONNECTION', payload: { managerId: manager.managerId, name: manager.userName, password: manager.password } });
            history.push('/');
          }
          else {
            setErrorConnection('משתמש זה לא פעיל להפעלתו אנא צור קשר עם התמיכה');
          }
        }
        else {
          setErrorConnection("שם משתמש או סיסמא אינם נכונים");
        }
      }
      catch {

      }
  }

  return (
    <Container component="main" maxWidth="xs" className="sign-style">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={classes.root}
            variant="outlined"
            margin="normal"
            fullWidth
            id="userName"
            label="שם משתמש"
            required
            autoComplete="userName"
            autoFocus
            {...register('userName')}
            onBlur={onChangeUser}
            error={errors.userName ? true : false}
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
            onChange={onChangeUser}
            error={errors.password ? true : false}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography><br></br>
          <Typography variant="inherit" color="textSecondary">
            {errorConnection}
          </Typography><br></br>
          <div className="remember-button">
            <FormControlLabel
              control={<Checkbox {...register('remember')} onChange={onChangeValueRemember} checked={checked} />}
              label="זכור אותי"
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`p-button ${classes.submit}`}
          >
            התחברות
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/passwordForget" className="link-sign">
                שכחת סיסמא?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/SiginUp" className="link-sign">
                {"אין לך חשבון? הרשמה"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}