<?php

use App\Http\Controllers\GuestbookController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\PublicInvitationController;
use App\Http\Controllers\RsvpController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - wedding invitation platform showcase
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Invitation CRUD
    Route::resource('invitations', InvitationController::class);
    
    // RSVP management for invitation owners
    Route::get('/invitations/{invitation}/rsvps', [RsvpController::class, 'index'])
        ->name('invitations.rsvps');
    
    // Guestbook management for invitation owners
    Route::get('/invitations/{invitation}/guestbook', [GuestbookController::class, 'index'])
        ->name('invitations.guestbook');
});

// Public invitation viewing and interaction
Route::get('/invitation/{slug}', [PublicInvitationController::class, 'show'])
    ->name('public.invitation');

// Public RSVP submission
Route::post('/invitation/{slug}/rsvp', [RsvpController::class, 'store'])
    ->name('public.rsvp');

// Public guestbook entry submission
Route::post('/invitation/{slug}/guestbook', [GuestbookController::class, 'store'])
    ->name('public.guestbook');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
