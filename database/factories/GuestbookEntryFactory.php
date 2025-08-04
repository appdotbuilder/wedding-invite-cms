<?php

namespace Database\Factories;

use App\Models\GuestbookEntry;
use App\Models\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GuestbookEntry>
 */
class GuestbookEntryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\GuestbookEntry>
     */
    protected $model = GuestbookEntry::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $messages = [
            'Wishing you both a lifetime of love and happiness! 💕',
            'Congratulations on your special day! Can\'t wait to celebrate with you!',
            'So excited for your wedding! You two are perfect together! ✨',
            'May your marriage be filled with joy, laughter, and endless love!',
            'Best wishes for a wonderful wedding and a happy future together!',
            'Your love story is beautiful - here\'s to the next chapter! 🥂',
        ];
        
        return [
            'invitation_id' => Invitation::factory(),
            'guest_name' => fake()->name(),
            'guest_email' => fake()->optional()->safeEmail(),
            'message' => fake()->randomElement($messages),
            'is_approved' => true,
        ];
    }
}