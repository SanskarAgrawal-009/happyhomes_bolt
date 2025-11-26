import { Link } from 'react-router-dom';
import { ShieldCheck, Users, CreditCard, LineChart, CheckCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
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
      title: 'Execute & Enjoy',
      description: 'Work with your chosen professionals to bring your vision to life.',
    },
  ];

  // Animation variants
  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-gray-900">
              Your Dream Home, <br />
              <span className="italic text-gray-600">Designed with Ease</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Connect with verified interior designers and skilled freelancers to bring your vision to life, securely and efficiently.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="md" className="bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 text-lg w-full sm:w-48">
                  Get Started
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="md" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black text-lg w-full sm:w-48">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-start p-8 bg-white rounded shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <feature.icon className="w-10 h-10 text-gray-900 mb-6" />
                <h3 className="text-xl font-bold mb-3 text-gray-900 font-serif">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900"
          >
            Simple Steps to Perfection
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center text-center group"
              >
                <div className="text-6xl font-serif font-bold text-gray-200 mb-6 group-hover:text-gray-900 transition-colors duration-500">{step.number}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-serif">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900"
          >
            Client Stories
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-10 rounded shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <RatingStars rating={testimonial.rating} />
                  <p className="text-gray-700 italic mt-6 mb-8 text-lg leading-relaxed font-light">"{testimonial.comment}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-serif font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight text-white">
              Ready to Transform Your Home?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-300 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Join thousands of satisfied homeowners, designers, and freelancers on Happy Homes today.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-gray-400" />
                <span className="text-gray-300 font-light text-lg">Free to sign up</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-gray-400" />
                <span className="text-gray-300 font-light text-lg">Verified professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-gray-400" />
                <span className="text-gray-300 font-light text-lg">Secure payments</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link to="/signup">
                <Button variant="ghost" size="lg" className="bg-white text-gray-800 hover:bg-gray-800 hover:text-white border-none shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold">
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
