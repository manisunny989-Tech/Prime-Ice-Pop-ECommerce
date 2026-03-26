'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.orders) {
          setOrders(data.orders);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-white/50 text-sm">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-white/70 text-sm">No recent orders found. Stock up on Prime!</p>;
  }

  return (
    <div className="space-y-4">
      {orders.slice(0, 5).map(order => (
        <div key={order.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bebas text-xl tracking-wider">Order #{order.id.slice(-6)}</span>
            <span className={`text-xs uppercase px-2 py-1 rounded-full ${
              order.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {order.status}
            </span>
          </div>
          <div className="text-white/60 text-sm space-y-1">
            <p>{order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
            <p className="font-semibold text-white">Total: ${order.total.toFixed(2)}</p>
            <p className="text-white/40 text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}