"use client";

import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useRouter } from "/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyAuthenPassword,
  updatePassword,
} from "/services/authenticationServices";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";

const LoginPage = (props) => {
  const emailQuery = "email";
  const codeQuery = "code";
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("Login");
  const er = useTranslations("Error");

  const user = useSelector((state) => state.customer);

  const [value, setValue] = useState({
    password: "",
    confirmPassword: "",
    // remember: false,
  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = () => {
    const isPasswordValid = value.password && value.password.trim() !== "";
    const isConfirmPasswordValid = value.password === value.confirmPassword;
    setPasswordError(isPasswordValid ? "" : er("RequirePassword"));
    setConfirmPasswordError(isConfirmPasswordValid ? "" : "Khác mật khẩu!");
    return isPasswordValid && isConfirmPasswordValid;
  };

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const [token, setToken] = useState("");
  const verifyAuthenCode = async () => {
    try {
      const email = searchParams.get(emailQuery) ?? "";
      const code = searchParams.get(codeQuery) ?? "";
      const response = await verifyAuthenPassword({ email, code });
      response?.data ? setToken(response.data) : router.push("/login/email");
    } catch (error) {
      toast.error("Lỗi!");
      router.push("/login/email");
    }
  };

  const onUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const email = searchParams.get(emailQuery) ?? "";
      const newPassword = value.password;
      const response = await updatePassword({ email, newPassword }, token);
      if (response) {
        toast.success("Update Password successful!");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Lỗi!");
    }
  };

  useEffect(() => {
    if (!token) verifyAuthenCode();
  }, []);

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>Update Password</h2>
        <p>Change Password</p>
        <form onSubmit={onUpdatePassword}>
          <Grid container spacing={3}>
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
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Confirm Password"
                value={value.confirmPassword}
                variant="outlined"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => {
                  changeHandler(e);
                  validatePassword();
                }}
                onChange={(e) => changeHandler(e)}
              />
              {confirmPasswordError && (
                <span className="errorMessage">{confirmPasswordError}</span>
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
                  href="/login"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Trở về Đăng nhập
                </Link>
              </Grid>
              <Grid className="formFooter">
                <Button fullWidth className="cBtnTheme" type="submit">
                  Cập nhật
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
