<<<<<<< HEAD
import { useState } from "react";
import { X, Save } from "lucide-react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "(123) 456-7890",
    address: "123 Main St Anytown, USA 12345",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxoZWFkc2hvdHxlbnwwfDB8fHwxNjk1ODE3MjEzfDA&ixlib=rb-4.0.3&q=80&w=1080",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Updated data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6 flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Profile"
                  className="h-28 w-28 rounded-full object-cover border-4 border-indigo-600 shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100"
                />
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <header className="px-2 py-4 flex flex-col justify-center items-center text-center">
            <img
              className="inline-flex object-cover border-4 border-indigo-600 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-indigo-600/100 bg-indigo-50 text-indigo-600 h-48 w-48"
              src={formData.image}
              alt=""
            />
            <h1 className="text-2xl text-gray-500 font-bold mt-2">
              {formData.name}
            </h1>
            <h2 className="text-base md:text-xl text-gray-500 font-bold">
              Lead Software Engineer @
              <a
                href=""
                target="_blank"
                className="text-indigo-900 hover:text-indigo-600 font-bold border-b-0 hover:border-b-4 hover:border-b-indigo-300 transition-all mb-2"
              >
                XYZ
              </a>
            </h2>
          </header>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.name}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.email}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.phone}
                </dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.address}
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
=======
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  X,
  Save,
  Loader,
  Camera,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const UserProfile = ({ userData }) => {
  // Initialize state with userData if available
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
  });

  // Separate loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Notification states
  const [notification, setNotification] = useState({
    type: "", // 'success' or 'error'
    message: "",
  });

  // Effect to load initial data
  useEffect(() => {
    const initializeData = async () => {
      // If userData is provided and complete, use it
      if (userData?.user?.name && userData?.user?.email) {
        setFormData({
          name: userData.user.name,
          email: userData.user.email,
          photo: userData.user.photo || null,
        });
        setIsLoading(false);
        return;
      }

      // Otherwise fetch from API
      try {
        const response = await fetch("http://localhost:5173/api/v1/user/user");
        const data = await response.json();

        if (data.user) {
          setFormData({
            name: data.user.name,
            email: data.user.email,
            photo: data.user.photo || null,
          });
        }
      } catch (error) {
        setNotification({
          type: "error",
          message: "Failed to load profile data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear notifications when user starts editing
    setNotification({ type: "", message: "" });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        type: "error",
        message: "Image must be smaller than 5MB",
      });
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to process image",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setNotification({ type: "", message: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);

      // Handle photo upload
      if (formData.photo && formData.photo.startsWith("data:image")) {
        const response = await fetch(formData.photo);
        const blob = await response.blob();
        formDataToSend.append("photo", blob, "profile.jpg");
      }

      const response = await fetch("/api/v1/user/updateme", {
        method: "PATCH",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        ...data.data.user,
      }));

      setNotification({
        type: "success",
        message: "Profile updated successfully",
      });

      // Close edit mode after short delay
      setTimeout(() => setIsEditing(false), 1500);
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "Failed to update profile",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-white rounded-lg border">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Profile Information
        </h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setNotification({ type: "", message: "" });
          }}
          disabled={isUpdating}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {/* Notification Banner */}
      {notification.message && (
        <div
          className={`px-4 py-3 flex items-center gap-2 ${
            notification.type === "error"
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {notification.type === "error" ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
          <p>{notification.message}</p>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          {/* Profile Image Section */}
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={formData.photo || "/api/placeholder/112/112"}
                  alt="Profile"
                  className="h-28 w-28 rounded-full object-cover border-4 border-indigo-600"
                />
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUpdating}
                  />
                  <Camera className="h-4 w-4" />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isUpdating}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isUpdating}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setNotification({ type: "", message: "" });
                }}
                disabled={isUpdating}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
              >
                {isUpdating ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          {/* View Mode */}
          <header className="px-2 py-4 flex flex-col justify-center items-center text-center">
            <img
              className="inline-flex object-cover border-4 border-indigo-600 rounded-full h-48 w-48"
              src={formData.photo || "/api/placeholder/192/192"}
              alt={formData.name}
            />
            <h1 className="text-2xl text-gray-500 font-bold mt-2">
              {formData.name}
            </h1>
            <h2 className="text-base md:text-xl text-gray-500 font-bold">
              Civil Engineer
            </h2>
          </header>

          <div className="border-t border-gray-200">
            <dl className="divide-y divide-gray-200">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.name}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formData.email}
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
>>>>>>> c2397cf (alldone)
