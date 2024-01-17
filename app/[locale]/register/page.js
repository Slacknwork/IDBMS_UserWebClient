"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useRouter } from "/navigation";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import DatePicker from "react-datepicker";
import { registerUser } from "/services/authenticationServices";
import { login } from "/store/reducers/customer";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslations } from "next-intl";

const SignUpPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("Register");
  const er = useTranslations("Error");

  const [user, setUser] = useState({
    email: "",
    bio: null,
    name: "",
    password: "",
    confirm_password: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    language: 1,
    externalId: null,
  });

  const changeHandler = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setUser({ ...user, [fieldName]: fieldValue });
  };

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const confirmMessage = () => {
    if (user.password !== user.confirm_password) {
      setConfirmPasswordError(er("MatchPassword"));
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(user.email);

    setEmailError(isEmailValid ? "" : er("InvalidEmail"));

    return isEmailValid;
  };

  const validatePhone = () => {
    const phoneRegex = /^(\+\d{1,2}\s?)?(\d{9}|\d{10})$/;
    const isPhoneValid = phoneRegex.test(user.phone);

    setPhoneError(isPhoneValid ? "" : er("InvalidPhone"));

    return isPhoneValid;
  };

  const handleDateChange = (date) => {
    console.log(date);
    setUser({
      ...user,
      dateOfBirth: date,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const nonNullableFields = [
      "email",
      "name",
      "password",
      "phone",
      "address",
      "language",
    ];
    if (
      nonNullableFields.some(
        (field) => user[field] === null || user[field] === ""
      )
    ) {
      toast.error(er("FillFields"));
    } else {
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isPasswordConfirmed = confirmMessage();

      if (isEmailValid && isPhoneValid && isPasswordConfirmed) {
        const formattedUser = {
          ...user,
          dateOfBirth: user.dateOfBirth
            ? new Date(user.dateOfBirth).toISOString()
            : null,
          language: user.language ? parseInt(user.language) : null,
        };

        try {
          console.log(formattedUser);
          const response = await registerUser(formattedUser);
          console.log(response);
          if (response.data != null) {
            toast.success(t("RegistrationSuccessful"));
            dispatch(login(response.data));
            router.push("/");
          } else {
            throw new Error("Registration failed");
          }
        } catch (error) {
          console.error("Error registering user:", error);
          toast.error(er("RegistrationFailed"));
        }
      } else {
        toast.error(er("FixValidation"));
      }
    }
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>{t("Signup")}</h2>
        <p>{t("SignupAccount")}</p>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder={t("EnterName")}
                user={user.name}
                variant="outlined"
                name="name"
                label={t("Name")}
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Email"
                user={user.email}
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
                placeholder={t("EnterPassword")}
                user={user.password}
                variant="outlined"
                name="password"
                label={t("Password")}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder={t("ConfirmYourPassword")}
                user={user.confirm_password}
                variant="outlined"
                name="confirm_password"
                label={t("ConfirmPassword")}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => {
                  changeHandler(e);
                  confirmMessage();
                }}
                onChange={(e) => changeHandler(e)}
              />
              {confirmPasswordError && (
                <span className="errorMessage">{confirmPasswordError}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder={t("EnterAddress")}
                user={user.address}
                variant="outlined"
                name="address"
                label={t("Address")}
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder={t("PhoneNumber")}
                user={user.phone}
                variant="outlined"
                name="phone"
                label={t("Phone")}
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => {
                  changeHandler(e);
                  validatePhone();
                }}
                onChange={(e) => changeHandler(e)}
              />
              {phoneError && <span className="errorMessage">{phoneError}</span>}
            </Grid>
            <Grid item xs={12}>
              <label>{t("DateOfBirth")}</label>
              <DatePicker
                selected={user.dateOfBirth}
                onChange={(date) => handleDateChange(date)}
              />
            </Grid>
            <Grid item xs={12}>
            {t("Language")}
              <RadioGroup
                row
                user={user.language}
                onChange={(e) => changeHandler(e)}
                name="language"
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label={t("English")}
                  sx={{ paddingRight: 5 }}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label={t("Vietnamese")}
                  sx={{ paddingRight: 5 }}
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={12}>
              <Grid className="formFooter">
                <Button
                  fullWidth
                  className="cBtn cBtnLarge cBtnTheme"
                  type="submit"
                >
                  {t("SignUp")}
                </Button>
              </Grid>
              <p className="noteHelp">
              {t("HaveAccount")}{" "}
                <Link href="/login">{t("ReturnSignIn")}</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
