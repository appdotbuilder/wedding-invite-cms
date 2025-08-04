<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Inertia\Inertia;

class PublicInvitationController extends Controller
{
    /**
     * Display the public invitation.
     */
    public function show($slug)
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('is_published', true)
            ->with(['template', 'guestbookEntries' => function($query) {
                $query->approved()->latest();
            }])
            ->firstOrFail();
        
        // Increment views count
        $invitation->increment('views_count');
        
        return Inertia::render('public/invitation', [
            'invitation' => $invitation
        ]);
    }
}