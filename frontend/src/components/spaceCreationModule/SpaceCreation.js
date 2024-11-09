import React from "react";
import { FormProvider } from "./utils/FormContext"; // Import the FormProvider
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import MainContainer from "./components/MainContainer";


function SpaceCreation() {
  
  return (
    <FormProvider> {/* Wrap the component tree with FormProvider */}
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <LeftSidebar/>
          <MainContainer  />
          <RightSidebar />
        </div>
      </div>
    </FormProvider>
  );
}

export default SpaceCreation;
