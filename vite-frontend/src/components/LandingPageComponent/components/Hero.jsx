import React from 'react'
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
function Hero() {
    return (
        <section className="relative pt-52 pb-20 px-4">
            <div className="absolute inset-0 bg-gradient-to-b to-purple-500/10" />
            <div className="container mx-auto text-center relative animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Showcase Your Customer Love{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        Effortlessly
                    </span>
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-4xl mx-auto">
                    ClientsVoice empowers businesses to collect both testimonials and feedback. Our AI generates fully customizable forms tailored to your needs, while you can showcase your testimonials with a personalized widget to build trust and credibility.
                </p>
                <Link to={'signup'}>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center animate-bounce">
                    Get Started <ArrowRight className="ml-2" />
                </button>
                </Link>
            </div>
        </section>
    )
}

export default Hero
