"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";

import languages from "/constants/enums/language";

import { getParticipationByUserIdFilter } from "/api/projectParticipationServices";
import { setBasicInfo } from "/store/reducers/draftProject";

const doneProjectStatus = 7;
const decorProjectType = 0;

function BasedOnDecorProjectField() {
  const user = useSelector((state) => state.user);
  const draftProject = useSelector((state) => state.draftProject);
  const [projects, setProjects] = useState([]);
  const [value, setValue] = useState(draftProject.basedOnDecorProjectId);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getParticipationByUserIdFilter(
            user.id,
            doneProjectStatus,
            decorProjectType
          );
          setProjects(data.value);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, []);

  return (
    <div className="form-field">
      <label className="mb-1">Based on Decor Project:</label>
      <Autocomplete
        size="small"
        value={value}
        options={projects}
        onChange={(event, newValue) => setValue(newValue)}
        getOptionLabel={(option) => option.Name}
        sx={{ width: "30rem", mx: 2, my: "auto" }}
        renderInput={(params) => (
          <TextField key={params.id} {...params} label="Project" />
        )}
      />
    </div>
  );
}

export default function ConstructionBasicInfo() {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12 my-auto">
            <h3>Resources</h3>
            <p>Choose a Decor Project or Upload Files</p>
          </div>
          <div className="col col-lg-12 col-12">
            <div className="form-field">
              <BasedOnDecorProjectField></BasedOnDecorProjectField>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
