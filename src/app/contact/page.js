"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Send, 
  Mail, 
  User, 
  MessageSquare, 
  Phone, 
  Check, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram
} from "lucide-react";

export default function ContactUs() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
              animation: `float ${Math.random() * 10 + 20}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Main content container */}
      <div className="neumorph-container max-w-6xl mx-auto p-6 relative z-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => router.back()}
            className="neumorph-icon-button p-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </motion.button>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contact Us
          </h2>
          
          <div className="w-10 h-10"></div> {/* Empty div for layout balance */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <motion.div 
              className="neumorph-card p-6 h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="neumorph-icon-button-small p-2 mt-1 flex-shrink-0">
                    <Mail size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Email</h4>
                    <p className="text-gray-400">support@neuromorphic.ai</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="neumorph-icon-button-small p-2 mt-1 flex-shrink-0">
                    <Phone size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Phone</h4>
                    <p className="text-gray-400">+1 (800) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="neumorph-icon-button-small p-2 mt-1 flex-shrink-0">
                    <MessageSquare size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Live Chat</h4>
                    <p className="text-gray-400">Available 24/7 on our website</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-6 text-cyan-400">Follow Us</h3>
                <div className="flex space-x-4">
                  <motion.a 
                    href="#" 
                    className="neumorph-icon-button p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={18} className="text-blue-400" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="neumorph-icon-button p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} className="text-gray-400" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="neumorph-icon-button p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={18} className="text-blue-600" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="neumorph-icon-button p-3"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram size={18} className="text-pink-400" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div 
              className="neumorph-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="neumorph-icon-large mx-auto mb-6 text-green-400">
                    <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-100">Message Sent!</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Thank you for contacting us. We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 mb-2" htmlFor="name">
                        Your Name
                      </label>
                      <div className="neumorph-input-container flex items-center">
                        <User size={18} className="text-gray-500 ml-3" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-transparent border-none outline-none w-full p-3 pl-4 text-gray-300"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <div className="neumorph-input-container flex items-center">
                        <Mail size={18} className="text-gray-500 ml-3" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-transparent border-none outline-none w-full p-3 pl-4 text-gray-300"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2" htmlFor="subject">
                        Subject
                      </label>
                      <div className="neumorph-input-container flex items-center">
                        <MessageSquare size={18} className="text-gray-500 ml-3" />
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="bg-transparent border-none outline-none w-full p-3 pl-4 text-gray-300"
                          placeholder="How can we help?"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2" htmlFor="message">
                        Your Message
                      </label>
                      <div className="neumorph-textarea-container">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="bg-transparent border-none outline-none w-full p-4 text-gray-300 h-32 resize-none"
                          placeholder="Tell us what you need..."
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        className="neumorph-button-primary w-full py-4 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="neumorph-loader-small"></div>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Neuromorphic AI. All rights reserved.</p>
        </div>
      </div>
      
      {/* Neuromorphic styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #333 1px, transparent 1px),
                            linear-gradient(to bottom, #333 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .neumorph-container {
          background-color: #151515;
          border-radius: 20px;
          box-shadow: 20px 20px 60px #0d0d0d, -20px -20px 60px #1d1d1d;
        }
        
        .neumorph-card {
          background-color: #191919;
          border-radius: 16px;
          box-shadow: 8px 8px 16px #101010, -8px -8px 16px #222222;
        }
        
        .neumorph-icon-button {
          background-color: #191919;
          border-radius: 12px;
          box-shadow: 5px 5px 10px #101010, -5px -5px 10px #222222;
          transition: all 0.3s ease;
        }
        
        .neumorph-icon-button:active {
          box-shadow: inset 5px 5px 10px #101010, inset -5px -5px 10px #222222;
        }
        
        .neumorph-icon-button-small {
          background-color: #191919;
          border-radius: 8px;
          box-shadow: 3px 3px 6px #0f0f0f, -3px -3px 6px #232323;
          transition: all 0.3s ease;
        }
        
        .neumorph-icon-button-small:active {
          box-shadow: inset 3px 3px 6px #0f0f0f, inset -3px -3px 6px #232323;
        }
        
        .neumorph-icon-large {
          width: 80px;
          height: 80px;
          background-color: #191919;
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 8px 8px 16px #0f0f0f, -8px -8px 16px #232323;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #222 1px, transparent 1px),
            linear-gradient(to bottom, #222 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}