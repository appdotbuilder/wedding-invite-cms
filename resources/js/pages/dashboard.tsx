import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Plus, Heart, Calendar, Users, Eye } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function Dashboard() {
    const handleCreateInvitation = () => {
        router.get(route('invitations.create'));
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title="Wedding Invitations" description="Create and manage your beautiful wedding invitations" />
                    </div>
                    <Button onClick={handleCreateInvitation} className="bg-rose-500 hover:bg-rose-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Invitation
                    </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="bg-rose-100 p-3 rounded-full">
                                <Heart className="h-6 w-6 text-rose-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                                <p className="text-gray-600">Total Invitations</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Eye className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                                <p className="text-gray-600">Total Views</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                                <p className="text-gray-600">RSVPs Received</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <Calendar className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl font-semibold text-gray-900">0</p>
                                <p className="text-gray-600">Published</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="h-12 w-12 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Create Your First Wedding Invitation
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Get started by creating a beautiful digital wedding invitation. 
                        Choose from our collection of stunning templates and customize it to match your style.
                    </p>
                    <Button onClick={handleCreateInvitation} className="bg-rose-500 hover:bg-rose-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Invitation
                    </Button>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    </div>
                    <div className="p-6">
                        <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No recent activity yet</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Activity will appear here once you create your first invitation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}