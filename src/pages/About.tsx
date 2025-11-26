import { Target, Heart, Shield, Award } from 'lucide-react';
import Card from '../components/ui/Card';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To democratize access to quality interior design services by connecting homeowners with talented professionals and verified freelancers.',
    },
    {
      icon: Heart,
      title: 'Our Passion',
      description: 'We believe everyone deserves a beautiful home. We are passionate about making interior design accessible and affordable for all.',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'All professionals on our platform undergo rigorous verification including Aadhaar authentication for freelancers.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We maintain high standards by vetting designers and freelancers, ensuring you get the best service possible.',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Happy Homeowners' },
    { number: '800+', label: 'Verified Designers' },
    { number: '1200+', label: 'Skilled Freelancers' },
    { number: '10000+', label: 'Projects Completed' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Happy Homes</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We are India's premier marketplace connecting homeowners with talented interior designers and Aadhaar-verified freelancers. Our platform makes it easy to transform your living space with trusted professionals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-pastel-purple mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-8">
                  <div className="w-14 h-14 bg-pastel-purple text-white rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-left">
              <p>
                Happy Homes was founded in 2023 with a simple yet powerful vision: to make quality interior design accessible to everyone in India. We noticed that finding reliable designers and skilled freelancers was challenging for homeowners, while talented professionals struggled to find clients.
              </p>
              <p>
                Our platform bridges this gap by providing a secure, transparent marketplace where homeowners can discover and hire verified professionals. We implemented Aadhaar verification for freelancers to ensure safety and trust, making Happy Homes the most secure platform for home improvement projects.
              </p>
              <p>
                Today, we are proud to have facilitated thousands of successful projects, helping families across India create the homes of their dreams. Our community of designers and freelancers continues to grow, bringing creativity and craftsmanship to every project.
              </p>
              <p className="font-semibold text-gray-900">
                Join us in transforming houses into happy homes, one project at a time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
