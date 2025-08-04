<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvitationRequest extends FormRequest
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
            'template_id' => 'required|exists:invitation_templates,id',
            'title' => 'required|string|max:255',
            'bride_name' => 'required|string|max:255',
            'groom_name' => 'required|string|max:255',
            'wedding_date' => 'required|date',
            'venue' => 'required|string|max:255',
            'venue_address' => 'nullable|string',
            'ceremony_details' => 'nullable|string',
            'reception_details' => 'nullable|string',
            'rsvp_deadline' => 'nullable|date|before:wedding_date',
            'special_message' => 'nullable|string',
            'photos' => 'nullable|array',
            'photos.*' => 'string|url',
            'videos' => 'nullable|array',
            'videos.*' => 'string|url',
            'custom_styling' => 'nullable|array',
            'is_published' => 'boolean',
            'rsvp_enabled' => 'boolean',
            'guestbook_enabled' => 'boolean',
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
            'template_id.required' => 'Please select a wedding invitation template.',
            'template_id.exists' => 'The selected template is not available.',
            'title.required' => 'Wedding invitation title is required.',
            'bride_name.required' => 'Bride\'s name is required.',
            'groom_name.required' => 'Groom\'s name is required.',
            'wedding_date.required' => 'Wedding date is required.',
            'venue.required' => 'Wedding venue is required.',
            'rsvp_deadline.before' => 'RSVP deadline must be before the wedding date.',
        ];
    }
}