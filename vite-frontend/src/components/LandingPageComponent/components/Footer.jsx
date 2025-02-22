import React from 'react';
<<<<<<< HEAD
const Footer = () => {
    return (
        <footer className=" py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className=" flex items-center justify-center">
                                <img src='/logo.jpg' alt='LOGO' className="w-7 h-7 rounded-md" />
                            </div>
                            <span className="text-xl font-bold">
                                Clients<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Voice</span>
                            </span>
                        </div>
                        <p className="text-gray-400">Transform customer feedback into powerful testimonials that drive growth.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#features" className="hover:text-blue-500 transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-blue-500 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">GDPR</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 ClientsVoice. All rights reserved.</p>
                </div>
            </div>
        </footer>
=======
const Footer =()=>{
    return (
        <footer>
        <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
        </div>
        <p>© 2024 ClientsVoice. All rights reserved.</p>
    </footer>
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
    );
}
export default Footer;