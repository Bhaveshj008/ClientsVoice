import React from "react";
import ReactDOM from "react-dom/client";
import Header, {Hero} from "./components/Header";
import Testimonials from "./components/Testimonials";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";











const Body=()=>{
    return (<>
        <Header/>
        <Hero/>
        <Testimonials/>
        <Features/>
        <CTA/>
        <Footer/>
    </>);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Body/>)