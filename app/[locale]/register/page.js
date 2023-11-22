"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Link } from "/navigation";
import { FormControl, FormControlLabel, InputLabel, Radio, RadioGroup } from "@mui/material";
import { Select } from "flowbite-react";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

const SignUpPage = (props) => {
  const router = useRouter();

  const [value, setValue] = useState({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
    language: "Vietnamese",
  });

  const changeHandler = (e) => {
    // setValue({ ...value, [e.target.name]: e.target.value });
    // validator.showMessages();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setValue({ ...value, [fieldName]: fieldValue });

    // Validate the specific field
    validator.showMessageFor(fieldName);
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const confirmMessage = () => {
    if (value.password !== value.confirm_password) {
      setConfirmPasswordError("Passwords must match!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      setValue({
        email: "",
        full_name: "",
        password: "",
        confirm_password: "",
      });
      validator.hideMessages();
      toast.success("Registration Complete successfully!");
      router.push("/login");
    } else {
      validator.showMessages();
      toast.error("Empty field is not allowed!");
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
                value={value.name}
                variant="outlined"
                name="name"
                label="Name"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message(
                "name",
                value.name,
                "required|alpha"
              )}
            </Grid>
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
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message("email", value.email, "required|email")}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Enter password"
                value={value.password}
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
              {validator.message("password", value.password, "required")}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Confirm your password"
                value={value.confirm_password}
                variant="outlined"
                name="confirm_password"
                label="Confirm Password"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={
                  (e) => {
                    changeHandler(e);
                    confirmMessage();
                  }
                }
                onChange={(e) => changeHandler(e)}
              />
              {validator.message(
                "confirm_password",
                value.confirm_password,
                "required"
              )}
              {confirmPasswordError && (
                <span className="errorMessage">{confirmPasswordError}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Enter address"
                value={value.address}
                variant="outlined"
                name="address"
                label="Address"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message(
                "address",
                value.address,
                "required"
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Enter phone"
                value={value.phone}
                variant="outlined"
                name="phone"
                label="Phone"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message(
                "phone",
                value.phone,
                "required|phone"
              )}
            </Grid>
            <Grid item xs={12}>
              Language
              <RadioGroup
                row
                value={value.language}
                onChange={(e) => changeHandler(e)}
                name="language"
              >
                <FormControlLabel value="Vietnamese" control={<Radio />} label="Vietnamese" sx={{ paddingRight: 5 }} />
                <FormControlLabel value="English" control={<Radio />} label="English" sx={{ paddingRight: 5 }} />
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
