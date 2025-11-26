import { Link } from 'react-router-dom';
import { ShieldCheck, Users, CreditCard, LineChart, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import RatingStars from '../components/RatingStars';

export default function Landing() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Aadhaar Verified',
      description: 'All freelancers are verified with Aadhaar for your safety and trust.',
    },
    {
      icon: Users,
      title: 'Professional Designers',
      description: 'Connect with experienced interior designers with proven portfolios.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe and secure payment system to protect your transactions.',
    },
    {
      icon: LineChart,
      title: 'Project Tracking',
      description: 'Monitor your project progress in real-time with our dashboard.',
    },
  ];

  const testimonials = [
    {
      name: 'Anjali Gupta',
      role: 'Homeowner',
      rating: 5,
      comment: 'Happy Homes made my dream living room a reality. The designer was professional and the freelancers were skilled and verified. Highly recommend!',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Interior Designer',
      rating: 5,
      comment: 'As a designer, this platform has connected me with amazing clients and reliable freelancers. The project management tools are excellent.',
    },
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      rating: 4.8,
      comment: 'The verification process gave me peace of mind. My kitchen renovation was completed on time and within budget.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up as a homeowner, designer, or freelancer and complete your profile.',
    },
    {
      number: '02',
      title: 'Connect & Collaborate',
      description: 'Browse professionals, post projects, or apply for jobs based on your role.',
    },
    {
      number: '03',
      title: 'Bring Ideas to Life',
      description: 'Work together to create beautiful spaces with secure payments and tracking.',
    },
  ];

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Hero Section - Clean White Background */}
      <section className="relative bg-luxury-white overflow-hidden border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-6">
              <div className="h-1 w-24 bg-gray-800 mx-auto mb-8"></div>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight tracking-tight">
              Transform Your Space with
              <span className="block text-gray-800 mt-2">Verified Professionals</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Connect with elite interior designers and Aadhaar-verified freelancers to create the home of your dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-white to-transparent"></div>
      </section>

      {/* Steps Section - White Background for Contrast */}
      <section className="py-24 bg-luxury-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="h-1 w-24 bg-luxury-white mx-auto mb-8"></div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-600 mb-6">
              How Happy Homes Works
            </h2>
            <p className="text-xl text-luxury-gray-light font-light">Simple steps to transform your space</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="text-9xl font-serif font-bold text-gray-800 opacity-10 absolute -top-8 left-1/2 transform -translate-x-1/2">
                    {step.number}
                  </div>
                  <div className="relative w-24 h-24 bg-luxury-white border-2 border-gray-200 rounded-full flex items-center justify-center text-3xl font-serif font-bold mx-auto text-gray-800 group-hover:bg-luxury-white group-hover:text-gray-600 transition-all duration-300">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-600 mb-4">{step.title}</h3>
                <p className="text-luxury-gray-light leading-relaxed text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Black Background */}
      <section className="py-24 bg-luxury-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="h-1 w-24 bg-luxury-white mx-auto mb-8"></div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose Happy Homes
            </h2>
            <p className="text-xl text-gray-800 font-light">Everything you need for a successful project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 border border-gray-100 p-8 text-center group hover:border-gray-200 transition-all duration-300 hover:shadow-2xl">
                  <div className="w-16 h-16 bg-luxury-white text-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-800 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - White Background */}
      <section className="py-24 bg-luxury-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="h-1 w-24 bg-luxury-white mx-auto mb-8"></div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-600 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-luxury-gray-light font-light">Real stories from our exclusive community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-luxury-white-soft border-2 border-gray-100 p-8 hover:border-gray-200 transition-all duration-300">
                <RatingStars rating={testimonial.rating} showNumber={false} size={24} />
                <p className="text-luxury-gray-light my-6 leading-relaxed italic text-lg">"{testimonial.comment}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-14 h-14 bg-luxury-white rounded-full flex items-center justify-center">
                    <span className="text-xl font-serif font-semibold text-gray-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-gray-600 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-luxury-gray-light">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Black with Gold */}
      <section className="py-32 bg-luxury-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-1 w-24 bg-luxury-white mx-auto mb-8"></div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-gray-800 mb-8">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-gray-800 mb-12 leading-relaxed font-light">
            Join thousands of satisfied homeowners, designers, and freelancers on Happy Homes today.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-gray-800" />
              <span className="text-gray-800 font-light text-lg">Free to sign up</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-gray-800" />
              <span className="text-gray-800 font-light text-lg">Verified professionals</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-gray-800" />
              <span className="text-gray-800 font-light text-lg">Secure payments</span>
            </div>
          </div>
          <Link to="/signup">
            <Button size="lg" variant="primary">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
