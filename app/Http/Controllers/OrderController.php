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
        $this->authorize("view", "orders");
        return OrderResource::collection(Order::with("orderItems")->paginate());
    }

    public function show(int $id)
    {
        $this->authorize("view", "orders");
        return new OrderResource(Order::with("orderItems")->find($id));
    }

    public function export()
    {
        $this->authorize("view", "orders");

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

    public function chart()
    {
        $this->authorize("view", "orders");

        //SELECT DATE_FORMAT( orders.created_at, '%Y-%m-%d' ) AS date, SUM( order_items.price * order_items.quantity ) AS sum
        //FROM orders
        //INNER JOIN order_items
        //ON orders.id = order_items.order_id
        //GROUP BY orders.created_at;

        return Order::query()
            ->join("order_items", "orders.id", "=", "order_items.order_id")
            ->selectRaw("DATE_FORMAT( orders.created_at, '%Y-%m-%d' ) AS date, SUM( order_items.price * order_items.quantity ) AS sum")
            ->groupBy("orders.created_at")
            ->get();
    }
}
