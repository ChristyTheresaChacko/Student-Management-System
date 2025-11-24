import React from "react";
import { Download } from "lucide-react";
import Button from "../components/Button";

export default {
title: "Components/Button",
component: Button,
tags: ["autodocs"],
decorators: [
(Story) => <div style={{ padding: "20px", maxWidth: "400px" }}><Story /></div>,
],
};

export const Primary = {
args: {
children: "SIGNIN",
className: "w-full bg-green-600/80 hover:bg-green-600",
type: "submit",
disabled: false,
},
};

export const Loading = {
args: {
children: "SIGNING IN...",
className: "w-full bg-green-600/80 hover:bg-green-600",
type: "submit",
disabled: true,
},
};

export const Danger = {
args: {
children: "Delete",
className: "bg-red-400 hover:bg-red-600 text-white",
onClick: () => console.log("Delete clicked"),
},
};

export const Edit = {
args: {
children: "Edit",
className: "bg-blue-600 hover:bg-blue-700 text-white",
onClick: () => console.log("Edit clicked"),
},
};

export const AddStudent = {
args: {
children: "Add Student",
className: "bg-green-600 hover:bg-green-700 text-white",
onClick: () => console.log("Navigate to add student"),
},
};

export const Cancel = {
args: {
children: "Cancel",
className: "!bg-gray-300 !text-black hover:!bg-gray-400",
onClick: () => console.log("Cancel clicked"),
},
};

export const DownloadCSV = {
args: {
children: ( <div className="flex items-center gap-2"> <Download size={18} /> Download CSV </div>
),
className: "bg-blue-600 hover:bg-blue-700 text-white",
onClick: () => console.log("Download CSV clicked"),
},
};
