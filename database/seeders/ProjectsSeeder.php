<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Trabalhos Empresariais
        //Fluit
        DB::table('projects')->insertOrIgnore([
            'name' => 'Fluit',
            'corp'=> 'Kasi',
            'description' => json_encode([
                "description" => "Um projeto verdadeiramente desafiador desde a sua concepção até o seu desenvolvimento. Foi realizando a FLuit em que pude testar todas as minhas habilidades como programador indo desde softskills para traduzir em código os pedidos do cliente até na tecnicidade complexa de se desenvolver um sistema com schedules, jobs e inúmeros widgets que utilizam um banco com mais de 2GB de dados.",
                "tecnologies" => ["Laravel", "Lumem", "ApexCharts", "Docker", "MySql", "Github", "Bootstrap"],
                "images" => ["logo"=>"choppup-logo.png", "fluit.jpeg"]
            ]),
            'type' => 'corp',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        
        //Sestagio
        DB::table('projects')->insertOrIgnore([
            'name' => 'Sestagio',
            'corp'=> 'Senai',
            'description' => json_encode([
                "description" => 
                "O Sestágio oferece às empresas uma plataforma centralizada e intuitiva para cadastrar vagas de estágio, proporcionando uma experiência simplificada e eficiente. As organizações podem detalhar os requisitos específicos, as responsabilidades do estagiário e outros critérios relevantes, garantindo uma correspondência mais precisa com os perfis ideais. Os alunos, por sua vez, encontram no Sestágio uma ferramenta robusta para explorar oportunidades de estágio alinhadas aos seus interesses e habilidades, podendo cadastrar seus currículos de forma fácil e rápida, tornando o processo de candidatura mais eficiente.",
                "tecnologies" => ["Laravel", "Vercel", "Docker", "PlanetScale", "Github", "Bootstrap"],
                "images" => ["logo"=>"senai-logo.png", "sestagio.jpeg"]
            ]),
            'type' => 'corp',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        //Intranet Senai
        DB::table('projects')->insertOrIgnore([
            'name' => 'Intranet',
            'corp'=> 'Senai',
            'description' => json_encode([
                "description" => 
                "O SENAI Intranet centraliza a comunicação interna, fornecendo uma plataforma unificada para anúncios, comunicados, notícias institucionais e atualizações importantes. Isso reduz a dispersão de informações e mantém todos os colaboradores informados de maneira consistente.",
                "tecnologies" => ["HTML", "CSS", "Javascript", "Github", "Bootstrap"],
                "images" => ["logo"=>"senai-logo.png", "senai-intranet.png"]
            ]),
            'type' => 'corp',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        //Alumbra
        DB::table('projects')->insertOrIgnore([
            'name' => 'Alumbra',
            'corp'=> 'Alumbra',
            'description' => json_encode([
                "description" => 
                "O código por trás do website Alumbra abraça a filosofia do design responsivo, garantindo que a experiência do usuário seja fluida e agradável em uma variedade de dispositivos. A galeria inspiradora do site destaca projetos que demonstram como os produtos Alumbra têm o poder de transformar espaços residenciais, comerciais e industriais.",
                "tecnologies" => ["Laravel", "Bootstrap", "Sql Server"],
                "images" => ["logo"=>"alumbra-logo.png", "alumbra.jpeg"],
                "link" => "https://www.alumbra.com.br/web/index"
            ]),
            'type' => 'corp',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        //Trabalhos Pessoais
        DB::table('projects')->insertOrIgnore([
            'name' => 'MercadoPrint',
            'description' => json_encode([
                "description" => 
                "A espinha dorsal do Mercado Print é construída sobre a base sólida do Laravel. A arquitetura elegante facilita a manutenção, escalabilidade e implementação de novos recursos. Esta obra é mais do que um e-commerce; é uma sinfonia de tecnologias, personalização e inovação. Personalize sua experiência, mergulhando no código que torna possível o Mercado Print!",
                "construction" => true,
                "tecnologies" => ["Laravel", "Bootstrap", "MySql", "Docker", "Github","Livewire"],
                "images" => ["logo"=>"mercadoprint-logo.svg", "mercadoprint.jpeg"],
                "link" => "https://mercadoprint.com.br/"
            ]),
            'type'=>'personal',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('projects')->insertOrIgnore([
            'name' => 'BlogText',
            'description' => json_encode([
                "description" => 
                "Adentre o BlogText, um projeto de publicação de textos autorais que funde elegância e personalização, tecido com Laravel e a estilização refinada do SCSS, proporcionaremos um ambiente único para a expressão literária.",
                "construction" => true,
                "tecnologies" => ["Laravel", "Scss", "PlanetScale", "Docker", "Github","Livewire"],
                "images" => ["logo"=>"blogtext-logo.png", "blogtext.jpeg"],
                "github" => "https://github.com/rafaelleitedasilva/blogtext",
                "link" => "https://blogtext.vercel.app/"
            ]),
            'type'=>'personal',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('projects')->insertOrIgnore([
            'name' => 'Jotion',
            'description' => json_encode([
                "description" => 
                "Um projeto ambicioso que une TypeScript e React para proporcionar uma experiência de organização e colaboração tão flexível quanto a sua criatividade. Este clone do Notion é uma jornada pelo poder da programação e do design, onde a versatilidade do TypeScript e a agilidade do React se unem para criar uma plataforma de produtividade única.",
                "construction" => true,
                "tecnologies" => ["React", "TypeScript", "Convex", "Docker", "Github","Clerk"],
                "images" => ["logo"=>"jotion-logo.svg", "jotion.png"],
                "github" => "https://github.com/rafaelleitedasilva/jotion",
                "link" => "https://jotion-seven.vercel.app/"
            ]),
            'type'=>'personal',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}