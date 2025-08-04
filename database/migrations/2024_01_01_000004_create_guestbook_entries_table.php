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
        Schema::create('guestbook_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $table->string('guest_name')->comment('Guest name');
            $table->string('guest_email')->nullable()->comment('Guest email address');
            $table->text('message')->comment('Guestbook message');
            $table->boolean('is_approved')->default(true)->comment('Whether message is approved for display');
            $table->timestamps();
            
            $table->index('invitation_id');
            $table->index('is_approved');
            $table->index(['invitation_id', 'is_approved']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guestbook_entries');
    }
};