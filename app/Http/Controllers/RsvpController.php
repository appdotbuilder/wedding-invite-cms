<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRsvpRequest;
use App\Models\Invitation;
use App\Models\Rsvp;
use Inertia\Inertia;

class RsvpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Invitation $invitation)
    {
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }
        
        $rsvps = $invitation->rsvps()
            ->latest()
            ->paginate(20);
        
        $stats = [
            'total' => $invitation->rsvps()->count(),
            'attending' => $invitation->rsvps()->where('attendance', 'attending')->count(),
            'not_attending' => $invitation->rsvps()->where('attendance', 'not_attending')->count(),
            'maybe' => $invitation->rsvps()->where('attendance', 'maybe')->count(),
            'total_guests' => $invitation->rsvps()->where('attendance', 'attending')->sum('guest_count'),
        ];
        
        return Inertia::render('rsvps/index', [
            'invitation' => $invitation,
            'rsvps' => $rsvps,
            'stats' => $stats
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRsvpRequest $request, $slug)
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('is_published', true)
            ->where('rsvp_enabled', true)
            ->firstOrFail();
        
        $rsvp = $invitation->rsvps()->updateOrCreate(
            ['guest_email' => $request->guest_email],
            $request->validated()
        );

        return redirect()->route('public.invitation', $slug)
            ->with('success', 'Thank you for your RSVP! 💕');
    }
}