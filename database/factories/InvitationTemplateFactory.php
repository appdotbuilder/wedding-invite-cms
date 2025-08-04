<?php

namespace Database\Factories;

use App\Models\InvitationTemplate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InvitationTemplate>
 */
class InvitationTemplateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\InvitationTemplate>
     */
    protected $model = InvitationTemplate::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['classic', 'modern', 'rustic', 'elegant', 'floral', 'minimalist'];
        
        return [
            'name' => fake()->words(2, true) . ' Template',
            'description' => fake()->sentence(),
            'category' => fake()->randomElement($categories),
            'structure' => [
                'theme' => fake()->randomElement(['classic', 'modern', 'rustic']),
                'colors' => [
                    'primary' => fake()->hexColor(),
                    'secondary' => fake()->hexColor(),
                    'accent' => fake()->hexColor()
                ],
                'fonts' => [
                    'heading' => fake()->randomElement(['Playfair Display', 'Inter', 'Merriweather']),
                    'body' => fake()->randomElement(['Source Sans Pro', 'Inter', 'Open Sans'])
                ],
                'layout' => fake()->randomElement(['centered', 'minimal', 'organic'])
            ],
            'is_active' => true,
        ];
    }
}