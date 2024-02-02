<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApprovalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('approvals')->insert([
            [
                'user_id' => 2,
                'order_id' => 'TRX0001',
                'approval_date' => '2024-02-01',
                'status' => 'approved',
                'level' => '1'
            ],
            [
                'user_id' => 2,
                'order_id' => 'TRX0001',
                'approval_date' => '2024-02-01',
                'status' => 'approved',
                'level' => '2'
            ],
            [
                'user_id' => 2,
                'order_id' => 'TRX0002',
                'approval_date' => '2024-02-02',
                'status' => 'approved',
                'level' => '1'
            ],
            [
                'user_id' => 2,
                'order_id' => 'TRX0002',
                'approval_date' => '2024-02-02',
                'status' => 'approved',
                'level' => '2'
            ],
            [
                'user_id' => 2,
                'order_id' => 'TRX0003',
                'approval_date' => '2024-02-03',
                'status' => 'rejected',
                'level' => '1'
            ],
            [
                'user_id' => 2,
                'order_id' => 'TRX0003',
                'approval_date' => '2024-02-03',
                'status' => 'rejected',
                'level' => '2'
            ],
        ]);
    }
}
