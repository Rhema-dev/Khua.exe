import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './Contact.css';

emailjs.init("oylVlQJ9s3IpWVNTt");

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        "service_anzes2l",
        "template_8v1ksmz",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'emmaarhema20000@gmail.com' // Your receiving email
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="contact-method-icon email" />,
      title: 'Email',
      value: 'emmaarhema20000@gmail.com',
      action: 'mailto:emmarhema20000@gmail.com'
    },
    {
      icon: <FaPhone className="contact-method-icon phone" />,
      title: 'Phone',
      value: '+234 704 1099 662',
      action: 'tel:+2347041099662'
    },
    {
      icon: <FaMapMarkerAlt className="contact-method-icon location" />,
      title: 'Location',
      value: 'Warri, Delta State, Nigeria',
      action: 'https://maps.google.com?q=Warri,DeltaState,Nigeria'
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="social-link linkedin" />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/emmanuel-great-rhema-970384319'
    },
    {
      icon: <FaGithub className="social-link github" />,
      name: 'GitHub',
      url: 'https://github.com/Rhema-dev'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="contact-container"
    >
      <div className="contact-content">
        {/* Left Column - Contact Info */}
        <motion.div 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="contact-info-col"
        >
          <div className="contact-info-card">
            <h2 className="contact-info-title">Get in Touch</h2>
            <p className="contact-info-text">
              Have a project in mind or want to collaborate? Feel free to reach out through any of these channels.
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href={method.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method"
                >
                  {method.icon}
                  <div className="contact-method-text">
                    <h3>{method.title}</h3>
                    <p>{method.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="social-links-section">
              <h3 className="social-links-title">Follow Me</h3>
              <div className="social-links-container">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${social.name.toLowerCase()}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="contact-form-col"
        >
          <div className="contact-form-card">
            <h2 className="contact-form-title">Send a Message</h2>
            
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="status-message status-success"
              >
                <p>Message sent successfully! I'll get back to you soon.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="status-message status-error"
              >
                <p>Error sending message. Please try again later or contact me directly via email.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-input form-textarea"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}