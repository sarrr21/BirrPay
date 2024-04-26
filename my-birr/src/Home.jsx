import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./constants";
import Navbar from "./NavBar";
const HomePage = ({ openModal, openEditModal, deleteItem }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("*");

        if (error) {
          throw error;
        }

        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="content-center">Loading...</div>;
  }

  if (!items) {
    return <div>Order not found</div>;
  }
  return (
    <div>
      <Navbar />
      <div className="flex justify-between p-4 ">
        <Link to="/orders">
          <button className="mx-16 btn btn-outline btn-accent font-bold py-2 px-4 rounded">
            See Orders
          </button>
        </Link>
        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="mx-16 btn btn-outline btn-accent font-bold py-2 px-4 rounded"
        >
          Add Subscription
        </button>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Subscription</h3>

          <div className="">
            <form method="dialog">
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered input-success w-full max-w-xs my-4"
              />
              <input
                type="text"
                placeholder="Brand Name"
                className="input input-bordered input-success w-full max-w-xs my-4"
              />
              <textarea
                className="textarea textarea-accent my-4"
                placeholder="Bio"
              ></textarea>
              {/* if there is a button in form, it will close the modal */}
              <div className="flex gap-36 items-center text-white">
                <button className="btn text-white px-8 bg-indigo-500 mx-10 items-center">
                  Add
                </button>
                <button className="btn text-white px-8 bg-indigo-500 items-center">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <ul className="mt-4 p-4">
        {items.map((item) => (
          <li key={item.id} className=" rounded p-4 m-2">
            <div className="rounded-lg border-2 border-emerald-600 flex justify-between items-center ">
              <div className="flex  ">
                <img
                  src={item.logo_link}
                  alt={item.brand_name}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <h1 className="font-bold text-2xl">{item.brand_name}</h1>
                  <div className="container w-96 ">
                    <p className="mt-1">{item.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-6 h-10">
                <img
                  src="https://img.icons8.com/carbon-copy/100/create-new.png"
                  alt="edit"
                  style={{ filter: "brightness(0) invert(1)" }}
                  onClick={() => openEditModal(item)}
                />

                <img
                  src="https://img.icons8.com/ios/100/delete-trash.png"
                  alt="delete"
                  style={{ filter: "brightness(0) invert(1)" }}
                  onClick={() => deleteItem(item.id)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
