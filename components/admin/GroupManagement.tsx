"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Users, Plus, X } from 'lucide-react';
import { createAlert } from '@/lib/alerts';

interface Group {
  id: string;
  name: string;
  members: string[];
  permissions: string[];
  createdAt: string;
}

export default function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/groups`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch groups');
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const token = localStorage.getItem('token');
      const adminEmail = localStorage.getItem('email');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/create-group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newGroupName,
          members: selectedMembers,
          permissions: selectedPermissions,
        }),
      });

      if (!response.ok) throw new Error('Failed to create group');
      
      await createAlert(adminEmail!, 'success', `Group ${newGroupName} created successfully`);
      setNewGroupName('');
      setSelectedMembers([]);
      setSelectedPermissions([]);
      fetchGroups();
    } catch (error) {
      console.error('Error creating group:', error);
      const adminEmail = localStorage.getItem('email');
      await createAlert(adminEmail!, 'error', `Failed to create group ${newGroupName}`);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    if (!confirm('Are you sure you want to delete this group?')) return;

    try {
      const token = localStorage.getItem('token');
      const adminEmail = localStorage.getItem('email');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete-group`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ groupId }),
      });

      if (!response.ok) throw new Error('Failed to delete group');
      
      await createAlert(adminEmail!, 'success', 'Group deleted successfully');
      fetchGroups();
    } catch (error) {
      console.error('Error deleting group:', error);
      const adminEmail = localStorage.getItem('email');
      await createAlert(adminEmail!, 'error', 'Failed to delete group');
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
        <h2 className="text-2xl font-bold text-white">Group Management</h2>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="New group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
          />
          <Button 
            onClick={handleCreateGroup}
            className="bg-green-600 hover:bg-green-700"
            disabled={!newGroupName.trim()}
          >
            <Users className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[500px] rounded-md border border-gray-700 bg-black/20">
        <div className="p-4">
          <div className="grid grid-cols-1 gap-4">
            {groups.map((group) => (
              <div 
                key={group.id}
                className="bg-white/5 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                    <Button
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteGroup(group.id)}
                        >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.members.map((member) => (
                      <span 
                        key={member}
                        className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.permissions.map((permission) => (
                      <span 
                        key={permission}
                        className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-sm"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  Created: {new Date(group.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}