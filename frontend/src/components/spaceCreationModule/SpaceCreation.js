import React , {useEffect} from "react";
import { FormProvider } from "./utils/FormContext"; // Import the FormProvider
import Header from "../Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import MainContainer from "./components/MainContainer";


function SpaceCreation({mode, initialData}) {
  const token = localStorage.getItem('token');
  
  // Handle token validation and redirect if needed
  useEffect(() => {
    if (!token) {
      console.warn('No token found, redirecting to login.');
      localStorage.removeItem('token');
      window.location.href = '/';
      return; 
    }
  }, [token]);
  
  return (
    <FormProvider> {/* Wrap the component tree with FormProvider */}
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <LeftSidebar/>
          <MainContainer  />
          <RightSidebar mode={mode} initialData={initialData}/>
        </div>
      </div>
    </FormProvider>
  );
}

export default SpaceCreation;
