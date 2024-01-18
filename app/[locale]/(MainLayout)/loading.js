"use client";

import { Box, CircularProgress } from "@mui/material";

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
            size={85}
            thickness={4}
          ></CircularProgress>
        </Box>
      </Box>
    </div>
  );
}
