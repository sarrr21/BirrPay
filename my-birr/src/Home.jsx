import SubscriptionList from "./SubscriptionList"
export default function Home() {
  return (
    <div className=" bg-slate-800 min-h-screen">
    <div className="flex  justify-between p-4">
      <div className=" bg-purple-500 rounded-md p-2 px-40 text-gray-100 font-semibold hover:bg-purple-400">
        <button>
            See Order
        </button>
      </div>
      <div className=" bg-purple-500 rounded-md p-2 px-40 text-gray-100 font-semibold  hover:bg-purple-400">
        Add Subscription
      </div>
      

    </div>
    <SubscriptionList />
    </div>
  )
}
