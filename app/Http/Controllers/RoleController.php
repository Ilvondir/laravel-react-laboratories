<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
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
        return RoleResource::collection(Role::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $role = Role::create($request->only("name"));
        $role->permissions()->attach($request->input("permissions"));
        return response(new RoleResource($role->load("permissions")), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return new RoleResource(Role::with("permissions")->find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $role = Role::find($id);
        $role->update($request->only("name"));
        $role->permissions()->sync($request->input("permissions"));
        return response(new RoleResource($role->load("permissions")), Response::HTTP_ACCEPTED);
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
