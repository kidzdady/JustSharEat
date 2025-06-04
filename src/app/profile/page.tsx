'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Heart, 
  ShoppingBag, 
  Camera, 
  Bell, 
  Shield, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Target,
  TrendingUp,
  Edit3,
  Save,
  X,
  Star,
  Gift,
  History,
  Users
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

function ProfilePage() {
  const { lang, setLang, t } = useLanguage();
  const profileT = t.profile;
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    donation: true,
    impact: false,
    urgent: true
  });

  // Use real user data if logged in, else fallback to mock
  const userData = currentUser ? {
    name: currentUser.displayName || 'No Name',
    email: currentUser.email || '',
    phone: currentUser.phoneNumber || '',
    joinDate: currentUser.metadata?.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : '',
    bio: '',
    avatar: currentUser.photoURL
      ? <img src={currentUser.photoURL} alt="avatar" className="w-32 h-32 rounded-full object-cover" />
      : '👤',
    verified: true,
    donationGoal: 5000,
    currentDonations: 3240,
    mealsShared: 127,
    impactScore: 850,
    address: '', // Not available from Firebase user
  } : {
    // Mock user data
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Community Street, Nairobi, Kenya',
    joinDate: 'March 2023',
    bio: 'Passionate about helping my community and fighting food insecurity. Love cooking and sharing meals with others!',
    avatar: '👩‍🦰',
    verified: true,
    donationGoal: 5000,
    currentDonations: 3240,
    mealsShared: 127,
    impactScore: 850
  };

  // Mock donation history
  const donationHistory = [
    { id: 1, program: 'Downtown Soup Kitchen', amount: 50, date: 'Dec 15, 2024', status: 'completed', description: 'Provided 25 meals to homeless individuals' },
    { id: 2, program: 'School Breakfast Program', amount: 75, date: 'Dec 10, 2024', status: 'completed', description: 'Fed 40 children healthy breakfast' },
    { id: 3, program: 'Emergency Food Relief', amount: 100, date: 'Dec 5, 2024', status: 'completed', description: 'Emergency aid for flood victims' },
    { id: 4, program: 'Senior Meal Delivery', amount: 25, date: 'Nov 28, 2024', status: 'completed', description: 'Home-delivered meals for elderly' },
    { id: 5, program: 'Community Food Bank', amount: 60, date: 'Nov 20, 2024', status: 'completed', description: 'Stocked local food pantry' },
    { id: 6, program: 'Holiday Food Drive', amount: 120, date: 'Nov 15, 2024', status: 'completed', description: 'Thanksgiving meals for families' }
  ];

  // Mock achievements
  const achievements = [
    { id: 1, title: 'First Donation', description: 'Made your first donation to help fight hunger in your community', icon: '🌟', unlocked: true, date: 'March 2023' },
    { id: 2, title: 'Generous Giver', description: 'Donated over $500 to various food security programs', icon: '💝', unlocked: true, date: 'June 2023' },
    { id: 3, title: 'Community Hero', description: 'Helped provide 100+ meals to those in need', icon: '🦸‍♀️', unlocked: true, date: 'August 2023' },
    { id: 4, title: 'Monthly Supporter', description: 'Donated consistently for 3 consecutive months', icon: '📅', unlocked: true, date: 'September 2023' },
    { id: 5, title: 'Impact Maker', description: 'Reached 1000 impact points through various contributions', icon: '🎯', unlocked: false, date: null },
    { id: 6, title: 'Share Champion', description: 'Shared 200+ meals with community members', icon: '🏆', unlocked: false, date: null },
    { id: 7, title: 'Volunteer Spirit', description: 'Participated in 5+ volunteer events', icon: '🤝', unlocked: true, date: 'October 2023' },
    { id: 8, title: 'Food Rescue Hero', description: 'Helped rescue and distribute surplus food', icon: '🚛', unlocked: false, date: null }
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // TypeScript: add types for notification and form handlers
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const TabButton = ({ id, label, icon }: { id: string; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === id
          ? 'bg-orange-500 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  // Notification settings array with correct key type
  const notificationSettings: { id: string; label: string; desc: string; key: keyof typeof notifications }[] = [
    { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email', key: 'email' },
    { id: 'donation', label: 'Donation Reminders', desc: 'Monthly giving reminders', key: 'donation' },
    { id: 'impact', label: 'Impact Updates', desc: 'Stories about your impact', key: 'impact' },
    { id: 'urgent', label: 'Urgent Campaigns', desc: 'Emergency food relief alerts', key: 'urgent' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <button
            className={`px-3 py-1 rounded-l ${lang === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLang('en')}
          >EN</button>
          <button
            className={`px-3 py-1 rounded-r ${lang === 'sw' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLang('sw')}
          >SW</button>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-6xl shadow-lg">
                {userData.avatar}
              </div>
              <button 
                onClick={() => setShowImageUpload(!showImageUpload)}
                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
              {userData.verified && (
                <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{userData.name}</h1>
                  <p className="text-gray-600 mb-2">{userData.email}</p>
                  <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 lg:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{profileT.edit}</span>
                </button>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">${userData.currentDonations}</div>
                  <div className="text-sm text-green-700">Total Donated</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{userData.mealsShared}</div>
                  <div className="text-sm text-blue-700">Meals Shared</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{userData.impactScore}</div>
                  <div className="text-sm text-purple-700">Impact Score</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{achievements.filter(a => a.unlocked).length}</div>
                  <div className="text-sm text-orange-700">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-4 rounded-xl shadow-sm">
          <TabButton id="overview" label="Overview" icon={<User className="w-4 h-4" />} />
          <TabButton id="donations" label="Donations" icon={<Heart className="w-4 h-4" />} />
          <TabButton id="achievements" label="Achievements" icon={<Award className="w-4 h-4" />} />
          <TabButton id="settings" label="Settings" icon={<Settings className="w-4 h-4" />} />
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h2>
                
                {isEditing && !currentUser ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={() => {}}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={() => {}}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={() => {}}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={userData.address}
                        onChange={() => {}}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={userData.bio}
                        onChange={() => {}}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{userData.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>Joined {userData.joinDate}</span>
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{userData.bio}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Donation Goal Progress */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Annual Donation Goal
                </h2>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ${userData.currentDonations} / ${userData.donationGoal}
                  </div>
                  <p className="text-gray-600">
                    {((userData.currentDonations / userData.donationGoal) * 100).toFixed(1)}% Complete
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userData.currentDonations / userData.donationGoal) * 100, 100)}%` }}
                  ></div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Remaining to Goal</span>
                    <span className="font-medium text-gray-800">${userData.donationGoal - userData.currentDonations}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    You're making amazing progress! Keep up the great work helping our community.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Donations Tab - Netflix Vertical Style */}
          {activeTab === 'donations' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <History className="w-5 h-5 mr-2" />
                Donation History
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {donationHistory.map((donation) => (
                  <div key={donation.id} className="group cursor-pointer">
                    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                      {/* Vertical Card with Netflix proportions (2:3 aspect ratio) */}
                      <div className="aspect-[2/3] bg-gradient-to-br from-green-400 to-green-500 relative overflow-hidden">
                        <div className="absolute inset-0 flex flex-col justify-between p-3">
                          <div className="flex justify-between items-start">
                            <Heart className="w-6 h-6 text-white/90" />
                            <span className="text-xs text-white/90 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                              ${donation.amount}
                            </span>
                          </div>
                          <div className="text-white">
                            <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2">{donation.program}</h3>
                            <p className="text-xs opacity-90 line-clamp-2 mb-2">{donation.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">{donation.status}</span>
                              <span className="text-xs opacity-75">{donation.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                      </div>
                      
                      {/* Bottom info strip */}
                      <div className="p-2 bg-white">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700 truncate">{donation.program}</span>
                          <span className="text-xs font-bold text-green-600">${donation.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab - Netflix Vertical Style */}
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Your Achievements
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="group cursor-pointer">
                    <div className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-white to-green-50' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 opacity-70'
                    }`}>
                      {/* Vertical Card with Netflix proportions (2:3 aspect ratio) */}
                      <div className={`aspect-[2/3] relative overflow-hidden ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-orange-400 to-orange-500' 
                          : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      }`}>
                        <div className="absolute inset-0 flex flex-col justify-between p-3">
                          <div className="flex justify-between items-start">
                            <div className="text-3xl">{achievement.icon}</div>
                            {achievement.unlocked ? (
                              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                ✓
                              </div>
                            ) : (
                              <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                🔒
                              </div>
                            )}
                          </div>
                          
                          <div className="text-white">
                            <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2">{achievement.title}</h3>
                            <p className="text-xs opacity-90 line-clamp-3 mb-2">{achievement.description}</p>
                            {achievement.date && (
                              <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">{achievement.date}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                        
                        {/* Locked overlay */}
                        {!achievement.unlocked && (
                          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
                        )}
                      </div>
                      
                      {/* Bottom info strip */}
                      <div className="p-2 bg-white">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700 truncate">{achievement.title}</span>
                          {achievement.unlocked ? (
                            <span className="text-xs text-green-600 font-medium">Unlocked</span>
                          ) : (
                            <span className="text-xs text-gray-500 font-medium">Locked</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Notification Settings - Now Functional */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </h2>
                
                <div className="space-y-4">
                  {notificationSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{setting.label}</div>
                        <div className="text-sm text-gray-600">{setting.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notifications[setting.key]}
                          onChange={() => handleNotificationToggle(setting.key)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>

                {/* Notification Status Display */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Current Settings:</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>Email Notifications: {notifications.email ? '✅ Enabled' : '❌ Disabled'}</div>
                    <div>Donation Reminders: {notifications.donation ? '✅ Enabled' : '❌ Disabled'}</div>
                    <div>Impact Updates: {notifications.impact ? '✅ Enabled' : '❌ Disabled'}</div>
                    <div>Urgent Campaigns: {notifications.urgent ? '✅ Enabled' : '❌ Disabled'}</div>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Security
                </h2>
                
                <div className="space-y-4">
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-800">Change Password</div>
                    <div className="text-sm text-gray-600">Update your account password</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-800">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-600">Add extra security to your account</div>
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-800">Privacy Settings</div>
                    <div className="text-sm text-gray-600">Control who can see your profile</div>
                  </button>
                  <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <div className="font-medium text-red-600">Delete Account</div>
                    <div className="text-sm text-red-500">Permanently remove your account</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePageWrapper() {
  return (
    <LanguageProvider>
      <ProfilePage />
    </LanguageProvider>
  );
}