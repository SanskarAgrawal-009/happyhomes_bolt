import { Link } from 'react-router-dom';
import { ShieldCheck, Users, CreditCard, LineChart, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
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
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Space with
              <span className="text-[#BE3144]"> Verified Professionals</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Connect with talented interior designers and Aadhaar-verified freelancers to create the home of your dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#BE3144] opacity-5 transform rotate-12 translate-x-1/2"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Happy Homes Works
            </h2>
            <p className="text-lg text-gray-600">Simple steps to transform your space</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center relative">
                <div className="text-6xl font-bold text-[#BE3144] opacity-10 absolute top-4 right-4">
                  {step.number}
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-[#BE3144] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Happy Homes
            </h2>
            <p className="text-lg text-gray-600">Everything you need for a successful project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover className="p-6 text-center">
                  <div className="w-14 h-14 bg-[#BE3144] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">Real stories from our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <RatingStars rating={testimonial.rating} showNumber={false} size={20} />
                <p className="text-gray-700 my-4 leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Join thousands of satisfied homeowners, designers, and freelancers on Happy Homes today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#BE3144]" />
              <span>Free to sign up</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#BE3144]" />
              <span>Verified professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#BE3144]" />
              <span>Secure payments</span>
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
