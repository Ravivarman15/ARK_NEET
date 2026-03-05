import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import arkLogo from '@/assets/ark-logo.jpeg';

const Footer = () => {
  const quickLinks = [
    { label: 'About Programme', href: '#about' },
    { label: 'Offline Programme', href: '#offline' },
    { label: 'Online Programme', href: '#online' },
    { label: 'Programme Options', href: '#programme' },
    { label: 'Why ARK', href: '#why-ark' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-ark-blue text-ark-white pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img 
              src={arkLogo} 
              alt="ARK Learning Arena" 
              className="h-16 w-auto rounded mb-4"
            />
            <p className="text-ark-white/70 text-sm leading-relaxed mb-4">
              ARK Learning Arena provides structured, disciplined NEET preparation 
              with proven results. Join thousands of successful aspirants.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-ark-white/10 flex items-center justify-center hover:bg-ark-yellow hover:text-ark-blue transition-all duration-300"
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-ark-white/70 hover:text-ark-yellow transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-ark-yellow mt-1" />
                <span className="text-ark-white/70 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-ark-yellow mt-1" />
                <span className="text-ark-white/70 text-sm">info@arklearningarena.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-ark-yellow mt-1" />
                <span className="text-ark-white/70 text-sm">
                  ARK Learning Arena,<br />
                  Education Hub, India
                </span>
              </li>
            </ul>
          </div>

          {/* Free Books CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Free Books</h4>
            <p className="text-ark-white/70 text-sm mb-4">
              Claim your 6 FREE NEET Preparation Books when you enquire today.
            </p>
            <a
              href="#final-cta"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Claim Now
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ark-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ark-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ARK Learning Arena. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-ark-white/50 hover:text-ark-yellow transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-ark-white/50 hover:text-ark-yellow transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
