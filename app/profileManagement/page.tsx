"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/page';
import { ProfileSection } from '@/components/ui/profile-section';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from 'react-toastify';
import { User, Phone, Lock, Shield, Trash2, Mail, Bell, Eye, EyeOff, Loader2 } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const AccountSettings: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showContact, setShowContact] = useState(true);
  const [allowDataUsage, setAllowDataUsage] = useState(true);
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || '';
    setEmail(storedEmail);
    fetchUserSettings(storedEmail);
  }, []);

  const fetchUserSettings = async (email: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/settings?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setName(data.name || '');
        setContact(data.contact || '');
        setShowEmail(data.showEmail ?? true);
        setShowName(data.showName ?? true);
        setShowContact(data.showContact ?? true);
        setAllowDataUsage(data.allowDataUsage ?? true);
        setAllowNotifications(data.allowNotifications ?? true);
      } else {
        toast.error('Failed to fetch user settings');
      }
    } catch (error) {
      console.error('Error fetching user settings:', error);
      toast.error('An error occurred while fetching user settings');
    }
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ 
          email, 
          name, 
          contact, 
          showEmail, 
          showName, 
          showContact, 
          allowDataUsage,
          allowNotifications
        }),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        toast.success('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to change password: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('An error occurred while changing password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to permanently delete your account? This action cannot be undone.'
    );

    if (confirmDelete) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete-account`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          toast.success('Account deleted successfully!');
          localStorage.removeItem('email');
          localStorage.removeItem('token');
          window.location.href = '/';
        } else {
          const errorData = await response.json();
          toast.error(`Failed to delete account: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        toast.error('An error occurred while deleting account');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <ToastContainer position="top-right" theme="dark" />
      <div className="relative flex flex-col items-center">
        <video 
          className="fixed top-0 left-0 min-w-full min-h-full object-cover opacity-20" 
          src="/video.mp4" 
          autoPlay 
          muted 
          loop 
          style={{ zIndex: -1 }} 
        />
        <div className="max-w-4xl w-full p-6 my-10 space-y-6" style={{ zIndex: 1 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Account Settings</h1>
            <p className="text-gray-400">Manage your account preferences and security settings</p>
          </div>

          <ProfileSection title="Personal Information" icon={<User className="h-5 w-5 text-blue-400" />}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="pl-10 bg-gray-700 text-gray-300"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleProfileUpdate}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </ProfileSection>

          <ProfileSection title="Security" icon={<Lock className="h-5 w-5 text-green-400" />}>
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleChangePassword}
                className="w-full bg-green-600 hover:bg-green-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </div>
          </ProfileSection>

          <ProfileSection title="Privacy Settings" icon={<Shield className="h-5 w-5 text-purple-400" />}>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label htmlFor="show-email" className="font-medium">Show Email</Label>
                    <p className="text-sm text-gray-400">Allow others to see your email address</p>
                  </div>
                </div>
                <Switch
                  id="show-email"
                  checked={showEmail}
                  onCheckedChange={setShowEmail}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label htmlFor="show-name" className="font-medium">Show Name</Label>
                    <p className="text-sm text-gray-400">Display your name to other users</p>
                  </div>
                </div>
                <Switch
                  id="show-name"
                  checked={showName}
                  onCheckedChange={setShowName}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label htmlFor="show-contact" className="font-medium">Show Contact</Label>
                    <p className="text-sm text-gray-400">Make your contact number visible</p>
                  </div>
                </div>
                <Switch
                  id="show-contact"
                  checked={showContact}
                  onCheckedChange={setShowContact}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label htmlFor="allow-data-usage" className="font-medium">Data Analysis</Label>
                    <p className="text-sm text-gray-400">Allow data usage for security analysis</p>
                  </div>
                </div>
                <Switch
                  id="allow-data-usage"
                  checked={allowDataUsage}
                  onCheckedChange={setAllowDataUsage}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <div>
                    <Label htmlFor="allow-notifications" className="font-medium">Notifications</Label>
                    <p className="text-sm text-gray-400">Receive security alerts and updates</p>
                  </div>
                </div>
                <Switch
                  id="allow-notifications"
                  checked={allowNotifications}
                  onCheckedChange={setAllowNotifications}
                  disabled={isLoading}
                />
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title="Delete Account" icon={<Trash2 className="h-5 w-5 text-red-400" />}>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                <p className="text-gray-400 text-sm">
                  Warning: This action cannot be undone. All your data will be permanently deleted.
                  Please make sure you want to proceed with this action.
                </p>
              </div>
              <Button
                onClick={handleDeleteAccount}
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </>
                )}
              </Button>
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;