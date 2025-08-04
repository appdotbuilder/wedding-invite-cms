import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Plus, Heart, Calendar, Eye, Edit, Trash2, Share2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Props {
    invitations: {
        data: Array<{
            id: number;
            title: string;
            bride_name: string;
            groom_name: string;
            wedding_date: string;
            venue: string;
            slug: string;
            is_published: boolean;
            views_count: number;
            rsvps_count?: number;
            template: {
                name: string;
                category: string;
            };
            created_at: string;
        }>;
    };
    [key: string]: unknown;
}

export default function InvitationsIndex({ invitations }: Props) {
    const handleCreateInvitation = () => {
        router.get(route('invitations.create'));
    };

    const handleEdit = (id: number) => {
        router.get(route('invitations.edit', id));
    };

    const handleView = (id: number) => {
        router.get(route('invitations.show', id));
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this invitation?')) {
            router.delete(route('invitations.destroy', id));
        }
    };

    const copyInvitationLink = (slug: string) => {
        const url = route('public.invitation', slug);
        navigator.clipboard.writeText(url);
        // You could add a toast notification here
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Heading title="My Wedding Invitations" description="Manage your beautiful wedding invitations" />
                    </div>
                    <Button onClick={handleCreateInvitation} className="bg-rose-500 hover:bg-rose-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Invitation
                    </Button>
                </div>

                {invitations.data.length === 0 ? (
                    /* Empty State */
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
                ) : (
                    /* Invitations Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {invitations.data.map((invitation) => (
                            <div key={invitation.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                {/* Preview */}
                                <div className="h-48 bg-gradient-to-br from-rose-100 to-pink-200 rounded-t-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <Heart className="h-16 w-16 text-rose-500 mx-auto mb-2" />
                                        <p className="text-rose-700 font-semibold">{invitation.template.name}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                                            {invitation.title}
                                        </h3>
                                        <div className="flex items-center space-x-1">
                                            {invitation.is_published ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-2">
                                        {invitation.bride_name} & {invitation.groom_name}
                                    </p>

                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {formatDate(invitation.wedding_date)}
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <Eye className="h-4 w-4 mr-1" />
                                        {invitation.views_count} views
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-2">
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => handleView(invitation.id)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => handleEdit(invitation.id)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            {invitation.is_published && (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => copyInvitationLink(invitation.slug)}
                                                    title="Copy invitation link"
                                                >
                                                    <Share2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => handleDelete(invitation.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}