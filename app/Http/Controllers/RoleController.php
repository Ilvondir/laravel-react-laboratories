<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Role::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $role = Role::create($request->only("name"));
        return response($role, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return Role::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $role = Role::find($id);
        $role->update($request->only("name"));
        return response($role, Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        Role::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
