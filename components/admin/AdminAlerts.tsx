"use client";

import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface Alert {
  _id: string;
  userEmail: string;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/alerts`, {
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

  const markAsRead = async (alertId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/alerts/${alertId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) throw new Error('Failed to mark alert as read');
      fetchAlerts();
    } catch (error) {
      console.error('Error marking alert as read:', error);
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
        <h2 className="text-2xl font-bold text-white">System Alerts</h2>
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-400" />
          <span className="text-gray-400">
            {alerts.filter(alert => !alert.read).length} unread alerts
          </span>
        </div>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert._id}
              className={`${getAlertStyles(alert.type)} ${!alert.read ? 'border-l-4 border-blue-500' : ''}`}
            >
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-400">{alert.userEmail}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {new Date(alert.createdAt).toLocaleString()}
                      </span>
                      {!alert.read && (
                        <Button
                            onClick={() => markAsRead(alert._id)}
                            className="text-blue-400 hover:text-blue-500 h-8 px-3 py-1 text-sm"
                            variant="ghost"
                        >
                            Mark as read
                        </Button>
                        )}
                    </div>
                  </div>
                  <p className="mt-1 text-white">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}