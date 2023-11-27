"use client";

import { useSelector, useDispatch } from "react-redux";

import { useState, useRef, useEffect } from "react";

import { getAllProjectCategories } from "/api/projectCategoryServices";
import { setBasicInfo } from "/store/reducers/draftProject";

function NameField() {
  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);

  const [value, setValue] = useState(draftProject.name);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(setBasicInfo({ name: e.target.value }));
  };

  return (
    <div className="form-field">
      <label className="mb-1">Project Name</label>
      <input
        type="text"
        placeholder="Enter project name"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

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
  });

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

function DescriptionField() {
  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);

  const [value, setValue] = useState(draftProject.description);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(setBasicInfo({ description: e.target.value }));
  };

  return (
    <div className="form-field">
      <label className="mb-1">Project Description</label>
      <textarea
        type="text"
        placeholder="Enter project description..."
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      ></textarea>
    </div>
  );
}

export default function DecorBasicInfo() {
  return (
    <div className="pb-0">
      <form className="contact-validation-active">
        <div className="row">
          <div className="col col-lg-4 col-12 my-auto">
            <h3>Basic Information</h3>
            <p>Brief description of the project.</p>
          </div>
          <div className="col col-lg-4 col-12">
            <NameField></NameField>
          </div>
          <div className="col col-lg-4 col-12">
            <ProjectCategoryField></ProjectCategoryField>
          </div>
          <div className="col col-lg-12 col-12">
            <DescriptionField></DescriptionField>
          </div>
        </div>
      </form>
    </div>
  );
}
