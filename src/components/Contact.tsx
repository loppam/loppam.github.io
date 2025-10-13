import { motion } from "motion/react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
    subject: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - for now just log
    console.log("Form submitted:", formData);
    alert(
      "Thanks for reaching out! This is a demo form. In production, this would send an email."
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:lopam@pario.la",
      handle: "lopam@pario.la",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/loppam",
      handle: "@loppam",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/pariolaololade",
      handle: "Pariola Ololade",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/lopamdev",
      handle: "@lopamdev",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-4 md:px-10 lg:px-[120px] bg-gradient-to-b from-transparent to-black/[0.02]"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                Get in touch
              </span>
            </div>
            <h2 className="text-black mb-6">Let's build something</h2>
            <p className="text-black/70 max-w-2xl mb-2 leading-relaxed">
              Available for remote and contract work. Interested in working
              together?
            </p>
            <p className="text-black/60 leading-relaxed">
              Drop me a message or reach out on any platform below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-black mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-black/20 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-black mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-black/20 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="budget" className="text-black mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Job Opportunity"
                    className="border-black/20 focus:border-black"
                  />
                </div>
                <div>
                  <Label htmlFor="budget" className="text-black mb-2 block">
                    Budget (optional)
                  </Label>
                  <Input
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. $5,000 - $10,000"
                    className="border-black/20 focus:border-black"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-black mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border-black/20 focus:border-black resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-black/90 transition-all duration-120 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-black mb-6">Connect</h3>
              <div className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 border-2 border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-200 group"
                    >
                      <Icon className="h-5 w-5 text-black/60 group-hover:text-white transition-colors" />
                      <div>
                        <div className="group-hover:text-white transition-colors">
                          {link.name}
                        </div>
                        <div className="text-black/60 group-hover:text-white/70 transition-colors">
                          {link.handle}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-black text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <strong>Status: Available</strong>
                </div>
                <p className="text-white/80">Open for remote & contract work</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
