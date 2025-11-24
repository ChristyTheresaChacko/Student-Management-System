import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherProfile } from "../../redux/teacherSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(fetchTeacherProfile());
  }, [dispatch]);

  if (loading) return <p className="p-8">Loading profile...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!profile) return null;

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const classes = profile.teachingClassNames || [];

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">My Profile</h1>
        

        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10 border border-green-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-bold text-gray-900">{fullName}</p>
              <p className="text-lg text-green-700 font-medium">Teacher</p>
            </div>

            {/* Green Gradient Button */}
           
          </div>
        </div>

       {/* Contact Information */}
<div className="bg-white shadow-md rounded-xl p-8 mb-10">
  <h2 className="text-xl font-semibold text-gray-900 mb-6 border-l-4 border-green-600 pl-3">
    Contact Information
  </h2>

  <div className="space-y-4 text-lg">
    <div className="flex gap-3 py-3 border-b border-gray-100">
      <span className="font-medium text-gray-600">Username:</span>
      <span className="text-gray-900">{profile.username}</span>
    </div>

    <div className="flex gap-3 py-3 border-b border-gray-100">
      <span className="font-medium text-gray-600">Email:</span>
      <span className="text-gray-900">{profile.email}</span>
    </div>

    <div className="flex gap-3 py-3">
      <span className="font-medium text-gray-600">Phone Number:</span>
      <span className="text-gray-900">{profile.phone}</span>
    </div>
  </div>
</div>

        {/* Classes Card */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 border-l-4 border-green-600 pl-3">
            Assigned Classes
          </h2>

          <ul className="text-lg text-gray-900 space-y-2">
            {classes.length > 0 ? (
              classes.map((cls, index) => (
                <li
                  key={index}
                  className="px-4 py-2 bg-green-50 rounded-md border border-green-100 text-green-800 font-medium"
                >
                  {cls}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No classes assigned.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
