import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jhntnbdxccwkurctzccv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRuYmR4Y2N3a3VyY3R6Y2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2OTE5NTIsImV4cCI6MjAyNzI2Nzk1Mn0.A34WrCmyqjcFvjSeuf4dAoHsfbRYTCIAobGYHS8H0ME"
);

const OrderList = () => {
  // const [orders, setOrders] = useState([]);
  // useEffect(() => {
  //   getOrders();
  // }, []);
  // useEffect(() => {
  //   getOrders();
  // }, []);
  // async function getOrders() {
  //   const { data } = await supabase.from("orders").select();

  //   setOrders(data);
  // }

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*");

        if (ordersError) {
          throw ordersError;
        }

        // Fetch user information for each order
        const ordersWithUser = await Promise.all(
          ordersData.map(async (order) => {
            const { data: userData, error: userError } = await supabase
              .from("users")

              .select("fullname, phone, email")
              .eq("id", order.user_id)
              .single();

            if (userError) {
              throw userError;
            }

            const { data: subscriptionData, error: subscriptionError } =
              await supabase
                .from("subscriptions")
                .select("brand_name, logo_link")
                .eq("id", order.subscription_id)
                .single();

            if (subscriptionError) {
              throw subscriptionError;
            }

            return {
              ...order,
              email: userData ? userData.email : "Unknown",
              fullname: userData ? userData.fullname : "Unknown",
              phone: userData ? userData.phone : "Unknown",
              logo_link: subscriptionData
                ? subscriptionData.logo_link
                : "Unknown",
              brand_name: subscriptionData
                ? subscriptionData.brand_name
                : "Unknown",
            };
          })
        );

        setOrder(ordersWithUser);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []); // Run once on component mount

  return (
    <div className="  bg-gray-200 min-h-screen ">
      <h1 className="text-3xl font-bold mb-4 p-8  text-blue-950">Orders</h1>

      <ul>
        {order.map((order) => (
          <li
            key={order.id}
            className="border p-4 rounded-lg mx-8 bg-white text-blue-400 space-y-4 flex justify-between items-center"
          >
            <h2 className="text-lg font-semibold">{order.fullname}</h2>
            <p className="text-lg font-semibold">{order.brand_name}</p>
            <p>{order.subscription_period}</p>
            <p>{order.subscription_price}</p>

            <Link
              to={{
                pathname: `/order/${order.id}`, // Navigate to order detail page
                state: { order: order }, // Pass order data as state
              }}
              className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-blue-100 hover:border-white"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
