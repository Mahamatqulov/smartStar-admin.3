"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import ProjectsTable from "./projects-table";

export default function ProjectsContent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects"
              className="pl-9 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select className="border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="">All Categories</option>
            <option value="art">Art</option>
            <option value="comics">Comics</option>
            <option value="crafts">Crafts</option>
            <option value="design">Design</option>
            <option value="fashion">Fashion</option>
            <option value="film">Film</option>
            <option value="food">Food</option>
            <option value="games">Games</option>
            <option value="music">Music</option>
            <option value="publishing">Publishing</option>
            <option value="technology">Technology</option>
          </select>
          <select className="border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="ended">Ended</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ProjectsTable />
        {/* <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <div className="flex items-center">
              <span className="px-3 py-1 rounded bg-gray-200 text-gray-700">
                1
              </span>
              <button className="px-3 py-1 text-gray-700 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 text-gray-700 hover:bg-gray-100">
                3
              </button>
            </div>
            <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div> */}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Project</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>

            <form>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select category</option>
                    <option value="art">Art</option>
                    <option value="comics">Comics</option>
                    <option value="crafts">Crafts</option>
                    <option value="design">Design</option>
                    <option value="fashion">Fashion</option>
                    <option value="film">Film</option>
                    <option value="food">Food</option>
                    <option value="games">Games</option>
                    <option value="music">Music</option>
                    <option value="publishing">Publishing</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter project description"
                  rows={4}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Goal ($)
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Duration (days)
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter days"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
