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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('template_id')->constrained('invitation_templates')->onDelete('cascade');
            $table->string('title')->comment('Wedding invitation title');
            $table->string('bride_name')->comment('Bride\'s name');
            $table->string('groom_name')->comment('Groom\'s name');
            $table->datetime('wedding_date')->comment('Wedding date and time');
            $table->string('venue')->comment('Wedding venue');
            $table->text('venue_address')->nullable()->comment('Full venue address');
            $table->text('ceremony_details')->nullable()->comment('Ceremony details');
            $table->text('reception_details')->nullable()->comment('Reception details');
            $table->string('rsvp_deadline')->nullable()->comment('RSVP deadline date');
            $table->text('special_message')->nullable()->comment('Special message from couple');
            $table->json('photos')->nullable()->comment('Wedding photos URLs');
            $table->json('videos')->nullable()->comment('Wedding videos URLs');
            $table->json('custom_styling')->nullable()->comment('Custom styling overrides');
            $table->string('slug')->unique()->comment('Unique slug for invitation URL');
            $table->boolean('is_published')->default(false)->comment('Whether invitation is published');
            $table->boolean('rsvp_enabled')->default(true)->comment('Whether RSVP is enabled');
            $table->boolean('guestbook_enabled')->default(true)->comment('Whether guestbook is enabled');
            $table->integer('views_count')->default(0)->comment('Number of times invitation was viewed');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('template_id');
            $table->index('slug');
            $table->index('is_published');
            $table->index('wedding_date');
            $table->index(['user_id', 'is_published']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};