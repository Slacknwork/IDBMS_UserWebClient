"use client";

import TaskDetails from "/components/ProjectDetails/TaskDetails";
import TaskReports from "/components/ProjectDetails/TaskReports";

export default function ProjectTaskDetailsPage() {
  return (
    <div>
      <TaskDetails></TaskDetails>
      <TaskReports></TaskReports>
    </div>
  );
}
