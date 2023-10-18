<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class GithubTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_github_service_is_up(): void
    {
        $responses[] = Http::get('https://api.github.com/users/rafaelleitedasilva');
        $responses[] = Http::get('https://api.github.com/repos/rafaelleitedasilva/laravel-vite');
        $responses[] = Http::get('https://api.github.com/repos/rafaelleitedasilva/laravel-vite/deployments');

        foreach ($responses as $response) {
            $this->assertEquals($response->status(), 200);
        }

    }
}