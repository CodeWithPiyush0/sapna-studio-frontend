import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventDate: "",
    eventType: "Wedding",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/leads",
        formData
      );

      toast.success("Message sent! We'll contact you soon.");
      setFormData({ name: "", phone: "", eventDate: "", eventType: "Wedding" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif text-gold mb-4">Book Your Date</h2>
          <p className="text-gray-400">
            Tell us about your event an we will get back to you.
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-black/50 border border-gray-700 p-3 rounded-lg focus:border-gold outline-none transition"
                placeholder="e.g. Piyush Kumar"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-black/50 border border-gray-700 p-3 rounded-lg focus:border-gold outline-none transition"
                placeholder="+91 98765 43210"
              />
            </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  min={new Date() .toISOString().split("T")[0]}
                  className="bg-black/50 border border-gray-700 p-3 rounded-lg focus:border-gold outline-none transition text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border border-gray-700 p-3 rounded-lg focus:border-gold outline-none transition text-white"
                >
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday/Party</option>
                    <option value="Commercial">Commercial/Shoot</option>
                </select>
              </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold tracking-widest transition-all ${
                    loading
                        ? "bg-gray-700 cursor-not-allowed text-gray-400"
                        : "bg-gold text-black hover:bg-yellow-500 hover:scale-[1.02]"
                }`}
            >
                {loading ? "SENDING..." : "CONFIRM BOOKING"}
            </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
