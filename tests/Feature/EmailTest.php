<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use App\Mail\portfolio;
use Illuminate\Support\Facades\Mail;

class EmailTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_email_should_return_400(): void
    {
        Mail::fake();
        Mail::send(new portfolio('teste', 'teste@teste.com', 'teste', 'teste'));
        Mail::assertSent(portfolio::class);
    }
}