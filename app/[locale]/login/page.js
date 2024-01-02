"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useRouter } from "/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "/store/reducers/user";
import { loginUser } from "/services/authenticationServices";

const LoginPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [value, setValue] = useState({
    email: "",
    password: "",
    // remember: false,
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(value.email);

    setEmailError(isEmailValid ? "" : "Invalid format for email address");

    return isEmailValid;
  };

  const validatePassword = () => {
    const isPasswordValid = value.password && value.password.trim() !== "";

    setPasswordError(isPasswordValid ? "" : "Password is required");

    return isPasswordValid;
  };

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await loginUser(value);
        console.log(response);
        if (response.data != null) {
          toast.success("Login successfully!");
          dispatch(login(response.data));
          router.push("/project");
        } else {
          throw new Error("Login failed!");
        }
      } catch (error) {
        console.error("Error login :", error);
        toast.error("Error login!");
      }
    } else {
      toast.error("Please fix the validation errors before submitting.");
    }
  };
  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Sign In</h2>
        <p>Sign in to your account</p>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="E-mail"
                value={value.email}
                variant="outlined"
                name="email"
                label="E-mail"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => {
                  changeHandler(e);
                  validateEmail();
                }}
                onChange={(e) => changeHandler(e)}
              />
              {emailError && <span className="errorMessage">{emailError}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Password"
                value={value.password}
                variant="outlined"
                name="password"
                type="password"
                label="Password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => {
                  changeHandler(e);
                  validatePassword();
                }}
                onChange={(e) => changeHandler(e)}
              />
              {passwordError && (
                <span className="errorMessage">{passwordError}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <Grid className="formAction">
                {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={value.remember}
                    onChange={rememberHandler}
                  />
                }
                label="Remember Me"
              /> */}
                <Link
                  href="/forgot-password"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid className="formFooter">
                <Button fullWidth className="cBtnTheme" type="submit">
                  Login
                </Button>
              </Grid>
              <Grid className="loginWithSocial">
                <p>- or -</p>
              </Grid>
              <Grid className="loginWithSocial">
                <Button className="google" style={{ background: "#DB4437" }}>
                  <i className="fa fa-google"></i>
                </Button>
              </Grid>
              <p className="noteHelp">
                Don't have an account?{" "}
                <Link href="/register">Register account</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
