<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class portfolio extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $emailMessage;
    public $name;
    public $context;
    /**
     * Create a new message instance.
     */
    public function __construct($name, $email, $message, $context)
    {
        $this->name = $name;
        $this->email = $email;
        $this->emailMessage = $message;
        $this->context = $context;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Contato - Rafael Leite da Silva: '.$this->context,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.portfolio',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
