import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaCalendar,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserFriends,
  FaImages,
  FaPhoneAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/leads");
        setLeads(res.data);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchLeads();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-dark text-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-800 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl text-gold font-serif">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Manage your inquiries and portfolio.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/admin/gallery')}
            className="bg-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
          >
            Manage Gallery
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full md:w-auto bg-red-600/20 text-red-500 border border-red-600/50 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition text-sm font-bold"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div>
            <h3 className="text-gray-400 text-xs md:text-sm uppercase tracking-wider ">
              Total Inquiries
            </h3>
            <p className="text-2xl md:text-4xl font-bold text-gold mt-1">
              {leads.length}
            </p>
          </div>

          <div className="bg-gold/10 p-3 rounded-full text-gold text-xl">
            <FaUserFriends />
          </div>
        </div>

        <div className="bg-white/5 p-5 rounded-xl border border-white/10 opacity-50 flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-xs md:text-sm uppercase">
              Photos
            </h3>
            <p className="text-2xl md:text-4xl font-bold text-gray-500 mt-1">
              0
            </p>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-full text-gray-400 text-xl">
            <FaImages />
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4 text-white">
        Recent Inquiries
      </h2>

      <div className="md:hidden space-y-4">
        {leads.map((lead) => (
            <div key={lead._id} className="bg-white/5 p-5 rounded-xl border border-white/10 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                    <span className="text-xs bg-gold/20 px-2 py-1 rounded border border-gold/30">
                        {lead.eventType}
                    </span>
                </div>

                <div className="space-y-3 text-sm text-gray-300">
                    <p className="flex items-center gap-3">
                        <span className="bg-gray-800 p-2 rounded-full text-gold">
                            <FaPhoneAlt size={12} />
                        </span>
                        <a href={`tel:${lead.phone}`} className="underline decoration-gray-600 hover:text-gold transition">
                            {lead.phone}
                        </a>
                    </p>

                    <p className="flex items-center gap-3">
                        <span className="bg-gray-800 p-2 rounded-full text-gold">
                            <FaCalendarAlt size={12} />
                        </span>
                        {new Date(lead.eventDate).toDateString()}
                    </p>

                    <p className="text-xs text-gray-600 mt-3 pt-3 border-t border-gray-800">
                        Received: {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        ))}

        {leads.length === 0 && <p className="text-gray-500 text-center">No leads found.</p>}
      </div>

      <div className="hidden md:block bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black/50 text-gold uppercase text-sm">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Name</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Event Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-white/5 transition">
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4">
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs border border-gold/20">
                      {lead.eventType}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300 font-mono">{lead.phone}</td>
                  <td className="p-4 text-white">
                    {new Date(lead.eventDate).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leads.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No inquiries found yet.
            </div>
          )}
        </div>
      </div>
  );
};

export default Dashboard;
