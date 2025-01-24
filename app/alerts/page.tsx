"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/page';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Calendar, Shield, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Alert {
  _id: string;
  userEmail: string;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    if (!email || !token) {
      router.push('/profile');
      return;
    }

    fetchAlerts(email, token);
  }, [router]);

  const fetchAlerts = async (email: string, token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/alerts?email=${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      setAlerts(data.alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const getAlertStyles = (type: string) => {
    const baseStyles = "relative overflow-hidden rounded-lg p-4 transition-all duration-300";
    switch (type) {
      case 'info':
        return `${baseStyles} bg-blue-500/10 hover:bg-blue-500/20`;
      case 'warning':
        return `${baseStyles} bg-yellow-500/10 hover:bg-yellow-500/20`;
      case 'success':
        return `${baseStyles} bg-green-500/10 hover:bg-green-500/20`;
      case 'error':
        return `${baseStyles} bg-red-500/10 hover:bg-red-500/20`;
      default:
        return `${baseStyles} bg-gray-500/10 hover:bg-gray-500/20`;
    }
  };

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
              <Bell className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                <p className="text-gray-400">Stay updated with your security alerts</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-gray-400">
                {alerts.filter(alert => !alert.read).length} unread alerts
              </span>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <ScrollArea className="h-[calc(100vh-200px)] px-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : alerts.length > 0 ? (
                <div className="space-y-4 py-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert._id}
                      className={getAlertStyles(alert.type)}
                    >
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <p className="text-white">{alert.message}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(alert.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                  <Bell className="h-8 w-8 mb-2" />
                  <p>No alerts to display</p>
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}