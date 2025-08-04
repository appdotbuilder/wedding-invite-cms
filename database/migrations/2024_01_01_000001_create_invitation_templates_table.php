<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invitation_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Template name');
            $table->text('description')->nullable()->comment('Template description');
            $table->text('preview_image')->nullable()->comment('Template preview image URL');
            $table->json('structure')->comment('Template structure and styling');
            $table->enum('category', ['classic', 'modern', 'rustic', 'elegant', 'floral', 'minimalist'])->default('modern');
            $table->boolean('is_active')->default(true)->comment('Whether template is available for use');
            $table->timestamps();
            
            $table->index('category');
            $table->index('is_active');
            $table->index(['is_active', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_templates');
    }
};