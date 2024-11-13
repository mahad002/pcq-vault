"use client";

import React, { use, useState, useEffect } from 'react';
import Navbar from '../navbar/page';

const AccountSettings: React.FC = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email') || '';
        setEmail(storedEmail);
    }, []);
    
    // Handle profile update with name and contact only
    const handleProfileUpdate = async () => {
        try {
            const response = await fetch('/api/users/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ email, name, contact}),
            });

            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                const errorData = await response.json();
                alert(`Failed to update profile: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating profile.');
        }
    };

    // Handle password change
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch('/api/users/change-password', {
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
                alert('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                const errorData = await response.json();
                alert(`Failed to change password: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing password.');
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to permanently delete your account? This action cannot be undone.'
        );

        if (confirmDelete) {
            try {
                const response = await fetch('/api/users/delete-account', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    alert('Account deleted successfully!');
                    // Perform additional actions here, like redirecting to a login or home page
                } else {
                    const errorData = await response.json();
                    alert(`Failed to delete account: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('An error occurred while deleting account.');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center bg-gray-100">
                <div className="max-w-3xl w-full p-6 my-10 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Account Settings</h2>
                    
                    {/* Profile Update Section */}
                    <section className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Update Profile</h3>
                        <div className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Contact Number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleProfileUpdate}
                                className="w-full bg-blue-600 text-white rounded-lg py-2 mt-4 font-semibold hover:bg-blue-700 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </section>

                    {/* Password Change Section */}
                    <section className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h3>
                        <div className="grid gap-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleChangePassword}
                                className="w-full bg-green-600 text-white rounded-lg py-2 mt-4 font-semibold hover:bg-green-700 transition"
                            >
                                Update Password
                            </button>
                        </div>
                    </section>

                    {/* Account Deletion Section */}
                    <section>
                        <h3 className="text-xl font-semibold text-red-700 mb-4">Delete Account</h3>
                        <p className="text-red-600 mb-4">
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button
                            onClick={handleDeleteAccount}
                            className="w-full bg-red-600 text-white rounded-lg py-2 font-semibold hover:bg-red-700 transition"
                        >
                            Delete Account
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
