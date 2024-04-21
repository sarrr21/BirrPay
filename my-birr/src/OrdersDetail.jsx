import { useParams } from "react-router-dom";

const OrderDetail = ({ order }) => {
  const { id } = useParams();
  console.log("--------------------");
  console.log(id + "something is not working ");
  const orde = order.find((order) => order.id === parseInt(id));

  if (!orde) {
    return <div>Loading...</div>; // Add loading state while fetching order data
  }

  return (
    <div className="bg-gray-200 min-h-screen p-16">
      <h1 className="text-3xl font-bold mb-4 text-white">Order Detail</h1>
      <div className="border p-4 rounded-lg text-blue-400 text-xl">
        <p>
          <span className="font-semibold">Name:</span> {orde.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {orde.email}
        </p>
        <p>
          <span className="font-semibold">Phone Number:</span> {orde.phone}
        </p>
        <p>
          <span className="font-semibold">Item Name:</span> {orde.itemName}
        </p>
        <p>
          <span className="font-semibold">Price:</span> {orde.price}
        </p>
        <div className="flex space-x-10 mt-4">
          <p>
            <img
              src={order.attachedImage}
              alt="Attached"
              className="h-40 w-60 bg-gray-400"
            />
          </p>
          <p className="bg-gray-400 text-black p-16 ">
            <span className="font-semibold"></span> {order.remark}
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
