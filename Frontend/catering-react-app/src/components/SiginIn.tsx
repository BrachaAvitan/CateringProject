import React from 'react';
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
    "& .MuiFormLabel-root.Mui-error":{
      color: 'red !important'
    },
    "& .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline":{
      color: 'red !important'
    }
  }
}));

export default function SignIn(props: any) {
  const dispatch = useDispatch();
  const history = props.history;

  const classes = useStyles();

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

  //פונקציה שמכניסה משתמש
  const onSubmit = async (data:any) =>{
      console.log(JSON.stringify(data, null, 2));
      try{
        const manager :any = await api.get(`/Manager/Login?name=${data.userName}&password=${data.password}`).then(res=> res.data);
        if(manager){
          history.push('/orders');
          alert(JSON.stringify(manager, null, 2));
          console.log(manager.name);
          dispatch({type:'USER_CONNECTION', payload: {managerId: manager.managerId, name: manager.name, password: manager.password}});
        }
        else{
          alert("שם משתמש או סיסמא אינם נכונים")
          history.push('/SiginIn');
        }
      }
      catch{
        
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
          />
          <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
          </Typography>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
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