import React, { useState, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { classNames } from 'primereact/utils';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
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
import { ManagerService } from '../services/ManagerService';
import { Dialog } from 'primereact/dialog';
import { Button as ButtonPrime } from 'primereact/button';

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
    },
    "& .MuiInputLabel-formControl": {
      right: '0',
      marginRight: '20px',
      left: 'auto !important'
    }
  }
}));

export default function SignUp(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = props.history;
  const [userNameExistError, setUserNameExistError] = useState<any>(undefined);
  const managerService = new ManagerService();
  const timerRef = useRef<any>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('שדה חובה')
      .min(5, 'חייב להיות לפחות 5 תווים כולל רווח')
      .max(30, 'לא יכול להיות יותר מ-30 תווים')
      .matches(/^[א-תa-zA-Z]{2,} [א-תa-zA-Z]{2,} ?[א-תa-zA-Z]*$/, 'מכיל רווח בין השם לשם משפחה'),
    userName: Yup.string()
      .required('שדה חובה')
      .min(6, 'שם משתמש חייב להיות לפחות 6 תווים')
      .max(20, 'שם משתמש לא יכול להיות יותר מ20 תווים')
      .matches(/^[a-zA-Z0-9]+$/, 'שם משתמש ללא רווח ומכיל אותיות באנגלית ומספרים בלבד'),
    email: Yup.string()
      .required('שדה חובה')
      .matches(/^[a-zA-z0-9.]{6,}@[a-zA-Z]{2,}.[a-zA-Z]{2,}$/, "מייל לא תקין"),
    phoneNumber: Yup.string()
      .required('שדה חובה')
      .min(9, 'מספר טלפון מכיל לפחות 9 ספרות')
      .max(10, 'מספר טלפון לא יכול להכיל יותר מ10 ספרות')
      .matches(/^[0-9]+$/, "מספר טלפון לא תקין"),
    password: Yup.string()
      .required('שדה חובה')
      .min(6, 'סיסמא חייבת להיות לפחות 6 תווים')
      .max(40, 'הסיסמא לא יכולה להיות יותר מ40 תווים')
      .matches(/[+a-zA-z][a-zA-z0-9]+$/, 'סיסמא מכילה לפחות אות אחת באנגלית ומספרים בלבד')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onChangeUserName = async (e: any) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (e.target.value.length >= 6) {
      timerRef.current = setTimeout(async () => {
        const isUserNameExist: any = await managerService.getIsUserNameExist(e.target.value).then((res: any) => res);
        if (isUserNameExist)
          setUserNameExistError("שם משתמש תפוס");
        else
          setUserNameExistError(undefined);
      }, 2000);
    }
  }

  //פונקציה שיוצרת משתמש חדש
  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    setName(data.fullName);
    //הכנסת משתמש ולהגדיר אותו ברירת מחדל חסום
    const newManager = {
      FullName: data.fullName,
      UserName: data.userName,
      Email: data.email,
      Password: data.password,
      PhoneNumber: data.phoneNumber,
      Active: false,
      Blocked: true
    }
    try {
      managerService.insertManager(newManager);
      //שליחת הודעה במייל : קריאת שרת לפונקציית שליחת מייל
      managerService.sendEmail(newManager);
      setShowMessage(true);
      reset();
    }
    catch {
      console.log("no sucsees");
    }
  }
  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <ButtonPrime label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
    </div>
  )

  return (
    <div className="form-domo">
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>ההרשמה בוצעה בהצלחה!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            שלום {name}!<br />
            החשבון לא פעיל כרגע
            הנתונים יבדקו ואם נאשר
            ישלח לך מייל בשבועות הקרובים עם הקישור הפעיל
          </p>
        </div>
      </Dialog>
      <Container component="main" maxWidth="xs" className="sign-style">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="שם פרטי ומשפחה"
                  autoFocus
                  className={classes.root}
                  {...register('fullName')}
                  error={errors.fullName ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.fullName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="שם משתמש"
                  className={classes.root}
                  {...register('userName')}
                  onChange={onChangeUserName}
                  error={errors.userName ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.userName?.message}
                  {userNameExistError}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
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
                <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="טלפון"
                  type="phoneNumber"
                  id="phoneNumber"
                  autoComplete="phoneNumber"
                  {...register('phoneNumber')}
                  error={errors.phoneNumber ? true : false}
                  className={classes.root}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.phoneNumber?.message}
                </Typography>
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
    </div>
  );
}