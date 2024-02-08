<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VehicleRequest;
use App\Models\vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $vehicle = vehicle::orderBy('id', 'asc')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Vehicle berhasil ditampilkan',
                'data' => $vehicle
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(VehicleRequest $request)
    {
        try {
            $vehicle = vehicle::create([
                'category' => $request->category,
                'type' => $request->type,
                'name' => $request->name,
                'police_number' => $request->police_number,
                'color' => $request->color,
                'year' => $request->year,
                'stock' => $request->stock
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Vehicle berhasil ditambahkan',
                'data' => $vehicle
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $vehicle = vehicle::where('id', $id)->first();
            return response()->json([
                'status' => 'success',
                'message' => 'Vehicle berhasil ditampilkan',
                'data' => $vehicle
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit(vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(VehicleRequest $request, $id)
    {
        try {
            $vehicle = vehicle::where('id', $id)->update([
                'category' => $request->category,
                'type' => $request->type,
                'name' => $request->name,
                'police_number' => $request->police_number,
                'color' => $request->color,
                'year' => $request->year,
                'stock' => $request->stock
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Vehicle berhasil diupdate',
                'data' => $vehicle
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $vehicle = vehicle::where('id', $id)->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Vehicle berhasil dihapus',
                'data' => $vehicle
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }
}
