<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orders')->insert([
           [
            'order_id' => 'TRX0001',
            'user_id' => 2,
            'vehicle_id' => 1,
            'employee_name' => 'John Doe',
            'driver_name' => 'Smith',
            'order_date' => '2024-02-01',
            'date_of_return' => '2024-02-02',
            'approval_status' => 'approved',
            'rent_status' => 'returned',
            'information' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.'
           ],
           [
            'order_id' => 'TRX0002',
            'user_id' => 2,
            'vehicle_id' => 2,
            'employee_name' => 'Febi',
            'driver_name' => 'Andri',
            'order_date' => '2024-02-02',
            'date_of_return' => '2024-02-03',
            'approval_status' => 'approved',
            'rent_status' => 'borrowed',
            'information' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.'
           ],
           [
            'order_id' => 'TRX0003',
            'user_id' => 2,
            'vehicle_id' => 3,
            'employee_name' => 'Rizky',
            'driver_name' => 'Rizal',
            'order_date' => '2024-02-03',
            'date_of_return' => null,
            'approval_status' => 'rejected',
            'rent_status' => '-',
            'information' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.'
           ]
        ]);
    }
}
