"use client";

import { useSelector, useDispatch } from "react-redux";
import { setDraftProjectBasicInfo } from "/store/reducers/draftProject";
import { useState } from "react";

function NameField() {
  const dispatch = useDispatch();
  const draftProject = useSelector((state) => state.draftProject);

  const [value, setValue] = useState(draftProject.name);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(setDraftProjectBasicInfo({ name: e.target.value }));
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

  const [value, setValue] = useState(draftProject.projectCategoryId);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleBlur = (e) => {
    dispatch(setDraftProjectBasicInfo({ projectCategoryId: e.target.value }));
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
        <option value={1}>Bank</option>
        <option value={2}>Casino</option>
        <option value={3}>Apartment</option>
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
    dispatch(setDraftProjectBasicInfo({ description: e.target.value }));
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
