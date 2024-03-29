import { Link } from 'react-router-dom';
const Home = ({ openModal, openEditModal, deleteItem, items }) => {
  return (
    <div className="min-h-screen  items-center justify-center bg-gray-200">
      <div className="flex justify-between p-4">
      <Link to="/orders">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">See Orders</button>
      </Link>
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Subscription</button>
      </div>
      <ul className="mt-4 p-4">
        {items.map(item => (
          <li key={item.id} className="bg-white shadow-md rounded p-4 m-2">
            <div className="flex justify-between items-center">
              <div className="flex  ">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded mr-4" />
                <div>
                <h1 className="font-bold text-2xl">{item.title}</h1>
                <p className="mt-1">{item.description}</p>
            <p className="mt-1">{item.period}</p>
            <p className="mt-1">{item.price}</p>
            </div>
                </div>
                
              <div className='flex space-x-6 h-10'>
                <img src="./edit.png" alt='edit' onClick={() => openEditModal(item)}  />
                  
                <img src="./delete.png" alt="delete" onClick={() => deleteItem(item.id)}  />
                  
                
                </div>
              </div>
          
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
