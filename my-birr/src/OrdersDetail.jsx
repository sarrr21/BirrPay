import { useParams } from "react-router-dom";
import { supabase } from "./constants";
import { useState } from "react";
import { useEffect } from "react";

const OrderDetail = () => {
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
    <div className="bg-gray-200 min-h-screen p-16">
      <h1 className="text-3xl font-bold mb-4 text-white">Order Detail</h1>
      <div className="border p-4 rounded-lg text-blue-400 text-xl">
        <p>
          <span className="font-semibold">Name:</span> {order?.fullname}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {order?.email}
        </p>
        <p>
          <span className="font-semibold">Phone Number:</span> {order?.phone}
        </p>
        <p>
          <span className="font-semibold">Item Name:</span> {order?.brand_name}
        </p>
        <p>
          <span className="font-semibold">Price:</span>{" "}
          {order?.subscription_price}
        </p>
        <p>
          <span className="font-semibold">Subscription Period:</span>{" "}
          {order?.subscription_period}
        </p>

        <p>
          <span className="font-semibold">SUBSCRIPTION EMAIL:</span>{" "}
          {order?.subscription_email}
        </p>
        <div className="flex space-x-10 mt-4">
          <p>
            <img
              src={order?.receipt_link}
              alt="Attached"
              className="h-120 w-160 bg-gray-400"
            />
          </p>
          <p className="bg-gray-400 text-black p-16 ">
            <span className="font-semibold"></span>
            {order?.remarks}
          </p>
        </div>
        <div className="item-center">
          <button className="bg-blue-400 text-white rounded-md p-2 mt-4">
            Subscription Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
