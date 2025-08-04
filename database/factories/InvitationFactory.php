<?php

namespace Database\Factories;

use App\Models\Invitation;
use App\Models\InvitationTemplate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invitation>
 */
class InvitationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Invitation>
     */
    protected $model = Invitation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brideName = fake()->firstNameFemale();
        $groomName = fake()->firstNameMale();
        $weddingDate = fake()->dateTimeBetween('+1 month', '+1 year');
        
        return [
            'user_id' => User::factory(),
            'template_id' => InvitationTemplate::factory(),
            'title' => $brideName . ' & ' . $groomName . ' Wedding',
            'bride_name' => $brideName,
            'groom_name' => $groomName,
            'wedding_date' => $weddingDate,
            'venue' => fake()->company() . ' Hall',
            'venue_address' => fake()->address(),
            'ceremony_details' => 'Ceremony starts at ' . fake()->time('H:i'),
            'reception_details' => 'Reception to follow immediately after ceremony',
            'rsvp_deadline' => fake()->dateTimeBetween('now', $weddingDate),
            'special_message' => fake()->paragraph(),
            'photos' => null,
            'videos' => null,
            'custom_styling' => null,
            'slug' => fake()->unique()->slug(),
            'is_published' => fake()->boolean(70),
            'rsvp_enabled' => true,
            'guestbook_enabled' => true,
            'views_count' => fake()->numberBetween(0, 500),
        ];
    }
}