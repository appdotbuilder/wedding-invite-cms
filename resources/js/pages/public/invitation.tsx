import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, MapPin, Clock, Users, MessageCircle, Share2 } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Props {
    invitation: {
        id: number;
        title: string;
        bride_name: string;
        groom_name: string;
        wedding_date: string;
        venue: string;
        venue_address: string;
        ceremony_details: string;
        reception_details: string;
        rsvp_deadline: string;
        special_message: string;
        photos: string[] | null;
        videos: string[] | null;
        slug: string;
        is_published: boolean;
        rsvp_enabled: boolean;
        guestbook_enabled: boolean;
        template: {
            name: string;
            category: string;
            structure: {
                theme: string;
                colors: {
                    primary: string;
                    secondary: string;
                    accent: string;
                };
            };
        };
        guestbook_entries: Array<{
            id: number;
            guest_name: string;
            message: string;
            created_at: string;
        }>;
    };
    [key: string]: unknown;
}

export default function PublicInvitation({ invitation }: Props) {
    const [showRsvpForm, setShowRsvpForm] = useState(false);
    const [showGuestbookForm, setShowGuestbookForm] = useState(false);
    const [rsvpData, setRsvpData] = useState({
        guest_name: '',
        guest_email: '',
        guest_phone: '',
        attendance: 'attending',
        guest_count: 1,
        dietary_requirements: '',
        message: '',
    });
    const [guestbookData, setGuestbookData] = useState({
        guest_name: '',
        guest_email: '',
        message: '',
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    const handleRsvpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('public.rsvp', invitation.slug), rsvpData);
    };

    const handleGuestbookSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('public.guestbook', invitation.slug), guestbookData);
    };

    const shareInvitation = () => {
        if (navigator.share) {
            navigator.share({
                title: invitation.title,
                text: `Join us for ${invitation.bride_name} & ${invitation.groom_name}'s wedding!`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const themeColors = invitation.template.structure.colors;

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-rose-500" />
                        <span className="font-semibold text-gray-900">Wedding Invitation</span>
                    </div>
                    <Button variant="outline" onClick={shareInvitation}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Main Invitation */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                    {/* Hero Section */}
                    <div 
                        className="px-8 py-16 text-center text-white relative"
                        style={{ 
                            background: `linear-gradient(135deg, ${themeColors.primary}CC, ${themeColors.accent}CC)` 
                        }}
                    >
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <div className="relative z-10">
                            <Heart className="h-16 w-16 mx-auto mb-6 opacity-80" />
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                {invitation.bride_name}
                                <span className="block text-2xl md:text-3xl font-light">&</span>
                                {invitation.groom_name}
                            </h1>
                            <p className="text-xl md:text-2xl font-light mb-2">are getting married!</p>
                            <div className="flex items-center justify-center space-x-2 text-lg">
                                <Calendar className="h-5 w-5" />
                                <span>{formatDate(invitation.wedding_date)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="px-8 py-12">
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <Clock className="h-8 w-8 text-rose-500 mr-2" />
                                    <h3 className="text-2xl font-semibold text-gray-900">When</h3>
                                </div>
                                <p className="text-lg text-gray-700 mb-2">{formatDate(invitation.wedding_date)}</p>
                                <p className="text-gray-600">{formatTime(invitation.wedding_date)}</p>
                                {invitation.ceremony_details && (
                                    <p className="text-sm text-gray-500 mt-2">{invitation.ceremony_details}</p>
                                )}
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center mb-4">
                                    <MapPin className="h-8 w-8 text-rose-500 mr-2" />
                                    <h3 className="text-2xl font-semibold text-gray-900">Where</h3>
                                </div>
                                <p className="text-lg text-gray-700 mb-2">{invitation.venue}</p>
                                {invitation.venue_address && (
                                    <p className="text-gray-600">{invitation.venue_address}</p>
                                )}
                                {invitation.reception_details && (
                                    <p className="text-sm text-gray-500 mt-2">{invitation.reception_details}</p>
                                )}
                            </div>
                        </div>

                        {/* Special Message */}
                        {invitation.special_message && (
                            <div className="text-center mb-12">
                                <div className="max-w-2xl mx-auto">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">A Message from the Couple</h3>
                                    <p className="text-lg text-gray-700 italic leading-relaxed">
                                        "{invitation.special_message}"
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {invitation.rsvp_enabled && (
                                <Button 
                                    size="lg" 
                                    className="bg-rose-500 hover:bg-rose-600 text-lg px-8"
                                    onClick={() => setShowRsvpForm(true)}
                                >
                                    <Users className="mr-2 h-5 w-5" />
                                    RSVP Now
                                </Button>
                            )}
                            {invitation.guestbook_enabled && (
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="text-lg px-8"
                                    onClick={() => setShowGuestbookForm(true)}
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Leave a Message
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RSVP Form Modal */}
                {showRsvpForm && invitation.rsvp_enabled && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">RSVP</h3>
                                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={rsvpData.guest_name}
                                            onChange={(e) => setRsvpData({...rsvpData, guest_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={rsvpData.guest_email}
                                            onChange={(e) => setRsvpData({...rsvpData, guest_email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Will you be attending? *
                                        </label>
                                        <select
                                            value={rsvpData.attendance}
                                            onChange={(e) => setRsvpData({...rsvpData, attendance: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                            required
                                        >
                                            <option value="attending">Yes, I'll be there! 🎉</option>
                                            <option value="not_attending">Sorry, can't make it</option>
                                            <option value="maybe">Maybe</option>
                                        </select>
                                    </div>

                                    {rsvpData.attendance === 'attending' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Guests *
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="10"
                                                value={rsvpData.guest_count}
                                                onChange={(e) => setRsvpData({...rsvpData, guest_count: parseInt(e.target.value)})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            value={rsvpData.message}
                                            onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                            placeholder="Congratulations! Looking forward to celebrating with you..."
                                        />
                                    </div>

                                    <div className="flex space-x-4 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setShowRsvpForm(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-rose-500 hover:bg-rose-600">
                                            Submit RSVP
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Guestbook Form Modal */}
                {showGuestbookForm && invitation.guestbook_enabled && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full">
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Message</h3>
                                <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={guestbookData.guest_name}
                                            onChange={(e) => setGuestbookData({...guestbookData, guest_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email (Optional)
                                        </label>
                                        <input
                                            type="email"
                                            value={guestbookData.guest_email}
                                            onChange={(e) => setGuestbookData({...guestbookData, guest_email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message *
                                        </label>
                                        <textarea
                                            value={guestbookData.message}
                                            onChange={(e) => setGuestbookData({...guestbookData, message: e.target.value})}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500"
                                            placeholder="Congratulations! Wishing you both a lifetime of happiness..."
                                            required
                                        />
                                    </div>

                                    <div className="flex space-x-4 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setShowGuestbookForm(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-rose-500 hover:bg-rose-600">
                                            Submit Message
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Guestbook Messages */}
                {invitation.guestbook_enabled && invitation.guestbook_entries.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Messages from Loved Ones</h3>
                        <div className="space-y-6">
                            {invitation.guestbook_entries.slice(0, 6).map((entry) => (
                                <div key={entry.id} className="border-l-4 border-rose-200 pl-4">
                                    <p className="text-gray-700 italic mb-2">"{entry.message}"</p>
                                    <p className="text-sm text-gray-500">— {entry.guest_name}</p>
                                </div>
                            ))}
                        </div>
                        {invitation.guestbook_entries.length > 6 && (
                            <div className="text-center mt-6">
                                <p className="text-gray-500">And {invitation.guestbook_entries.length - 6} more messages...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}