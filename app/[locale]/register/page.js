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
import { login } from "/store/reducers/user";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const SignUpPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

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
      setConfirmPasswordError("Passwords must match!");
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

    setEmailError(isEmailValid ? "" : "Invalid format for email address");

    return isEmailValid;
  };

  const validatePhone = () => {
    const phoneRegex = /^(\+\d{1,2}\s?)?(\d{9}|\d{10})$/;
    const isPhoneValid = phoneRegex.test(user.phone);

    setPhoneError(isPhoneValid ? "" : "Invalid format for phone number");

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
      toast.error("All fields must be filled out.");
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
            toast.success("Registration successful!");
            dispatch(login(response.data));
            router.push("/");
          } else {
            throw new Error("Registration failed");
          }
        } catch (error) {
          console.error("Error registering user:", error);
          toast.error("Error registering user");
        }
      } else {
        toast.error("Please fix the validation errors before submitting.");
      }
    }
  };

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Signup</h2>
        <p>Signup your account</p>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Enter full name"
                user={user.name}
                variant="outlined"
                name="name"
                label="Name"
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
                placeholder="Enter password"
                user={user.password}
                variant="outlined"
                name="password"
                label="Password"
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
                placeholder="Confirm your password"
                user={user.confirm_password}
                variant="outlined"
                name="confirm_password"
                label="Confirm Password"
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
                placeholder="Enter address"
                user={user.address}
                variant="outlined"
                name="address"
                label="Address"
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
                placeholder="+84 779054212 or 0779054212"
                user={user.phone}
                variant="outlined"
                name="phone"
                label="Phone"
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
              <label>Date of Birth</label>
              <DatePicker
                selected={user.dateOfBirth}
                onChange={(date) => handleDateChange(date)}
              />
            </Grid>
            <Grid item xs={12}>
              Language
              <RadioGroup
                row
                user={user.language}
                onChange={(e) => changeHandler(e)}
                name="language"
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="English"
                  sx={{ paddingRight: 5 }}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Vietnamese"
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
                  Sign Up
                </Button>
              </Grid>
              <p className="noteHelp">
                Already have an account?{" "}
                <Link href="/login">Return to Sign In</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
