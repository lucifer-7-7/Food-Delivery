import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import './Testimonials.css';


const testimonialData = [
  {
    id: 1,
    content: 'Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.',
    name: 'Saul Goodman',
    role: 'CEO & Founder',
    image: '/img/testimonials/testimonials-1.jpg',
    stars: 5
  },
  {
    id: 2,
    content: 'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.',
    name: 'Sara Wilsson',
    role: 'Designer',
    image: '/img/testimonials/testimonials-2.jpg',
    stars: 5
  },
  {
    id: 3,
    content: 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram.',
    name: 'Jena Karlis',
    role: 'Store Owner',
    image: '/img/testimonials/testimonials-3.jpg',
    stars: 5
  }
];

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ 
      once: true,
      duration: 800,
      easing: 'ease-in-out'
    });
  }, []);

  
  const renderStars = (count) => {
    return Array(count).fill(0).map((_, index) => (
      <i key={index} className="bi bi-star-fill" aria-hidden="true"></i>
    ));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container section-title" data-aos="fade-up">
        <h2>TESTIMONIALS</h2>
        <p>
          What Are They <span className="highlight">Saying About Us</span>
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Pagination, Autoplay, A11y]}
          loop={true}
          speed={800}
          autoplay={{ 
            delay: 5000,
            disableOnInteraction: false
          }}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          a11y={{
            prevSlideMessage: 'Previous testimonial',
            nextSlideMessage: 'Next testimonial'
          }}
          className="testimonials-slider"
        >
          {testimonialData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-item">
                <div className="testimonial-wrapper">
                  <div className="testimonial-content">
                    <div className="quote-content">
                      <i className="bi bi-quote quote-icon-left" aria-hidden="true"></i>
                      <span>{testimonial.content}</span>
                      <i className="bi bi-quote quote-icon-right" aria-hidden="true"></i>
                    </div>
                    <div className="author-info">
                      <h3>{testimonial.name}</h3>
                      <h4>{testimonial.role}</h4>
                      <div className="stars" aria-label={`${testimonial.stars} out of 5 stars rating`}>
                        {renderStars(testimonial.stars)}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-image-container">
                    <img
                      src={testimonial.image}
                      className="testimonial-img"
                      alt={`Portrait of ${testimonial.name}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;