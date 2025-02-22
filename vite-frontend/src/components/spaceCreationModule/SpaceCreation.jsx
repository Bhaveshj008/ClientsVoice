import React , {useEffect} from "react";
import { FormProvider } from "./utils/FormContext"; // Import the FormProvider
<<<<<<< HEAD
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import MainContainer from "./components/MainContainer";
import '../../App.css'
import CheckToken from '../CheckToken';
=======
import Header from "../Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import MainContainer from "./components/MainContainer";
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225


function SpaceCreation({mode, initialData}) {
  const token = localStorage.getItem('token');
  
<<<<<<< HEAD

  
  return (
    <FormProvider> 
      <CheckToken/>
      <div className="h-screen flex flex-col">
=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
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
