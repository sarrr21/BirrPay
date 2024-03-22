const items2 = [
    {   
        photoName:"./netflix.png",
        title:"Netflix",
        description:"Netflix for Ethoppia",
        period:"Quartail",
        price:"1000 ETB",
        id:"1231",
    },
    {   
        photoName:"./spotify.png",
        title:"Spotify",
        description:"Spotify for Ethoppia",
        period:"year",
        price:"2000 ETB",
        id:"1232",
    },
    {   
        photoName:"./netflix.png",
        title:"Netflix",
        description:"Netflix for Ethoppia",
        period:"Quartail",
        price:"1000 ETB",
        id:"1233",
    },
    
];

function SubscriptionList(){
    return (
        
        <ul className="mx-60 p-8 border bg-gray-400 border-slate-700">
          {items2.map((item) => (
            <li key={item.id} className="flex justify-between space-y-10 border border-gray-400 hover:bg-slate-300 p-2">
                <div className="flex space-x-4">
                <div className="flex space-x-3">
             <img src={item.photoName} alt="photo" className="h-10" />
             <h1 className="font-semibold text-2xl">{item.title}</h1>
             </div>
             <div > 
             <h3>{item.description}</h3> 
             <h3>{item.period}</h3> 
             <p>{item.price}</p> 
             </div>
             </div>
             <div className="flex space-x-3">
             <img  className=" bg-purple-500 hover:bg-purple-400 rounded-md p-4" src="./edit.png" alt="edit" />
            <img  className=" bg-purple-500 hover:bg-purple-400 rounded-md p-4" src="./delete.png" alt="delete" />
            </div>
            </li>
          ))}
          
       </ul>
    );
  }
  
  export default SubscriptionList;
