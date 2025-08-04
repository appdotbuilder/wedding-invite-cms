import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Heart, ArrowLeft } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Props {
    templates: Array<{
        id: number;
        name: string;
        description: string;
        category: string;
        structure: {
            theme: string;
            colors: {
                primary: string;
                secondary: string;
                accent: string;
            };
        };
    }>;
    [key: string]: unknown;
}

export default function CreateInvitation({ templates }: Props) {
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        template_id: '',
        title: '',
        bride_name: '',
        groom_name: '',
        wedding_date: '',
        venue: '',
        venue_address: '',
        ceremony_details: '',
        reception_details: '',
        rsvp_deadline: '',
        special_message: '',
        rsvp_enabled: true,
        guestbook_enabled: true,
    });

    const handleBack = () => {
        router.get(route('invitations.index'));
    };

    const handleTemplateSelect = (templateId: number) => {
        setSelectedTemplate(templateId);
        setFormData({ ...formData, template_id: templateId.toString() });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('invitations.store'), formData);
    };

    const getCategoryColor = (category: string) => {
        const colors = {
            classic: 'from-yellow-200 to-amber-300',
            modern: 'from-blue-200 to-indigo-300',
            rustic: 'from-green-200 to-emerald-300',
            elegant: 'from-purple-200 to-violet-300',
            floral: 'from-pink-200 to-rose-300',
            minimalist: 'from-gray-200 to-slate-300',
        };
        return colors[category as keyof typeof colors] || 'from-gray-200 to-gray-300';
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Invitations
                    </Button>
                    <div>
                        <Heading title="Create Wedding Invitation" description="Choose a template and customize your perfect invitation" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Template Selection */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Step 1: Choose Your Template
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {templates.map((template) => (
                                    <div
                                        key={template.id}
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                            selectedTemplate === template.id
                                                ? 'border-rose-500 bg-rose-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => handleTemplateSelect(template.id)}
                                    >
                                        <div className={`h-32 bg-gradient-to-br ${getCategoryColor(template.category)} rounded-lg mb-3 flex items-center justify-center`}>
                                            <Heart className="h-12 w-12 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                                            {template.category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Step 2: Add Your Details
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Invitation Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                            placeholder="Sarah & John's Wedding"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Bride's Name
                                            </label>
                                            <input
                                                type="text"
                                                name="bride_name"
                                                value={formData.bride_name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Groom's Name
                                            </label>
                                            <input
                                                type="text"
                                                name="groom_name"
                                                value={formData.groom_name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Wedding Date
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="wedding_date"
                                            value={formData.wedding_date}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Venue
                                        </label>
                                        <input
                                            type="text"
                                            name="venue"
                                            value={formData.venue}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                            placeholder="Grand Ballroom Hotel"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Venue Address
                                        </label>
                                        <textarea
                                            name="venue_address"
                                            value={formData.venue_address}
                                            onChange={handleInputChange}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                            placeholder="123 Main Street, City, State 12345"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Special Message
                                        </label>
                                        <textarea
                                            name="special_message"
                                            value={formData.special_message}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                            placeholder="Join us as we celebrate our love and begin our journey together..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            RSVP Deadline
                                        </label>
                                        <input
                                            type="date"
                                            name="rsvp_deadline"
                                            value={formData.rsvp_deadline}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-gray-700">Features</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="rsvp_enabled"
                                                checked={formData.rsvp_enabled}
                                                onChange={handleInputChange}
                                                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Enable RSVP</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="guestbook_enabled"
                                                checked={formData.guestbook_enabled}
                                                onChange={handleInputChange}
                                                className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Enable Digital Guestbook</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6">
                                    <Button type="button" variant="outline" onClick={handleBack}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="bg-rose-500 hover:bg-rose-600"
                                        disabled={!selectedTemplate}
                                    >
                                        Create Invitation
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}