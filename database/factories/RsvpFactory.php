<?php

namespace Database\Factories;

use App\Models\Invitation;
use App\Models\Rsvp;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rsvp>
 */
class RsvpFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Rsvp>
     */
    protected $model = Rsvp::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $attendance = fake()->randomElement(['attending', 'not_attending', 'maybe']);
        
        return [
            'invitation_id' => Invitation::factory(),
            'guest_name' => fake()->name(),
            'guest_email' => fake()->unique()->safeEmail(),
            'guest_phone' => fake()->phoneNumber(),
            'attendance' => $attendance,
            'guest_count' => $attendance === 'attending' ? fake()->numberBetween(1, 4) : 0,
            'dietary_requirements' => fake()->optional()->sentence(),
            'message' => fake()->optional()->paragraph(),
        ];
    }
}