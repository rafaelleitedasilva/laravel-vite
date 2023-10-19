<?php

namespace App\Jobs;

use App\Models\GithubLanguage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchGitHubData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public $url;
    public $repo_name;
    public function __construct($url, $repo_name)
    {
        $this->url = $url;
        $this->repo_name = $repo_name;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $languages = Http::get($this->url)->json();
            foreach ($languages as $language => $lines) {
                GithubLanguage::updateOrCreate(
                    [
                        'language' => $language,
                        'repository' => $this->repo_name
                    ],
                    [
                        'lines' => $lines,
                    ]
                );
            }
        } catch (\Exception $e) {
            // Lide com erros, se necessário
            Log::error('Erro ao processar o repositório ' . $this->repo_name . ': ' . $e->getMessage());
        }
    }
}