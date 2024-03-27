const Home = ({ openModal, openEditModal, deleteItem, items }) => {
  return (
    <div className="min-h-screen  items-center justify-center bg-gray-200">
      <div className="flex justify-between p-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">See orders</button>
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
                
              <div>
                <button onClick={() => openEditModal(item)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-full mr-2">
                  Edit
                </button>
                <button onClick={() => deleteItem(item.id)} className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-1 px-2 rounded-full">
                  Delete
                </button>
                </div>
              </div>
          
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
