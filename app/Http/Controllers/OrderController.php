<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return OrderResource::collection(Order::with("orderItems")->paginate());
    }

    public function show(int $id)
    {
        return new OrderResource(Order::with("orderItems")->find($id));
    }
}
