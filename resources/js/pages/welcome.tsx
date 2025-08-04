import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, Users, MessageCircle, Share2, Sparkles, Camera } from 'lucide-react';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
            {/* Navigation */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-rose-500" />
                    <span className="text-2xl font-bold text-gray-900">WeddingInvites</span>
                </div>
                <div className="space-x-4">
                    {canLogin && (
                        <Button variant="ghost" asChild>
                            <a href="/login">Sign In</a>
                        </Button>
                    )}
                    {canRegister && (
                        <Button asChild>
                            <a href="/register">Get Started</a>
                        </Button>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="text-center py-20 px-6 max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                        Create Beautiful
                        <span className="text-rose-500 block">Wedding Invitations</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Design stunning digital wedding invitations, manage RSVPs, collect guestbook messages, 
                        and share your special day with loved ones - all in one beautiful platform 💕
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Button size="lg" className="text-lg px-8 py-4" asChild>
                        <a href="/register">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Create Your Invitation
                        </a>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                        <a href="/login">View Templates</a>
                    </Button>
                </div>

                {/* Preview Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-rose-100">
                        <div className="h-40 bg-gradient-to-br from-rose-200 to-pink-300 rounded-lg mb-4 flex items-center justify-center">
                            <Heart className="h-16 w-16 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Classic Elegance</h3>
                        <p className="text-gray-600 text-sm">Timeless design with gold accents</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
                        <div className="h-40 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-lg mb-4 flex items-center justify-center">
                            <Sparkles className="h-16 w-16 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Modern Minimalist</h3>
                        <p className="text-gray-600 text-sm">Clean, contemporary styling</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                        <div className="h-40 bg-gradient-to-br from-green-200 to-emerald-300 rounded-lg mb-4 flex items-center justify-center">
                            <Camera className="h-16 w-16 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Floral Romance</h3>
                        <p className="text-gray-600 text-sm">Beautiful botanical elements</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Everything You Need for Your Perfect Wedding
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From beautiful invitations to guest management, we've got every detail covered ✨
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="h-8 w-8 text-rose-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Details</h3>
                            <p className="text-gray-600">Add ceremony & reception info, dates, venues, and special messages</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">RSVP Management</h3>
                            <p className="text-gray-600">Track responses, guest counts, dietary requirements, and attendance</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Guestbook</h3>
                            <p className="text-gray-600">Collect heartfelt messages and well-wishes from your guests</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Share2 className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Sharing</h3>
                            <p className="text-gray-600">Generate beautiful shareable links for social media and email</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Simple Steps to Your Dream Invitation
                        </h2>
                        <p className="text-xl text-gray-600">Create your perfect wedding invitation in just a few clicks</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Template</h3>
                            <p className="text-gray-600">Select from our beautiful collection of professionally designed templates</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customize Details</h3>
                            <p className="text-gray-600">Add your names, date, venue, photos, and personal message</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Share & Celebrate</h3>
                            <p className="text-gray-600">Publish your invitation and share the unique link with your guests</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Create Your Dream Wedding Invitation?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of couples who have created beautiful, memorable invitations with our platform
                    </p>
                    <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-lg px-8 py-4" asChild>
                        <a href="/register">
                            <Heart className="mr-2 h-5 w-5" />
                            Start Creating Today
                        </a>
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Heart className="h-6 w-6 text-rose-500" />
                        <span className="text-xl font-bold text-gray-900">WeddingInvites</span>
                    </div>
                    <p className="text-gray-600">
                        Making your special day even more memorable with beautiful digital invitations
                    </p>
                </div>
            </footer>
        </div>
    );
}