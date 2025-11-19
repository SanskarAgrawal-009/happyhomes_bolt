import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Card from '../components/ui/Card';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@happyhomes.com',
      link: 'mailto:support@happyhomes.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 98765 43210',
      link: 'tel:+919876543210',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Mumbai, Maharashtra, India',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Have questions or need assistance? We're here to help. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="w-14 h-14 bg-[#BE3144] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-[#BE3144] transition-colors"
                  >
                    {info.content}
                  </a>
                </Card>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    label="Your Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="How can we help you?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />

                <TextArea
                  label="Message"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <Button type="submit" variant="primary" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6 text-left">
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">How do I get started?</h3>
                <p className="text-gray-600">
                  Simply sign up for an account, select your role (homeowner, designer, or freelancer), and complete your profile. You'll be able to start browsing or posting projects immediately.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Are all freelancers verified?</h3>
                <p className="text-gray-600">
                  Yes, all freelancers on our platform undergo Aadhaar verification to ensure authenticity and safety. Designers are also verified through our rigorous vetting process.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">How does payment work?</h3>
                <p className="text-gray-600">
                  We provide a secure payment system that protects both clients and professionals. Payments are processed through our platform to ensure transparency and security.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
