"use client";

import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Calendar, Filter } from 'lucide-react';

interface ActivityLog {
  email: string;
  action: string;
  details: any;
  timestamp: string;
  ip: string;
  method: string;
  path: string;
  status: number;
  success: boolean;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/activity/logs?`;
      
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;
      if (actionFilter !== 'all') url += `&type=${actionFilter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch activity logs');
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    if (status >= 500) return 'text-red-400';
    return 'text-gray-400';
  };

  const filteredLogs = logs.filter(log => 
    log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h2 className="text-2xl font-bold text-white">Activity Logs</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white/10 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-white/10 border-gray-600 text-white"
          />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-white/10 border border-gray-600 rounded-md px-3 py-2 text-white"
          >
            <option value="all">All Actions</option>
            <option value="login">Login</option>
            <option value="analysis">Analysis</option>
            <option value="admin">Admin Actions</option>
          </select>
          <Button 
            onClick={fetchLogs}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[500px] rounded-md border border-gray-700 bg-black/20">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-4">Timestamp</th>
                <th className="pb-4">User</th>
                <th className="pb-4">Action</th>
                <th className="pb-4">Method</th>
                <th className="pb-4">Path</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">IP</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {filteredLogs.map((log, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3">{log.email}</td>
                  <td className="py-3">
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`font-mono ${
                      log.method === 'GET' ? 'text-green-400' :
                      log.method === 'POST' ? 'text-blue-400' :
                      log.method === 'PUT' ? 'text-yellow-400' :
                      log.method === 'DELETE' ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-sm">{log.path}</td>
                  <td className="py-3">
                    <span className={`font-mono ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-sm">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  );
}