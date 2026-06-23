"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function StartupTable({ initialData }) {
  const router = useRouter();
  const [startups, setStartups] = useState([initialData]); // টেবিলের ডাটা স্টেট
  const [editingStartup, setEditingStartup] = useState(null); // এডিট করার জন্য সিলেক্টেড ডাটা
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডেল করা (এডিট ফর্মের জন্য)
  const handleInputChange = (e) => {
    setEditingStartup({ ...editingStartup, [e.target.name]: e.target.value });
  };

  // ১. UPDATE FUNCTION
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/startup/${editingStartup.startupId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStartup),
      });

      if (response.ok) {
        alert("Startup updated successfully!");
        setEditingStartup(null); // ফর্ম বন্ধ করার জন্য
        router.refresh(); // ডেটা রিফ্রেশ
      } else {
        alert("Failed to update.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ২. DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this startup?")) return;

    try {
      const response = await fetch(`/api/startup/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Startup deleted successfully!");
        router.refresh();
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* --- STARTUP TABLE --- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-bold">
            <tr>
              <th className="p-4">Logo</th>
              <th className="p-4">Startup Name</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Funding</th>
              <th className="p-4">Founder Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {initialData.map((item,index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4">
                  <Image src={item.logo} width={50} height={50} alt={item.startupName} className="w-10 h-10 rounded-full object-cover border" />
                </td>
                <td className="p-4 font-medium text-gray-900">{item.startupName}</td>
                <td className="p-4 text-gray-600">{item.industry}</td>
                <td className="p-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs uppercase font-semibold">{item.fundingStage}</span></td>
                <td className="p-4 text-gray-600">{item.founderEmail}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-center space-x-2">
                  <button 
                    onClick={() => setEditingStartup(item)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-xs"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(item.startupId)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- UPDATE FORM (যখনি Update বাটনে ক্লিক করা হবে তখন এটি শো করবে) --- */}
      {editingStartup && (
        <div className="bg-gray-50 p-6 rounded-lg border max-w-xl">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Update Startup: {editingStartup.startupName}</h2>
          <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Startup Name</label>
              <input type="text" name="startupName" value={editingStartup.startupName} onChange={handleInputChange} className="w-full border p-2 rounded bg-white" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Industry</label>
              <input type="text" name="industry" value={editingStartup.industry} onChange={handleInputChange} className="w-full border p-2 rounded bg-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Funding Stage</label>
              <input type="text" name="fundingStage" value={editingStartup.fundingStage} onChange={handleInputChange} className="w-full border p-2 rounded bg-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
              <select name="status" value={editingStartup.status} onChange={handleInputChange} className="w-full border p-2 rounded bg-white">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Logo URL</label>
              <input type="text" name="logo" value={editingStartup.logo} onChange={handleInputChange} className="w-full border p-2 rounded bg-white" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea name="description" value={editingStartup.description} onChange={handleInputChange} className="w-full border p-2 rounded bg-white" rows="3" />
            </div>
            <div className="col-span-2 flex gap-2 justify-end">
              <button type="button" onClick={() => setEditingStartup(null)} className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}