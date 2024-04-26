import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
import { supabase } from "./constants";
import Navbar from "./NavBar";

const OrderPage = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    console.log("tshirt alelesh-------------------");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*");

        if (ordersError) {
          throw ordersError;
        }

        const ordersWithUser = await Promise.all(
          ordersData.map(async (order) => {
            // Check if user_id or subscription_id is null
            if (!order.user_id || !order.subscription_id) {
              return {
                ...order,
                email: "Unknown",
                fullname: "Unknown",
                phone: "Unknown",
                logo_link: "Unknown",
                brand_name: "Unknown",
              };
            }

            // Fetch user information for each order
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
    return (
      <div className="bg-[#1d232a] w-screen h-screen flex justify-center items-center text-white">
        Loading
        <span className="p-2"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="bg-[#1d232a] w-full h-fit">
      <Navbar onLogout={handleLogout} />
      <h1 className="text-3xl font-bold mb-4 p-8  text-white">Orders</h1>
      <div className="space-y-4 flex  items-center">
        <p className="mx-10 text-white font-semibold ">id</p>
        <div className="m-20 font-semibold ">
          {" "}
          <h2 className="text-lg text-white  font-semibold">Full Name</h2>
        </div>
        <div className="m-20">
          {" "}
          <p className="text-lg text-white  font-semibold">Brand Name</p>{" "}
        </div>
        <div className="m-20 text-white  font-semibold">
          <p>Suscription Period</p>{" "}
        </div>
        <div className="m-20 text-white  font-semibold">
          <p>Subscription Price</p>
        </div>
      </div>

      <ul>
        {order.map((order) => (
          <li
            key={order.id}
            className=" border-emerald-400 border p-4 m-5 rounded-lg mx-8  text-white space-y-4 flex justify-between items-center"
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
              to={`/orders/${order.id}`}
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

export default OrderPage;
