<?php

namespace Database\Seeders;

use App\Models\InvitationTemplate;
use Illuminate\Database\Seeder;

class InvitationTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Classic Elegance',
                'description' => 'A timeless and elegant design with gold accents and beautiful typography',
                'category' => 'classic',
                'structure' => [
                    'theme' => 'classic',
                    'colors' => ['primary' => '#D4AF37', 'secondary' => '#FFFFFF', 'accent' => '#000000'],
                    'fonts' => ['heading' => 'Playfair Display', 'body' => 'Source Sans Pro'],
                    'layout' => 'centered'
                ]
            ],
            [
                'name' => 'Modern Minimalist',
                'description' => 'Clean, modern design with plenty of white space and subtle colors',
                'category' => 'modern',
                'structure' => [
                    'theme' => 'modern',
                    'colors' => ['primary' => '#2D3748', 'secondary' => '#F7FAFC', 'accent' => '#4299E1'],
                    'fonts' => ['heading' => 'Inter', 'body' => 'Inter'],
                    'layout' => 'minimal'
                ]
            ],
            [
                'name' => 'Rustic Charm',
                'description' => 'Warm and cozy design with wood textures and earth tones',
                'category' => 'rustic',
                'structure' => [
                    'theme' => 'rustic',
                    'colors' => ['primary' => '#8B4513', 'secondary' => '#F5F5DC', 'accent' => '#228B22'],
                    'fonts' => ['heading' => 'Merriweather', 'body' => 'Open Sans'],
                    'layout' => 'organic'
                ]
            ],
            [
                'name' => 'Floral Romance',
                'description' => 'Beautiful floral patterns with soft pastels and romantic touches',
                'category' => 'floral',
                'structure' => [
                    'theme' => 'floral',
                    'colors' => ['primary' => '#FF69B4', 'secondary' => '#FFF0F5', 'accent' => '#98FB98'],
                    'fonts' => ['heading' => 'Dancing Script', 'body' => 'Lato'],
                    'layout' => 'romantic'
                ]
            ],
            [
                'name' => 'Vintage Glamour',
                'description' => 'Art deco inspired design with rich colors and glamorous details',
                'category' => 'elegant',
                'structure' => [
                    'theme' => 'vintage',
                    'colors' => ['primary' => '#4B0082', 'secondary' => '#FFD700', 'accent' => '#000000'],
                    'fonts' => ['heading' => 'Great Vibes', 'body' => 'Crimson Text'],
                    'layout' => 'glamour'
                ]
            ],
            [
                'name' => 'Garden Party',
                'description' => 'Fresh and vibrant with botanical elements and natural colors',
                'category' => 'floral',
                'structure' => [
                    'theme' => 'garden',
                    'colors' => ['primary' => '#228B22', 'secondary' => '#F0FFF0', 'accent' => '#FFB6C1'],
                    'fonts' => ['heading' => 'Libre Baskerville', 'body' => 'Source Sans Pro'],
                    'layout' => 'natural'
                ]
            ]
        ];

        foreach ($templates as $template) {
            InvitationTemplate::create($template);
        }
    }
}