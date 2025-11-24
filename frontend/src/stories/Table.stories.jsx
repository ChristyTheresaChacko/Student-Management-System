import React from "react";
import Table from "../components/Table";

export default {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "object" },
    data: { control: "object" },
    loading: { control: "boolean" },
  },
};

const Template = (args) => <Table {...args} />;

// Sample students data
const sampleStudentData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    className: "Class 10-A",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    className: "Class 10-B",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
    className: "Class 10-A",
  },
];

const studentColumns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "className", label: "Class" },
];

export const StudentTable = Template.bind({});
StudentTable.args = {
  columns: studentColumns,
  data: sampleStudentData,
  loading: false,
};

export const TeacherTable = Template.bind({});
TeacherTable.args = {
  columns: [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ],
  data: [
    {
      id: 1,
      firstName: "Dr.",
      lastName: "Ahmed",
      email: "ahmed@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      firstName: "Prof.",
      lastName: "Smith",
      email: "smith@example.com",
      phone: "098-765-4321",
    },
  ],
  loading: false,
};

export const ClassTable = Template.bind({});
ClassTable.args = {
  columns: [
    { key: "className", label: "Class Name" },
    { key: "teacherName", label: "Teacher" },
    { key: "studentCount", label: "Students" },
  ],
  data: [
    {
      id: 1,
      className: "Class 10-A",
      teacherName: "Mr. Ahmed",
      studentCount: 35,
    },
    {
      id: 2,
      className: "Class 10-B",
      teacherName: "Ms. Smith",
      studentCount: 32,
    },
    {
      id: 3,
      className: "Class 9-A",
      teacherName: "Mr. Khan",
      studentCount: 38,
    },
  ],
  loading: false,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  columns: studentColumns,
  data: [],
  loading: true,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  columns: studentColumns,
  data: [],
  loading: false,
};
