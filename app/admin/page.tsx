"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/page';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Shield, 
  Activity, 
  Bell, 
  UserPlus, 
  Settings, 
  Loader2,
  AlertTriangle
} from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import GroupManagement from '@/components/admin/GroupManagement';
import ActivityLogs from '@/components/admin/ActivityLogs';
import AdminAlerts from '@/components/admin/AdminAlerts';
import { createAlert } from '@/lib/alerts';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const userRole = localStorage.getItem('userRole');

        if (!token || !email) {
          console.log('No token or email found, redirecting to profile');
          router.push('/profile');
          return;
        }

        if (userRole !== 'admin') {
          console.log('User is not admin, redirecting to home');
          await createAlert(email, 'error', 'Unauthorized access attempt to admin page');
          router.push('/');
          return;
        }

        // // Verify admin status with backend
        // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verify-admin`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to verify admin status');
        // }

        // const data = await response.json();
        console.log("Role: ", localStorage.getItem("userRole"))
        if (localStorage.getItem("userRole") !== "admin" ) {
          console.log('Backend verification failed, redirecting to home');
          await createAlert(email, 'error', 'Admin verification failed');
          router.push('/');
          return;
        }

        setIsAdmin(true);
        await createAlert(email, 'info', 'Admin dashboard accessed');
      } catch (error) {
        console.error('Error verifying admin status:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white flex flex-col items-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p>You dont have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="relative">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/video.mp4"
          autoPlay
          muted
          loop
        />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400">Manage users, groups, and monitor system activity</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="bg-white/10 p-1">
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>User Management</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Group Management</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Activity Logs</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>System Alerts</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card className="bg-white/10 backdrop-blur-lg border-none p-6">
                <UserManagement />
              </Card>
            </TabsContent>

            <TabsContent value="groups">
              <Card className="bg-white/10 backdrop-blur-lg border-none p-6">
                <GroupManagement />
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="bg-white/10 backdrop-blur-lg border-none p-6">
                <ActivityLogs />
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <Card className="bg-white/10 backdrop-blur-lg border-none p-6">
                <AdminAlerts />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}