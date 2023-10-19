<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GithubLanguage extends Model
{
    use HasFactory;
    protected $fillable = [
        "language",
        "lines",
        "repository"
    ];
}