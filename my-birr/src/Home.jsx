import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./constants";
import Navbar from "./NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [brandName, setBrandName] = useState("");
  const [bio, setBio] = useState("");
  const [subscriptionId, setSubscriptionId] = useState(null);

  const [isViewPricesModalOpen, setIsViewPricesModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [period, setPeriod] = useState("");
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const fetchPrices = async (subscriptionId) => {
    const { data, error } = await supabase
      .from("subscription_prices")
      .select("*")
      .eq("subscription_id", subscriptionId);

    if (error) {
      console.error("Error fetching prices:", error);
    } else {
      setPrices(data);
    }
  };

  const handleOpenModal = (subscriptionId) => {
    setSubscriptionId(subscriptionId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubscriptionId(null);
    setPeriod("");
    setPrice("");
  };

  const handleAddPrice = async () => {
    if (!subscriptionId) {
      console.error("Subscription ID is required.");
      return;
    }

    const { data, error } = await supabase
      .from("subscription_prices")
      .insert([{ subscription_id: subscriptionId, period, price }]);

    if (error) {
      console.error("Error adding data:", error);
    } else {
      console.log("Data added successfully:", data);
    }

    handleCloseModal();
  };

  const handleOpenViewPricesModal = async (subscriptionId) => {
    setSelectedSubscription(subscriptionId);
    setIsViewPricesModalOpen(true);
    await fetchPrices(subscriptionId);
  };

  const handleCloseViewPricesModal = () => {
    setIsViewPricesModalOpen(false);
    setPrices([]);
    setSelectedSubscription(null);
  };

  const handleUpdatePrice = async (priceId, newData) => {
    const { data, error } = await supabase
      .from("subscription_prices")
      .update(newData)
      .eq("id", priceId);

    if (error) {
      console.error("Error updating price:", error);
    } else {
      console.log("Price updated successfully:", data);
      fetchPrices(selectedSubscription); // Refresh prices after updating
    }
  };
  const toggleEditMode = (id) => {
    setPrices((prevPrices) =>
      prevPrices.map((price) =>
        price.id === id
          ? { ...price, isEditing: !price.isEditing }
          : { ...price, isEditing: false }
      )
    );
  };

  const savePrice = async (id, updatedPrice) => {
    await handleUpdatePrice(id, updatedPrice);
    toggleEditMode(id); // Exit edit mode after saving
  };

  const handleDeletePrice = async (priceId) => {
    const { error } = await supabase
      .from("subscription_prices")
      .delete()
      .eq("id", priceId);

    if (error) {
      console.error("Error deleting price:", error);
    } else {
      console.log("Price deleted successfully.");
      fetchPrices(selectedSubscription); // Refresh prices after deleting
    }
  };

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

  const openEditModal = (item) => {
    setEditingItem(item);
    document.getElementById("my_edit_modal").showModal();
  };

  const closeEditModal = () => {
    setEditingItem(null);
    document.getElementById("my_edit_modal").close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingItem) {
        // Update data in the "subscriptions" table
        const { data, error } = await supabase
          .from("subscriptions")
          .update({
            logo_link: imageUrl,
            brand_name: brandName,
            description: bio,
          })
          .eq("id", editingItem.id);

        if (error) {
          throw error;
        }

        console.log("Data updated successfully:", data);

        // Close the edit modal
        closeEditModal();

        // Show success toast message
        toast.success("Data updated successfully");
      } else {
        // Insert data into the "subscriptions" table
        const { data, error } = await supabase
          .from("subscriptions")
          .insert([
            { logo_link: imageUrl, brand_name: brandName, description: bio },
          ]);

        if (error) {
          throw error;
        }

        console.log("Data inserted successfully:", data);

        // Close the add modal
        closeAddModal();

        // Show success toast message
        toast.success("Data registered successfully");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error processing request");
    }
  };

  const handleDeleteItem = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("subscriptions")
          .delete()
          .eq("id", itemId);
        if (error) {
          throw error;
        }
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        toast.success("Item deleted successfully");
      } catch (error) {
        console.error("Error deleting item:", error.message);
        toast.error("Error deleting item");
      }
    }
  };

  const closeAddModal = () => {
    document.getElementById("my_add_modal").close();
  };

  if (loading) {
    return (
      <div className="bg-[#1d232a] w-screen h-screen flex justify-center items-center text-white">
        Loading
        <span className="p-2"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (!items) {
    return <div>Oppss!.....</div>;
  }
  return (
    <div>
      <Navbar />

      {isModalOpen && (
        <dialog
          id="add_price_modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-90 flex items-center justify-center"
        >
          <div className="modal-dialog bg-black rounded-lg shadow-lg w-96">
            <div className="modal-content p-4">
              <h2 className="text-xl mb-4">Add Price</h2>
              <div className="mb-4">
                <label className="block text-white">Period</label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter period..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-white">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter price..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPrice}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {isViewPricesModalOpen && (
        <dialog
          id="view_prices_modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-85 flex items-center justify-center "
        >
          <div className="modal-dialog bg-black bg-opacity-50  rounded-lg shadow-lg w-auto">
            <div className="modal-content p-4">
              <h2 className="text-xl mb-4">
                Prices for Subscription {selectedSubscription}
              </h2>
              <ul>
                {prices.map((price) => (
                  <li
                    key={price.id}
                    className="flex justify-between items-center border-b border-gray-300 py-2"
                  >
                    <div className="px-5">
                      {/* Display period and price as text or input based on edit mode */}
                      {price.isEditing ? (
                        <>
                          <input
                            type="text"
                            value={price.period}
                            onChange={(e) => {
                              const newPeriod = e.target.value;
                              setPrices((prevPrices) =>
                                prevPrices.map((prevPrice) =>
                                  prevPrice.id === price.id
                                    ? { ...prevPrice, period: newPeriod }
                                    : prevPrice
                                )
                              );
                            }}
                            className="border rounded px-2 py-1 mr-2"
                          />
                          <input
                            type="number"
                            value={price.price}
                            onChange={(e) => {
                              const newPrice = e.target.value;
                              setPrices((prevPrices) =>
                                prevPrices.map((prevPrice) =>
                                  prevPrice.id === price.id
                                    ? { ...prevPrice, price: newPrice }
                                    : prevPrice
                                )
                              );
                            }}
                            className="border rounded px-2 py-1"
                          />
                        </>
                      ) : (
                        <>
                          <p className="font-semibold">
                            Period: {price.period}
                          </p>
                          <p className="font-semibold">Price: {price.price}</p>
                        </>
                      )}
                    </div>
                    <div>
                      {/* Edit and Delete buttons */}
                      {price.isEditing ? (
                        <button
                          onClick={() =>
                            savePrice(price.id, {
                              period: price.period,
                              price: price.price,
                            })
                          }
                          className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleEditMode(price.id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeletePrice(price.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCloseViewPricesModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}

      <div className="flex justify-between p-4 ">
        <Link to="/orders">
          <button className="mx-16 btn btn-outline btn-accent font-bold py-2 px-4 rounded">
            See Orders
          </button>
        </Link>
        <button
          onClick={() => document.getElementById("my_add_modal").showModal()}
          className="mx-16 btn btn-outline btn-accent font-bold py-2 px-4 rounded"
        >
          Add Subscription
        </button>
      </div>

      <ToastContainer />
      <dialog id="my_add_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Subscription</h3>
          <div className="text-white">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered input-success w-full max-w-xs my-4"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="Brand Name"
                className="input input-bordered input-success w-full max-w-xs my-4"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
              <textarea
                className="textarea textarea-accent my-4"
                placeholder="Descritption"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              {/* if there is a button in form, it will submit the form */}
              <div className="flex gap-36 items-center text-white">
                <button
                  type="submit"
                  className="btn text-white px-8 bg-indigo-500 mx-10 items-center"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn text-white px-8 bg-indigo-500 items-center"
                  onClick={closeAddModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_edit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Subscription</h3>
          <div className="text-white">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered input-success w-full max-w-xs my-4"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="Brand Name"
                className="input input-bordered input-success w-full max-w-xs my-4"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
              <textarea
                className="textarea textarea-accent my-4"
                placeholder="Descritption"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <div className="flex gap-36 items-center text-white">
                <button
                  type="submit"
                  className="btn text-white px-8 bg-indigo-500 mx-10 items-center"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn text-white px-8 bg-indigo-500 items-center"
                  onClick={closeEditModal}
                >
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
            <div className="rounded-lg border-2 text-white border-emerald-600 flex justify-between items-center ">
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
                  onClick={() => handleDeleteItem(item.id)}
                />
                <button
                  class="px-10 btn btn-outline btn-accent"
                  onClick={() => handleOpenModal(item.id)}
                >
                  Add Price
                </button>

                <button
                  className="px-10 btn btn-outline btn-accent"
                  onClick={() => handleOpenViewPricesModal(item.id)}
                >
                  View Prices
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
