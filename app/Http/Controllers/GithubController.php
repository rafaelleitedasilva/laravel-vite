<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}