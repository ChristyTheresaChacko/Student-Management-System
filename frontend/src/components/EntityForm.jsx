import React, { useState } from "react";
import EntityForm from "./EntityForm"; // import your edited EntityForm

const EntityFormWrapper = () => {
const [selectedEntity, setSelectedEntity] = useState("student");

return ( <div className="p-6 max-w-md mx-auto"> <div className="flex gap-4 mb-6">
<button
onClick={() => setSelectedEntity("student")}
className={`px-4 py-2 rounded ${
            selectedEntity === "student" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
>
Student </button>
<button
onClick={() => setSelectedEntity("teacher")}
className={`px-4 py-2 rounded ${
            selectedEntity === "teacher" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
>
Teacher </button>
<button
onClick={() => setSelectedEntity("class")}
className={`px-4 py-2 rounded ${
            selectedEntity === "class" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
>
Class </button> </div>

```
  {/* EntityForm will now dynamically update based on selectedEntity */}
  <EntityForm entityType={selectedEntity} />
</div>


);
};

export default EntityFormWrapper;
