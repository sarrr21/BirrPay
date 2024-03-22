
export default function NavBar() {
  return (
    <div className="bg-slate-800 justify-between flex text-gray-200 p-4 border border-slate-700">
      <div className="font-semibold text-3xl">
        <h1>BirrPay</h1>
      </div>
      <div className=" bg-purple-500 rounded-md p-3  text-gray-100 font-semibold  hover:bg-purple-400">
        <button>
            Log out
        </button>
      </div>
    </div>
  )
}
