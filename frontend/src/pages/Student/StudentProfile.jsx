
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentProfile } from '../../redux/studentSlice';

const StudentProfileInfo = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-8 bg-green-50 rounded-2xl shadow-xl max-w-5xl mx-auto text-center font-semibold text-lg text-gray-700">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-100 rounded-2xl shadow-xl max-w-5xl mx-auto text-center font-semibold text-lg text-red-700">
        {error}
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="p-10 bg-green-50 rounded-2xl shadow-2xl max-w-5xl mx-auto font-sans">
      
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Personal Information</h1>
       
      </header>
      
      
      <section className="flex flex-col md:flex-row justify-between items-start border-b border-green-200 pb-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</h2>
          <p className="text-md text-gray-800 mt-1">
            Student ID: <span className="font-medium">{profile.admissionNumber}</span>
          </p>
          <p className="text-md text-gray-800 mt-1">{profile.department} - Semester {profile.semester}</p>
        </div>
      </section>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-gray-900">
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Full Name</p>
          <p className="mt-1 text-xl font-medium">{profile.firstName} {profile.lastName}</p>
        </div>
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Student ID</p>
          <p className="mt-1 text-xl font-medium">{profile.admissionNumber}</p>
        </div>
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Email Address</p>
          <p className="mt-1 text-xl font-medium">{profile.email}</p>
        </div>
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Phone Number</p>
          <p className="mt-1 text-xl font-medium">{profile.phone}</p>
        </div>
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Semester</p>
          <p className="mt-1 text-xl font-medium">{profile.semester}</p>
        </div>
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Gender</p>
          <p className="mt-1 text-xl font-medium">{profile.gender || 'Not specified'}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-base font-semibold uppercase tracking-wider">Address</p>
          <p className="mt-1 text-xl font-medium">{profile.address || 'Not provided'}</p>
        </div>
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Class</p>
          <p className="mt-1 text-xl font-medium">{profile.className || 'Not assigned'}</p>
        </div>
        <div>
          <p className="text-base font-semibold uppercase tracking-wider">Updated By</p>
          <p className="mt-1 text-xl font-medium">{profile.updatedBy || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileInfo;

