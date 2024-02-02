import React, { useState } from "react";
import { useSelector } from "react-redux";
function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/profile/password/${userInfo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Password updated successfully");

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        console.log(data);
        alert(data.message || "Password update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Change Password</h1>
        <div className="space-y-2">
          <label className="block">
            <span className="text-gray-700">Current Password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="off"
              className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="off"
              className="block w-full p-2 mt-1 border-gray-300 rounded shadow-sm  sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Confirm New Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              className="block w-full p-2 mt-1 border-gray-300 rounded shadow-sm  sm:text-sm"
            />
          </label>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
export default ChangePassword;
