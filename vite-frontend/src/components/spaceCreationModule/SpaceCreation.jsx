import React , {useEffect} from "react";
import { FormProvider } from "./utils/FormContext"; // Import the FormProvider
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import MainContainer from "./components/MainContainer";
import '../../App.css'
import CheckToken from '../CheckToken';


function SpaceCreation({mode, initialData}) {
  const token = localStorage.getItem('token');
  

  
  return (
    <FormProvider> 
      <CheckToken/>
      <div className="h-screen flex flex-col">
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
