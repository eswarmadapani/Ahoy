import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Camera, Mail, User, Calendar, Shield, LogOut, Edit3, CheckCircle2 } from "lucide-react";
import { getThemeColors } from "../constants/themeConfig";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const { theme } = useThemeStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const colors = getThemeColors(theme);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      setSelectedImg(reader.result);
      try {
        await updateProfile({ profilePic: reader.result });
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bgFrom} ${colors.bgVia} ${colors.bgTo} relative overflow-hidden pt-20 pb-12`}>
      {/* Premium Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-80 h-80 ${colors.blobColor1} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 ${colors.blobColor2} rounded-full blur-3xl animate-pulse animation-delay-2000`}></div>
        <div className={`absolute top-1/2 left-1/2 w-72 h-72 ${colors.blobColor3} rounded-full blur-3xl animate-pulse animation-delay-4000`}></div>
      </div>

      <div className="relative z-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section with Profile Image */}
          <div className={`${colors.inputBg} backdrop-blur-xl rounded-3xl border ${colors.inputBorder} overflow-hidden shadow-2xl mb-8`}>
            {/* Header Gradient */}
            <div className={`h-32 bg-gradient-to-r ${colors.accentPrimary} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            </div>

            {/* Profile Content */}
            <div className="px-8 pb-8">
              {/* Profile Image Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 mb-8 relative z-10">
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.accentPrimary} rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                  <img
                    src={selectedImg || authUser?.profile || "/avatar.png"}
                    alt="Profile"
                    className={`relative w-32 h-32 rounded-3xl object-cover border-4 shadow-2xl transition-transform duration-300 group-hover:scale-105 ${colors.inputBorder}`}
                  />
                  
                  {/* Camera Upload Button */}
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 bg-gradient-to-r ${colors.accentPrimary} hover:shadow-lg p-3 rounded-full cursor-pointer transition-all duration-200 shadow-lg transform hover:scale-110 ${
                      isUpdatingProfile ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${colors.headingGradient}`}>
                      {authUser?.fullname || "User"}
                    </h1>
                    <CheckCircle2 className="w-6 h-6" style={{color: colors.accentPrimary.split(' ')[1]}} />
                  </div>
                  <p className={`${colors.textSecondary} text-sm mb-3`}>
                    {authUser?.email || "No email"}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${colors.accentPrimary} text-white text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className={`${colors.inputBg} rounded-2xl border ${colors.inputBorder} p-4 text-center backdrop-blur-sm`}>
                  <p className={`${colors.textTertiary} text-xs font-semibold mb-2`}>Status</p>
                  <p className="text-sm font-bold text-green-500">Active</p>
                </div>
                <div className={`${colors.inputBg} rounded-2xl border ${colors.inputBorder} p-4 text-center backdrop-blur-sm`}>
                  <p className={`${colors.textTertiary} text-xs font-semibold mb-2`}>Member Since</p>
                  <p className={`text-xs font-bold ${colors.textPrimary}`}>{formatDate(authUser?.createdAt).split(',')[0]}</p>
                </div>
                <div className={`${colors.inputBg} rounded-2xl border ${colors.inputBorder} p-4 text-center backdrop-blur-sm`}>
                  <p className={`${colors.textTertiary} text-xs font-semibold mb-2`}>Verified</p>
                  <p className="text-sm font-bold text-blue-500">Yes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Personal Information Card */}
            <div className={`${colors.inputBg} backdrop-blur-xl rounded-3xl border ${colors.inputBorder} p-8 shadow-2xl`}>
              <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-6 flex items-center gap-3`}>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.accentLight}`}>
                  <User className="w-5 h-5 text-white" />
                </div>
                Personal Info
              </h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="group">
                  <label className={`text-xs font-semibold ${colors.textTertiary} mb-2 block uppercase tracking-wide`}>
                    Full Name
                  </label>
                  <div className={`${colors.inputBg} rounded-lg border ${colors.inputBorder} px-4 py-3 backdrop-blur-sm group-hover:border-opacity-100 transition-all`}>
                    <p className={`${colors.textPrimary} font-semibold`}>
                      {authUser?.fullname || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className={`text-xs font-semibold ${colors.textTertiary} mb-2 block uppercase tracking-wide flex items-center gap-2`}>
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className={`${colors.inputBg} rounded-lg border ${colors.inputBorder} px-4 py-3 backdrop-blur-sm group-hover:border-opacity-100 transition-all`}>
                    <p className={`${colors.textPrimary} font-semibold text-sm break-all`}>
                      {authUser?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information Card */}
            <div className={`${colors.inputBg} backdrop-blur-xl rounded-3xl border ${colors.inputBorder} p-8 shadow-2xl`}>
              <h2 className={`text-2xl font-bold ${colors.textPrimary} mb-6 flex items-center gap-3`}>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.accentPrimary}`}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Account Info
              </h2>

              <div className="space-y-4">
                {/* Member Since */}
                <div className={`flex items-center justify-between py-4 px-4 rounded-lg border ${colors.inputBorder} backdrop-blur-sm group hover:border-opacity-100 transition-all`}>
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-4 h-4 ${colors.textTertiary}`} />
                    <span className={`${colors.textSecondary} text-sm`}>Member Since</span>
                  </div>
                  <span className={`font-semibold ${colors.textPrimary}`}>
                    {formatDate(authUser?.createdAt)}
                  </span>
                </div>

                {/* Account Status */}
                <div className={`flex items-center justify-between py-4 px-4 rounded-lg border ${colors.inputBorder} backdrop-blur-sm`}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className={`${colors.textSecondary} text-sm`}>Account Status</span>
                  </div>
                  <span className="font-semibold text-green-500">Active</span>
                </div>

                {/* Theme */}
                <div className={`flex items-center justify-between py-4 px-4 rounded-lg border ${colors.inputBorder} backdrop-blur-sm`}>
                  <span className={`${colors.textSecondary} text-sm`}>Current Theme</span>
                  <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r" style={{backgroundImage: `linear-gradient(to right, #${Math.floor(Math.random()*16777215).toString(16)})`}}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className={`w-full relative px-6 py-4 rounded-2xl overflow-hidden group border ${colors.inputBorder}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transition-transform duration-300 group-hover:scale-105"></div>
            <div className="relative flex items-center justify-center gap-2 font-bold text-white">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Profile;