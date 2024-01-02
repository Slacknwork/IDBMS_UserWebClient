"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import getBookmarksByUserId from "/services/bookmarkServices";
import { useRef } from "react";
import { getCommentsByProjectId } from "/services/commentServices";
import getInteriorItemCategories from "/services/interiorItemCategoryServices";

const APIPage = (props) => {
  const router = useRouter();

  const [values, setValues] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          // const data = await getBookmarksByUserId('7A2B1D40-1169-41BB-8062-06AD22F91744');

          // const data = await getCommentsByProjectId('ff090f51-e6e7-4854-8f3f-0402ee32c9f8');

          const data = await getInteriorItemCategories();

          setValues(data.data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      console.log("i fire once");
      fetchDataFromApi();
    }
  }, []);

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: "errorMessage",
    })
  );

  return (
    <Grid className="loginWrapper">
      <Grid className="loginForm">
        <h2>API testing</h2>
        <Grid container spacing={3}>
          {values.map((item, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder={`id ${index + 1}`}
                value={item.id}
                variant="outlined"
                name={`id_${index}`}
                label={`id ${index + 1}`}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {validator.message(`id_${index}`, item.id, "required")}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default APIPage;
