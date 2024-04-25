import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
import { supabase } from "./constants";
import Navbar from "./NavBar";

// const supabase = createClient(
//   "https://jhntnbdxccwkurctzccv.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobnRuYmR4Y2N3a3VyY3R6Y2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2OTE5NTIsImV4cCI6MjAyNzI2Nzk1Mn0.A34WrCmyqjcFvjSeuf4dAoHsfbRYTCIAobGYHS8H0ME"
// );

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
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    // Perform logout actions, such as clearing session storage
    // Example: Redirecting to login page
    return <Navigate to="/login" replace />;
  };

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Run once on component mount

  if (loading) {
    return <div className="content-center">Loading...</div>;
  }
  return (
    <div className="">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 p-8  text-white">Orders</h1>
      <div className="space-y-4 flex  items-center">
        <p className="mx-10 font-semibold">id</p>
        <div className="m-20 font-semibold ">
          {" "}
          <h2 className="text-lg font-semibold">Full Name</h2>
        </div>
        <div className="m-20">
          {" "}
          <p className="text-lg font-semibold">Brand Name</p>{" "}
        </div>
        <div className="m-20 font-semibold">
          <p>Suscription Period</p>{" "}
        </div>
        <div className="m-20 font-semibold">
          <p>Subscription Price</p>
        </div>
      </div>

      <ul>
        {order.map((order) => (
          <li
            key={order.id}
            className=" border-emerald-400 border p-4 m-5 rounded-lg mx-8  text-gray-100 space-y-4 flex justify-between items-center"
          >
            <p>{order.id}</p>
            <div className="w-40">
              {" "}
              <h2 className="text-lg font-semibold">{order.fullname}</h2>
            </div>
            <div className="w-40">
              {" "}
              <p className="text-lg font-semibold">{order.brand_name}</p>{" "}
            </div>
            <div className="w-40">
              <p>{order.subscription_period}</p>{" "}
            </div>
            <div className="w-40">
              <p>{order.subscription_price}</p>
            </div>

            <Link
              to={`/order/${order.id}`}
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
