import React, { useState, FormEvent, useEffect } from "react";
import { Box, Button, Container, TextField, Typography, Link, Paper } from "@mui/material";
import Image from "next/image";
import { axiosPost } from "../utils/apis/axios";
import API from "../configs/API";
import { useDispatch, useSelector } from "react-redux";
import { login, loginFailure } from "../redux/reducer/authSlice";
import Routes from '../utils/Route';
import { useRouter } from "next/router";
import useStyles from "../styles/login/useLoginStyle";
import { RootState } from "@/utils/types";
import { reactLocalStorage } from "reactjs-localstorage";
import Logo from "../images/logo.png";

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { success, data } = await axiosPost(API.AUTH.LOGIN, {
      username: username,
      password: password,
    });
    if (success) {
      router.push(Routes.Home);
      dispatch(login(data));
    } else {
      dispatch(loginFailure(data));
    }
  };

  const handleNavigateSignUp = () => {
    router.push(Routes.Signup);
  }

  useEffect(() => {
    const accessToken = reactLocalStorage.get('accessToken');
    if (accessToken && isLoggedIn) {
      router.push(Routes.Home);
    }
  }, [isLoggedIn, router]);

  return (
    <Container component="main" maxWidth={false} className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.logoContainer}>
          <Image src={Logo} alt="Logo" className={classes.logo} />
        </div>
        <Typography component="h1" variant="h5" className={classes.title} >
          QUẢN LÝ HỌC SINH
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
