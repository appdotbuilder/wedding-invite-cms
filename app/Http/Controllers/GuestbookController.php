<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGuestbookEntryRequest;
use App\Models\Invitation;
use App\Models\GuestbookEntry;
use Inertia\Inertia;

class GuestbookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Invitation $invitation)
    {
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }
        
        $entries = $invitation->guestbookEntries()
            ->latest()
            ->paginate(20);
        
        return Inertia::render('guestbook/index', [
            'invitation' => $invitation,
            'entries' => $entries
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuestbookEntryRequest $request, $slug)
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('is_published', true)
            ->where('guestbook_enabled', true)
            ->firstOrFail();
        
        $invitation->guestbookEntries()->create($request->validated());

        return redirect()->route('public.invitation', $slug)
            ->with('success', 'Thank you for your lovely message! 💕');
    }
}