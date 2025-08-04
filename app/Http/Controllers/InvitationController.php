<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;  
use App\Http\Requests\StoreInvitationRequest;
use App\Http\Requests\UpdateInvitationRequest;
use App\Models\Invitation;
use App\Models\InvitationTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invitations = auth()->user()->invitations()
            ->with('template')
            ->latest()
            ->paginate(12);
        
        return Inertia::render('invitations/index', [
            'invitations' => $invitations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $templates = InvitationTemplate::active()
            ->orderBy('category')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('invitations/create', [
            'templates' => $templates
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvitationRequest $request)
    {
        $invitation = auth()->user()->invitations()->create($request->validated());

        return redirect()->route('invitations.show', $invitation)
            ->with('success', 'Wedding invitation created successfully! 💕');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation) 
    {
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }
        
        $invitation->load(['template', 'rsvps', 'guestbookEntries' => function($query) {
            $query->approved()->latest();
        }]);
        
        return Inertia::render('invitations/show', [
            'invitation' => $invitation
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invitation $invitation)
    {
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }
        
        $templates = InvitationTemplate::active()
            ->orderBy('category')
            ->orderBy('name')
            ->get();
        
        return Inertia::render('invitations/edit', [
            'invitation' => $invitation,
            'templates' => $templates
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvitationRequest $request, Invitation $invitation)
    {
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }
        
        $invitation->update($request->validated());

        return redirect()->route('invitations.show', $invitation)
            ->with('success', 'Wedding invitation updated successfully! ✨');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation)
    {
        if ($invitation->user_id !== auth()->id()) {
            abort(403);
        }
        
        $invitation->delete();

        return redirect()->route('invitations.index')
            ->with('success', 'Wedding invitation deleted successfully.');
    }
}