<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Rsvp
 *
 * @property int $id
 * @property int $invitation_id
 * @property string $guest_name
 * @property string $guest_email
 * @property string|null $guest_phone
 * @property string $attendance
 * @property int $guest_count
 * @property string|null $dietary_requirements
 * @property string|null $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Invitation $invitation
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp query()
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereAttendance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereDietaryRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereGuestCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereGuestEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereGuestName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereGuestPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereInvitationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rsvp whereUpdatedAt($value)
 * @method static \Database\Factories\RsvpFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Rsvp extends Model
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
        'guest_phone',
        'attendance',
        'guest_count',
        'dietary_requirements',
        'message',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'guest_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the invitation that owns the RSVP.
     */
    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}