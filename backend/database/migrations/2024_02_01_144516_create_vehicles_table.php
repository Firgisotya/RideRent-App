<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['SUV', 'Sedan', 'Truck', 'Van', 'Motorcycle'])->default('Sedan');
            $table->enum('type', ['Automatic', 'Manual'])->default('Manual');
            $table->string('name');
            $table->string('police_number');
            $table->string('color');
            $table->string('year');
            $table->string('price');
            $table->integer('stock')->default(1);
            $table->string('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
}
