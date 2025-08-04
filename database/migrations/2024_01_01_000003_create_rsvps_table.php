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
        Schema::create('rsvps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $table->string('guest_name')->comment('Guest name');
            $table->string('guest_email')->comment('Guest email address');
            $table->string('guest_phone')->nullable()->comment('Guest phone number');
            $table->enum('attendance', ['attending', 'not_attending', 'maybe'])->comment('Attendance status');
            $table->integer('guest_count')->default(1)->comment('Number of guests attending');
            $table->text('dietary_requirements')->nullable()->comment('Dietary requirements or restrictions');
            $table->text('message')->nullable()->comment('Message from guest');
            $table->timestamps();
            
            $table->index('invitation_id');
            $table->index('attendance');
            $table->index('guest_email');
            $table->index(['invitation_id', 'attendance']);
            $table->unique(['invitation_id', 'guest_email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvps');
    }
};