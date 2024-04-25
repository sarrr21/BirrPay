import { useParams, Navigate } from "react-router-dom";
import { supabase } from "./constants";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./NavBar";

const OrderDetail = () => {
  const handleLogout = () => {
    return <Navigate to="/login" replace />;
  };
  const { id } = useParams();
  console.log("--------------------");
  console.log(id + "         something is not working ");

  const [order, setOrder] = useState(null); // State to hold the order data

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch order details using the provided order ID
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .single();

        if (orderError) {
          throw orderError;
        }

        // Fetch user information for the order
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("fullname, phone, email")
          .eq("id", orderData.user_id)
          .single();

        if (userError) {
          throw userError;
        }

        // Fetch subscription information for the order
        const { data: subscriptionData, error: subscriptionError } =
          await supabase
            .from("subscriptions")
            .select("brand_name, logo_link")
            .eq("id", orderData.subscription_id)
            .single();

        if (subscriptionError) {
          throw subscriptionError;
        }

        // Combine order data with user and subscription information
        const orderWithDetails = {
          ...orderData,
          email: userData ? userData.email : "Unknown",
          fullname: userData ? userData.fullname : "Unknown",
          phone: userData ? userData.phone : "Unknown",
          logo_link: subscriptionData ? subscriptionData.logo_link : "Unknown",
          brand_name: subscriptionData
            ? subscriptionData.brand_name
            : "Unknown",
        };

        setOrder(orderWithDetails);
      } catch (error) {
        console.error("Error fetching order details:", error.message);
      }
    };

    fetchOrderDetails();
  }, [id]);

  console.log(order);

  return (
    <>
      <Navbar />
      <div className="p-16">
        <h1 className="text-3xl font-bold mb-4 text-white">Order Detail</h1>
        <div className="border border-emerald-400 p-4 rounded-lg text-blue-400 text-xl ">
          <p>
            <span className="font-semibold font-mono text-cyan-50">Name:</span>{" "}
            {order?.fullname}
          </p>
          <p>
            <span className="font-semibold font-mono text-cyan-50">Email:</span>{" "}
            {order?.email}
          </p>
          <p>
            <span className="font-semibold font-mono text-cyan-50">
              Phone Number:
            </span>{" "}
            {order?.phone}
          </p>
          <p>
            <span className="font-semibold font-mono text-cyan-50">
              Item Name:
            </span>{" "}
            {order?.brand_name}
          </p>
          <p>
            <span className="font-semibold font-mono text-cyan-50">Price:</span>{" "}
            {order?.subscription_price}
          </p>
          <p>
            <span className="font-semibold text-cyan-50">
              Subscription Period:
            </span>{" "}
            {order?.subscription_period}
          </p>

          <p>
            <span className="font-semibold text-cyan-50">
              SUBSCRIPTION EMAIL:
            </span>{" "}
            {order?.subscription_email}
          </p>
          <div className="flex space-x-10 mt-4">
            <p>
              <div className="">
                <img
                  src={order?.receipt_link}
                  alt="Attached"
                  className="w-72 h-90 bg-gray-400"
                />
              </div>
            </p>
            <div className="border rounded-md p-5 bg-sky-200 w-96 h-90">
              <p className=" text-black  ">
                <span className="font-semibold"></span>
                {order?.remarks}
              </p>
            </div>
          </div>
          <div className="item-center">
            <button className="bg-emerald-400 text-black rounded-md p-2 mt-4">
              Subscription Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
