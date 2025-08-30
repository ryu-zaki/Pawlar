

const NoInternet = () => {

  return (
    <div className="w-full px-4 h-screen flex text-center flex-col justify-center items-center gap-2">
      <img src='assets/no-wifi.png' alt="" />
      <h1 className={"text-2xl font-bold text-primary-dark"}>No Internet Connection</h1>
      <p className="text-base">Something went wrong. Try refreshing the page or checking your internet connection.<br /> We`ll se you in a moment!</p>
      <button className="bg-primary text-white px-6 py-3 rounded-full mt-5">Try Again</button>
    </div>
  ) 
}


export default NoInternet;