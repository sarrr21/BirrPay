import { Link } from 'react-router-dom';

const OrderList = ({ orders }) => {
  return (
    
    <div className= "  bg-gray-200 min-h-screen ">
      <h1 className="text-3xl font-bold mb-4 p-8  text-white">Orders</h1>
      
      <ul>
        {orders.map(order => (
          <li key={order.id} className="border p-4 rounded-lg mx-8 bg-white text-blue-400 space-y-4 flex justify-between items-center">
          
              <h2 className="text-lg font-semibold">{order.name}</h2>
              <p className="text-lg font-semibold">{order.itemName}</p>
              <p>{order.price}</p>
            
            <Link to={`/orders/${order.id}`} className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-blue-100 hover:border-white"  >View</Link>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default OrderList;