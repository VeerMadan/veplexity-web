"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, Calendar, Settings, 
  Plus, CheckCircle, Clock, ArrowLeft, Search, Building2
} from "lucide-react";
import Link from "next/link";

// Mock Data to simulate the database
const initialLeads = [
  { id: 1, name: "Rahul Sharma", phone: "+91 98765 43210", property: "Whitefield Villas", date: "Jul 14, 2026", status: "Pending" },
  { id: 2, name: "Priya Desai", phone: "+91 91234 56789", property: "MVK Heights", date: "Jul 12, 2026", status: "Confirmed" },
  { id: 3, name: "Amit Kumar", phone: "+91 99887 77665", property: "Whitefield Villas", date: "Jul 10, 2026", status: "Completed" },
];

export default function CommandCenterDemo() {
  const [leads, setLeads] = useState(initialLeads);

  // Simulating adding a new lead via WhatsApp API
  const handleAddLead = () => {
    const newLead = {
      id: leads.length + 1,
      name: "New Web Lead",
      phone: "+91 9" + Math.floor(100000000 + Math.random() * 900000000),
      property: "MVK Heights",
      date: "Just Now",
      status: "Pending"
    };
    setLeads([newLead, ...leads]);
  };

  // Simulating database updates
  const toggleStatus = (id: number) => {
    setLeads(leads.map(lead => {
      if (lead.id === id) {
        const nextStatus = lead.status === "Pending" ? "Confirmed" : lead.status === "Confirmed" ? "Completed" : "Pending";
        return { ...lead, status: nextStatus };
      }
      return lead;
    }));
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-white/[0.01] hidden md:flex flex-col p-6">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/20 rounded-lg flex items-center justify-center text-yellow-400">
            <Building2 className="w-4 h-4" />
          </div>
          <h1 className="font-bold tracking-wide">Command Center</h1>
        </div>
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10">
            <LayoutDashboard className="w-5 h-5 text-gray-400" /> Dashboard
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-white/[0.02] hover:text-gray-300 transition-colors cursor-not-allowed">
            <Users className="w-5 h-5" /> Team Activity
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-white/[0.02] hover:text-gray-300 transition-colors cursor-not-allowed">
            <Settings className="w-5 h-5" /> System Config
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* Sandbox Notice Banner */}
        <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3 text-blue-400 text-sm">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p>
            <strong className="font-bold text-blue-300">Architecture Demo:</strong> This is a simulated frontend representation of the production MVK Command Center. The database connection has been replaced with local React State to prevent sensitive data exposure. Feel free to interact with the UI.
          </p>
        </div>

        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-1">Site Visits Pipeline</h2>
            <p className="text-gray-500 text-sm">Managing leads and scheduling for Whitefield properties.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Search leads..." className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white" disabled />
            </div>
            <button onClick={handleAddLead} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" /> Simulate Lead
            </button>
          </div>
        </header>

        {/* Data Table */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider bg-white/[0.01]">
                  <th className="p-4 font-medium">Client Name</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Property Interest</th>
                  <th className="p-4 font-medium">Scheduled Date</th>
                  <th className="p-4 font-medium">Status (Click to toggle)</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={lead.id} 
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4 font-medium text-white">{lead.name}</td>
                    <td className="p-4 text-gray-400 font-mono text-sm">{lead.phone}</td>
                    <td className="p-4 text-gray-300">{lead.property}</td>
                    <td className="p-4 text-gray-400 flex items-center gap-2 text-sm">
                      <Calendar className="w-3 h-3" /> {lead.date}
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleStatus(lead.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5 w-fit
                          ${lead.status === "Pending" ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" : ""}
                          ${lead.status === "Confirmed" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : ""}
                          ${lead.status === "Completed" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : ""}
                        `}
                      >
                        {lead.status === "Pending" && <Clock className="w-3 h-3" />}
                        {lead.status === "Confirmed" && <Users className="w-3 h-3" />}
                        {lead.status === "Completed" && <CheckCircle className="w-3 h-3" />}
                        {lead.status}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}