<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $personal_projects = \App\Models\Projects::where('type','personal')->orderBy('name','ASC')->get()->toArray();

        foreach($personal_projects as $index=>$value){
            $description = json_decode($value['description'],true);
            $personal_projects[$index]['description']['tecnologies'] = sort($description['tecnologies']);
        }

        return $personal_projects;

    }
}
