<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize("view", "products");
        return ProductResource::collection(Product::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize("edit", "products");
        $product = Product::create($request->only("title", "description", "image", "price"));
        return response(new ProductResource($product), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $this->authorize("view", "products");
        return new ProductResource(Product::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $this->authorize("edit", "products");
        $product = Product::find($id);
        $product->update($request->only("title", "description", "image", "price"));
        return response(new ProductResource($product), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->authorize("edit", "products");
        Product::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
