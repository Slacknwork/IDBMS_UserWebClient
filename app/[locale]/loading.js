"use client";

import Image from "next/image";
import { Box, CircularProgress } from "@mui/material";

import logo from "/public/images/idt-logo.jpg";

export default function AuthGoogleCallbackPage() {
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
