import React from 'react';
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
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import api from '../api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
    marginTop: theme.spacing(3),
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
    }
  }
}));

export default function SignUp(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = props.history;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(6, 'Name must be at least 6 characters')
        .max(20, 'Name must not exceed 20 characters'),
    userName: Yup.string()
        .required('Name is required')
        .min(6, 'Name must be at least 6 characters')
        .max(20, 'Name must not exceed 20 characters'),
    email: Yup.string()
        .required('email is required'),
        // .min(6, 'email must be at least 6 characters')
        // .max(20, 'email must not exceed 20 characters'),
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

  //פונקציה שיוצרת משתמש חדש
  const onSubmit = async (data:any) =>{
      console.log(JSON.stringify(data, null, 2));
      const newManager = {
        name: data.userName,
        email: data.email,
        password: data.password,
        // phoneNumber: data.phoneNumber
      }
      try{
          await api.post(`/Manager/InsertManager`,newManager).then(res=> res.data);
          const all : any = await api.get(`/Manager/Manager`).then(res=> res.data);
          alert(JSON.stringify(all, null, 2));
          console.log(all);
         // dispatch({type:'USER_CONNECTION', payload: {name: manager.name, password: manager.password}});
      }
      catch{
          console.log("no sucsees");
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
          הרשמה
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="שם פרטי ומשפחה"
                autoFocus
                className={classes.root}
                {...register('name')}
                error={errors.name ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="שם משתמש"
                autoComplete="userName"
                {...register('userName')}
                error={errors.userName ? true : false}
                className={classes.root}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="דואר אלקטרוני"
                autoComplete="email"
                {...register('email')}
                error={errors.email ? true : false}
                className={classes.root}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                error={errors.password ? true : false}
                className={classes.root}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="אני מעוניין לקבל הודעות ועדכונים באמצעות הדואר האלקטרוני"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`p-button ${classes.submit}`}
            onClick={handleSubmit(onSubmit)}
          >
            הרשמה
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/SiginIn" className="link-sign">
               כבר יש לך חשבון? התחברות
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}