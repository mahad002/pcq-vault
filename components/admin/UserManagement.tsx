"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, UserPlus, Shield, Trash2 } from 'lucide-react';
import { createAlert } from '@/lib/alerts';

interface User {
  email: string;
  role: string;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');          
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignRole = async (email: string, role: string) => {
    try {
      const token = localStorage.getItem('token');
      const adminEmail = localStorage.getItem('email');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, role }),
      });

      if (!response.ok) throw new Error('Failed to assign role');
      
      await createAlert(adminEmail!, 'success', `Role ${role} assigned to ${email}`);
      fetchUsers();
    } catch (error) {
      console.error('Error assigning role:', error);
      const adminEmail = localStorage.getItem('email');
      await createAlert(adminEmail!, 'error', `Failed to assign role to ${email}`);
    }
  };

  const handleDeleteUser = async (email: string) => {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const adminEmail = localStorage.getItem('email');

      console.log("Email: ", email);
      console.log("Token: ", token);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to delete user');
      
      await createAlert(adminEmail!, 'success', `User ${email} deleted successfully`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      const adminEmail = localStorage.getItem('email');
      await createAlert(adminEmail!, 'error', `Failed to delete user ${email}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <div className="flex items-center space-x-4">
          <Input
            type="email"
            placeholder="New user email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
          />
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            className="bg-white/10 border border-gray-600 rounded-md px-3 py-2 text-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button className="bg-green-600 hover:bg-green-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[500px] rounded-md border border-gray-700 bg-black/20">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Email</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Created At</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {users.map((user) => (
                <tr key={user.email} className="border-t border-gray-700">
                  <td className="py-4">{user.email}</td>
                  <td className="py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleAssignRole(user.email, e.target.value)}
                      className="bg-white/10 border border-gray-600 rounded-md px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-4">
                    <Button
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteUser(user.email)}
                        >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
}