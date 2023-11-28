"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";

import languages from "/constants/enums/language";

import { getAllProjectCategories } from "/api/projectCategoryServices";
import { getProjectsByUserIdFilter } from "/api/projectParticipationServices";
import { setBasicInfo } from "/store/reducers/draftProject";

const doneProjectStatus = 7;

function ProjectCategoryField() {
  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(draftProject.projectCategoryId);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllProjectCategories();
          setCategories(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(setBasicInfo({ projectCategoryId: e.target.value }));
  };

  return (
    <div className="form-field">
      <label className="mb-1">Project Category</label>
      <select
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ConstructionBasicInfo() {
  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);

  // NAME //
  const [name, setName] = useState(draftProject.name);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleNameBlur = (e) => {
    dispatch(setBasicInfo({ name: e.target.value }));
  };

  // LANGUAGE //
  const [language, setLanguage] = useState(draftProject.language || 0);
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };
  const handleLanguageBlur = (e) => {
    dispatch(setBasicInfo({ language: e.target.value }));
  };

  // COMPANY NAME //
  const [companyName, setCompanyName] = useState(draftProject.companyName);
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };
  const handleCompanyNameBlur = (e) => {
    dispatch(setBasicInfo({ companyName: e.target.value }));
  };

  // COMPANY ADDRESS //
  const [companyAddress, setCompanyAddress] = useState(
    draftProject.companyAddress
  );
  const handleCompanyAddressChange = (e) => {
    setCompanyAddress(e.target.value);
  };
  const handleCompanyAddressBlur = (e) => {
    dispatch(setBasicInfo({ companyAddress: e.target.value }));
  };

  // COMPANY CODE //
  const [companyCode, setCompanyCode] = useState(draftProject.companyCode);
  const handleCompanyCodeChange = (e) => {
    setCompanyCode(e.target.value);
  };
  const handleCompanyCodeBlur = (e) => {
    dispatch(setBasicInfo({ companyCode: e.target.value }));
  };

  // DESCRIPTION //
  const [description, setDescription] = useState(draftProject.description);
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDescriptionBlur = (e) => {
    dispatch(setBasicInfo({ description: e.target.value }));
  };

  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-12 col-12 my-auto">
            <h3>Basic Information</h3>
            <p>Brief description of the project.</p>
          </div>
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Project Name</label>
              <input
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
              />
            </div>
          </div>
          <div className="col col-lg-4 col-12">
            <ProjectCategoryField></ProjectCategoryField>
          </div>
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Language</label>
              <select
                type="text"
                value={language}
                onChange={handleLanguageChange}
                onBlur={handleLanguageBlur}
              >
                {languages.map((lang, index) => (
                  <option key={lang} value={index}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Company Name</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                value={companyName}
                onChange={handleCompanyNameChange}
                onBlur={handleCompanyNameBlur}
              />
            </div>
          </div>
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Company Address</label>
              <input
                type="text"
                placeholder="Enter Company Address"
                value={companyAddress}
                onChange={handleCompanyAddressChange}
                onBlur={handleCompanyAddressBlur}
              />
            </div>
          </div>
          <div className="col col-lg-4 col-12">
            <div className="form-field">
              <label className="mb-1">Company Code</label>
              <input
                type="text"
                placeholder="Enter Company Code"
                value={companyCode}
                onChange={handleCompanyCodeChange}
                onBlur={handleCompanyCodeBlur}
              />
            </div>
          </div>
          <div className="col col-lg-12 col-12">
            <div className="form-field">
              <label className="mb-1">Project Description</label>
              <textarea
                type="text"
                placeholder="Enter project description..."
                value={description}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
