<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GuestbookEntry
 *
 * @property int $id
 * @property int $invitation_id
 * @property string $guest_name
 * @property string|null $guest_email
 * @property string $message
 * @property bool $is_approved
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Invitation $invitation
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereGuestEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereGuestName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereInvitationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereIsApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GuestbookEntry approved()
 * @method static \Database\Factories\GuestbookEntryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GuestbookEntry extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'invitation_id',
        'guest_name',
        'guest_email',
        'message',
        'is_approved',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_approved' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the invitation that owns the guestbook entry.
     */
    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }

    /**
     * Scope a query to only include approved entries.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }
}