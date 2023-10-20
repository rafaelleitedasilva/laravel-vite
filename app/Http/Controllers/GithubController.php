<?php

namespace App\Http\Controllers;

use App\Jobs\FetchGitHubData;
use App\Models\GithubLanguage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class GithubController extends Controller
{
    public function user(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json(array('error' => "Bad Request"), 400);
        }

        try {
            $url = 'https://api.github.com/users/' . $request->user;
            $response = Http::get($url)->json();
            return response()->json(['response' => $response], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => "Internal Error"], 500);
        }
    }

    public function repos($user)
    {
        try {
            $url = 'https://api.github.com/users/' . $user . '/repos';
            $response = Http::get($url)->json();
            return response(json_encode($response), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => "Internal Error"], 500);
        }
    }

    public function repo($user, $repo)
    {
        try {
            $url = 'https://api.github.com/repos/' . $user . '/' . $repo;
            $response = Http::get($url)->json();
            return response()->json(['response' => $response], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => "Internal Error"], 500);
        }
    }

    public function deployments($user, $repo)
    {
        try {
            $url = 'https://api.github.com/repos/' . $user . '/' . $repo . '/deployments';
            $response = Http::get($url)->json();
            return response()->json(['response' => $response], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => "Internal Error"], 500);
        }
    }

    public function languages($user)
    {
        $repos = json_decode($this->repos($user)->getContent(), true);

        foreach ($repos as $repo) {
            $repo_name = $repo['name'];
            $url = 'https://api.github.com/repos/' . $user . '/' . $repo_name . '/languages';
            $job = new FetchGitHubData($url, $repo_name);
            dispatch($job);
        }

        $languages = DB::table('github_languages')
            ->select('language')
            ->groupBy('language')
            ->get()
            ->pluck('language')
            ->toArray();

        foreach ($languages as $index => $language) {
            if ($language == 'Dockerfile') {
                $languages[$index] = 'Docker';
            } elseif ($language == 'Procfile') {
                $languages[$index] = 'Heroku';
            }

            if ($language == 'Blade') {
                unset($languages[$index]);
            }
        }


        return view('api.user.languages')->with('languages', $languages);
    }
}