import React from "react";
import StatCard from "../components/StatCard";

export default {
  title: "components/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
};

export const Students = {
  args: {
    title: "Total Students",
    value: "245",
    color: "border-green-600",
  },
};

export const Teachers = {
  args: {
    title: "Total Teachers",
    value: "18",
    color: "border-green-600",
  },
};

export const Classes = {
  args: {
    title: "Total Classes",
    value: "12",
    color: "border-green-600",
  },
};

export const Attendance = {
  args: {
    title: "Avg Attendance",
    value: "92%",
    color: "border-green-600",
  },
};
