const Testimonials = ()=>{
    return (
        <section id="testimonials" className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-slider">
           
            <div className="testimonial-card">
                <img src="https://xsgames.co/randomusers/assets/avatars/male/5.jpg" alt="User 1"/>
                <blockquote>“This platform is a game-changer for showcasing client feedback!”</blockquote>
                <p>- John Doe, CEO of TechCorp</p>
            </div>
            <div className="testimonial-card">
                <img src="https://xsgames.co/randomusers/assets/avatars/male/66.jpg" alt="User 2"/>
                <blockquote>“We saw a 30% increase in conversions thanks to FeedbackHub.”</blockquote>
                <p>- Jane Smith, Marketing Lead at Innovate</p>
            </div>
           
        </div>
    </section>
    );
}

export default Testimonials;