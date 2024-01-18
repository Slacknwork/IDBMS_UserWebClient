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
import { loginUser } from "/services/authenticationServices";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";

const LoginPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const t = useTranslations("Login");
  const er = useTranslations("Error");

  const user = useSelector((state) => state.customer);

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

    setEmailError(isEmailValid ? "" : er("InvalidEmail"));

    return isEmailValid;
  };

  const validatePassword = () => {
    const isPasswordValid = value.password && value.password.trim() !== "";

    setPasswordError(isPasswordValid ? "" : er("RequirePassword"));

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
        toast.error(er("LoginFailed"));
      }
    } else {
      toast.error(er("FixValidation"));
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: `/${params.locale}/google` });
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>{t("SignIn")}</h2>
        <p>{t("SignInAccount")}</p>
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
              <TextField
                className="inputOutline"
                fullWidth
                placeholder={t("Password")}
                value={value.password}
                variant="outlined"
                name="password"
                type="password"
                label={t("Password")}
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
                  {t("ForgotPassword")}
                </Link>
              </Grid>
              <Grid className="formFooter">
                <Button fullWidth className="cBtnTheme" type="submit">
                  {t("Login")}
                </Button>
              </Grid>
              <Grid className="loginWithSocial">
                <p>- {t("Or")} -</p>
              </Grid>
              <Grid className="loginWithSocial">
                <Button
                  className="google"
                  onClick={handleGoogleLogin}
                  style={{ background: "#DB4437" }}
                >
                  <i className="fa fa-google"></i>
                </Button>
              </Grid>
              <p className="noteHelp">
                {t("NoAccount")} <Link href="/register">{t("Register")}</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
