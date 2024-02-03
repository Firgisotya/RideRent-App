<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vehicles')->insert([
            [
                'category' => 'SUV',
                'type' => 'Automatic',
                'name' => 'Toyota Fortuner',
                'police_number' => 'B 1234 ABC',
                'color' => 'Black',
                'year' => '2022',
                'stock' => 1,
            ],
            [
                'category' => 'Sedan',
                'type' => 'Automatic',
                'name' => 'Honda City',
                'police_number' => 'B 5678 DEF',
                'color' => 'White',
                'year' => '2022',
                'stock' => 1,
            ],
            [
                'category' => 'Truck',
                'type' => 'Manual',
                'name' => 'Isuzu Elf',
                'police_number' => 'B 9101 GHI',
                'color' => 'Red',
                'year' => '2022',
                'stock' => 1,
            ],
            [
                'category' => 'Van',
                'type' => 'Automatic',
                'name' => 'Toyota Hiace',
                'police_number' => 'B 1121 JKL',
                'color' => 'Silver',
                'year' => '2022',
                'stock' => 1,
            ],
            [
                'category' => 'Motorcycle',
                'type' => 'Manual',
                'name' => 'Honda Beat',
                'police_number' => 'B 3141 MNO',
                'color' => 'Blue',
                'year' => '2022',
                'stock' => 1,
            ]
        ]);
    }
}
