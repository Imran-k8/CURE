import React from 'react';
import { Mail, MapPin, PhoneCall } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        <p className="text-gray-300">We’d love to hear from you. Reach out to us with any questions, feedback, or inquiries.</p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-pink-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Email</h3>
              <p className="text-gray-300">Currently unavailable</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <PhoneCall className="w-6 h-6 text-pink-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Phone</h3>
              <p className="text-gray-300">Currently unavailable</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-pink-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">Address</h3>
              <p className="text-gray-300">Currently unavailable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;