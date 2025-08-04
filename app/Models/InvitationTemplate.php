<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\InvitationTemplate
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $preview_image
 * @property array $structure
 * @property string $category
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Invitation> $invitations
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate query()
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate wherePreviewImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereStructure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvitationTemplate active()
 * @method static \Database\Factories\InvitationTemplateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class InvitationTemplate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'preview_image',
        'structure',
        'category',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'structure' => 'array',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the invitations that use this template.
     */
    public function invitations(): HasMany
    {
        return $this->hasMany(Invitation::class, 'template_id');
    }

    /**
     * Scope a query to only include active templates.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}