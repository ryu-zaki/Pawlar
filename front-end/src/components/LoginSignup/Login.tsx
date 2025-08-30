import React from "react";



interface UserData {
   phoneNumber: string;
   password: string;
}

const LoginForm = () => {
   
   const [message, setMessage] = React.useState<string | null>(null);

   const [dataPassed, setDataPassed] = React.useState<boolean>(false);
   const [_, setUserData] = React.useState<UserData | null>(null);  
   

   React.useEffect(() => {
        
        if (!message) return;

        console.log(message);

   }, [message]);

   React.useEffect(() => { 
      if (!dataPassed) return;

      fetch('http://192.168.0.104:3000/login', {
         method: 'POST',
         headers: {
            "Content-Type": 'application/json',
         },
         body: JSON.stringify({ data: "Hello World" })
      })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err))
      .finally(() => {
         setDataPassed(false);
      })
      
   }, [dataPassed])
   
   const handleFormSubmit= (  e: React.FormEvent<HTMLFormElement>) => { 
      e.preventDefault();
      setDataPassed(true);
   }

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;

      setUserData(prevData => ({ ...prevData, [id]: value} as UserData)); 
   
   }

   return (
      !message ? 
      <form onSubmit={handleFormSubmit} className="w-9/12 mx-auto flex flex-col gap-6">
         <div className="flex items-center label-animation bg-white rounded-full relative">
        
            <input required onChange={handleInputChange} placeholder="" className="border-0 outline-0 w-full py-3 px-4 rounded-full" id="phone-number" type="text" />
            <label htmlFor="phone-number" className="absolute transition-all durationn-1000 left-4 text-primary-dark">Phone Number</label>
         </div>
         
         <div className="flex items-center label-animation bg-white rounded-full relative">
            <input required onChange={handleInputChange} placeholder="" className=" border-0 outline-0 w-full py-3 px-4 rounded-full" id="password" type="password" />
            <label htmlFor="password" className="absolute left-4 transition-all durationn-1000 text-primary-dark">Password</label>
         </div>

         <a href="#" className="text-primary-dark underline text-sm">Forgot Password?</a>
      
         <input className="bg-primary text-white mt-5 py-3 rounded-full text-lg" type="submit" value="submit" />
      </form> : <div><p>{message}</p></div>
   )
}

export default LoginForm;