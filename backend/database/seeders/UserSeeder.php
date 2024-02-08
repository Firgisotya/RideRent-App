<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => 1
            ],
            [
                'name' => 'Leader',
                'email' => 'leader@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => 2
            ],
            [
                'name' => 'SPV',
                'email' => 'spv@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => 3
            ],
            [
                'name' => 'Dept Head',
                'email' => 'dhead@gmail.com',
                'password' => bcrypt('password'),
                'role_id' => 4
            ]
        ]);
    }
}
