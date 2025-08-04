<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuestbookEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'nullable|email|max:255',
            'message' => 'required|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'guest_name.required' => 'Your name is required.',
            'guest_email.email' => 'Please provide a valid email address.',
            'message.required' => 'Please write a message for the couple.',
            'message.max' => 'Message cannot exceed 1000 characters.',
        ];
    }
}