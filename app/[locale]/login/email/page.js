"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useRouter } from "/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "/store/reducers/customer";
import { sendEmailForgotPassword } from "/services/authenticationServices";
import { useTranslations } from "next-intl";

const LoginPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const t = useTranslations("ForgotPassword");
  const er = useTranslations("Error");

  const user = useSelector((state) => state.customer);

  const [value, setValue] = useState({
    email: "",
    password: "",
    // remember: false,
  });

  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(value.email);

    setEmailError(isEmailValid ? "" : er("InvalidEmail"));

    return isEmailValid;
  };

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();

    if (isEmailValid) {
      try {
        const response = await sendEmailForgotPassword(value.email);
        toast.info(response.message);
      } catch (error) {
        console.error("Error login :", error);
        toast.error(er("LoginFailed"));
      }
    } else {
      toast.error(er("FixValidation"));
    }
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>{t("Forgot")}</h2>
        <p>{t("ForgotSub")}</p>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Email"
                value={value.email}
                variant="outlined"
                name="email"
                label="Email"
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
                  href="/login"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {t("Back")}
                </Link>
              </Grid>
              <Grid className="formFooter">
                <Button fullWidth className="cBtnTheme" type="submit">
                  {t("Login")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
