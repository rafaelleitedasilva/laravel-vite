<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $projetos = \App\Models\Projects::orderBy('name','ASC')->get()->toArray();

        foreach($projetos as $index=>$value){
            $description = json_decode($value['description'],true);
            $personal_projects[$index]['description']['tecnologies'] = sort($description['tecnologies']);
            $value['description']=json_decode($value['description'],true);
            if($value['type'] == 'personal'){
                $projetos["pessoal"][$index] = $value;
                unset($projetos[$index]);
            }else{
                $projetos["empresa"][$index] = $value;
                unset($projetos[$index]);
            }
        }


        return view('index')->with("projetos",$projetos);
    }
}