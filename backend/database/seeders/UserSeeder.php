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
                'password' => bcrypt('admin123'),
                'role_id' => 1
            ],
            [
                'name' => 'User',
                'email' => 'user@gmail.com',
                'password' => bcrypt('user123'),
                'role_id' => 2
            ]
        ]);
    }
}
