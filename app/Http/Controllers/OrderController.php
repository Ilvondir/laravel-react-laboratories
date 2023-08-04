<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

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

    public function export()
    {
        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=orders.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0",
        ];

        $callback = function () {
            $orders = Order::all();

            $file = fopen("php://output", "w");
            fputcsv($file, ["ID", "Name", "Email", "Product Title", "Price", "Quantity"]);

            foreach ($orders as $o) {
                fputcsv($file, [$o->id, $o->name, $o->email, "", "", ""]);

                foreach ($o->orderItems as $oi) {
                    fputcsv($file, ["", "", "", $oi->product_title, $oi->price, $oi->quantity]);
                }
            }

            fclose($file);
        };

        return Response::stream($callback, 200, $headers);
    }
}
