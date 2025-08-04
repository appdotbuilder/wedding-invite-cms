<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * App\Models\Invitation
 *
 * @property int $id
 * @property int $user_id
 * @property int $template_id
 * @property string $title
 * @property string $bride_name
 * @property string $groom_name
 * @property \Illuminate\Support\Carbon $wedding_date
 * @property string $venue
 * @property string|null $venue_address
 * @property string|null $ceremony_details
 * @property string|null $reception_details
 * @property string|null $rsvp_deadline
 * @property string|null $special_message
 * @property array|null $photos
 * @property array|null $videos
 * @property array|null $custom_styling
 * @property string $slug
 * @property bool $is_published
 * @property bool $rsvp_enabled
 * @property bool $guestbook_enabled
 * @property int $views_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\InvitationTemplate $template
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Rsvp> $rsvps
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GuestbookEntry> $guestbookEntries
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereBrideName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereCeremonyDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereCustomStyling($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereGroomName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereGuestbookEnabled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation wherePhotos($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereReceptionDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereRsvpDeadline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereRsvpEnabled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereSpecialMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereTemplateId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereVenue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereVenueAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereVideos($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereViewsCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation whereWeddingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invitation published()
 * @method static \Database\Factories\InvitationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Invitation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'template_id',
        'title',
        'bride_name',
        'groom_name',
        'wedding_date',
        'venue',
        'venue_address',
        'ceremony_details',
        'reception_details',
        'rsvp_deadline',
        'special_message',
        'photos',
        'videos',
        'custom_styling',
        'slug',
        'is_published',
        'rsvp_enabled',
        'guestbook_enabled',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'wedding_date' => 'datetime',
        'photos' => 'array',
        'videos' => 'array',
        'custom_styling' => 'array',
        'is_published' => 'boolean',
        'rsvp_enabled' => 'boolean',
        'guestbook_enabled' => 'boolean',
        'views_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the invitation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the template used by this invitation.
     */
    public function template(): BelongsTo
    {
        return $this->belongsTo(InvitationTemplate::class);
    }

    /**
     * Get the RSVPs for this invitation.
     */
    public function rsvps(): HasMany
    {
        return $this->hasMany(Rsvp::class);
    }

    /**
     * Get the guestbook entries for this invitation.
     */
    public function guestbookEntries(): HasMany
    {
        return $this->hasMany(GuestbookEntry::class);
    }

    /**
     * Scope a query to only include published invitations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Generate a unique slug for the invitation.
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($invitation) {
            if (empty($invitation->slug)) {
                $invitation->slug = static::generateUniqueSlug($invitation->bride_name, $invitation->groom_name);
            }
        });
    }

    /**
     * Generate a unique slug based on names.
     *
     * @param string $brideName
     * @param string $groomName
     * @return string
     */
    protected static function generateUniqueSlug($brideName, $groomName)
    {
        $baseSlug = Str::slug($brideName . '-' . $groomName);
        $slug = $baseSlug;
        $counter = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}