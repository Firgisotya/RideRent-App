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
                'price' => '500000000',
                'stock' => 1,
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            ],
            [
                'category' => 'Sedan',
                'type' => 'Automatic',
                'name' => 'Honda City',
                'police_number' => 'B 5678 DEF',
                'color' => 'White',
                'year' => '2022',
                'price' => '300000000',
                'stock' => 1,
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            ],
            [
                'category' => 'Truck',
                'type' => 'Manual',
                'name' => 'Isuzu Elf',
                'police_number' => 'B 9101 GHI',
                'color' => 'Red',
                'year' => '2022',
                'price' => '400000000',
                'stock' => 1,
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            ],
            [
                'category' => 'Van',
                'type' => 'Automatic',
                'name' => 'Toyota Hiace',
                'police_number' => 'B 1121 JKL',
                'color' => 'Silver',
                'year' => '2022',
                'price' => '600000000',
                'stock' => 1,
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            ],
            [
                'category' => 'Motorcycle',
                'type' => 'Manual',
                'name' => 'Honda Beat',
                'police_number' => 'B 3141 MNO',
                'color' => 'Blue',
                'year' => '2022',
                'price' => '20000000',
                'stock' => 1,
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            ]
        ]);
    }
}
