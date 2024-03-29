import { useParams } from 'react-router-dom';

const OrderDetail = ({ orders }) => {
  const { id } = useParams();
  const order = orders.find(order => order.id === parseInt(id));

  return (
    <div className=" bg-gray-200 min-h-screen p-16">
      <h1 className="text-3xl font-bold mb-4 text-white">Order Detail</h1>
      <div className="border p-4 rounded-lg text-blue-400 text-xl">
        <p><span className="font-semibold ">Name:</span> {order.name}</p>
        <p><span className="font-semibold ">Email:</span> {order.email}</p>
        <p><span className="font-semibold ">Phone Number:</span> {order.phone}</p>
        <p><span className="font-semibold ">Item Name:</span> {order.itemName}</p>
        <p><span className="font-semibold ">Price:</span> {order.price}</p>
        <div className="flex space-x-10 mt-4">
        <p><img src={order.attachedImage} alt="Attached" className='h-40 w-60 bg-gray-400'/></p>
      <p className="bg-gray-400 text-black p-16 "><span className="font-semibold"></span> {order.remark}</p>
      </div>
      <div className='item-center'>
      <button className='bg-blue-400 text-white rounded-md p-2 mt-4'>Subscription Done</button>
      </div>
      </div>
    </div>
  );
};

export default OrderDetail;
