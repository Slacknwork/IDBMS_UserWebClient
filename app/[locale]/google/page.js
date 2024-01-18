"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box, CircularProgress, Typography } from "@mui/material";

import logo from "/public/images/idt-logo.jpg";

import { loginByGoogle } from "/services/authenticationServices";

import { login } from "/store/reducers/customer";

export default function AuthGoogleCallbackPage() {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();

  const googleLoginServer = async () => {
    try {
      const googleToken = session?.data?.id_token;
      const response = await loginByGoogle({ googleToken });
      dispatch(login(response));
      router.push("/project");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    if (session?.data?.id_token) {
      googleLoginServer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{ my: "auto", mx: "auto", color: "#CAAD06" }}
            size={175}
            thickness={2}
          ></CircularProgress>
          <Image
            src={logo}
            alt="IDT"
            width={75}
            height={75}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              // add more styling as needed
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {/* <Typography variant="h6" sx={{ mb: 1 }}>
              Đang đăng nhập bằng tài khoản Google...
            </Typography>
            <Typography variant="p">
              <Link href="/authentication/engineer-login">Click vào đây</Link>{" "}
              để trở về màn hình Đăng nhập
            </Typography> */}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
