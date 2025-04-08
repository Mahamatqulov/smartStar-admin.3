"use client";

import StatsCards from "./stats-cards";
import ProjectsTable from "./projects-table";

export default function DashboardContent() {
  return (
    <>
      {/* Stats */}
      <StatsCards />

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Recent Projects</h2>
        </div>
        <ProjectsTable />
        {/* <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Previous</button>
            <div className="flex items-center">
              <span className="px-3 py-1 rounded bg-gray-200 text-gray-700">1</span>
              <button className="px-3 py-1 text-gray-700 hover:bg-gray-100">2</button>
              <button className="px-3 py-1 text-gray-700 hover:bg-gray-100">3</button>
            </div>
            <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Next</button>
          </div>
        </div> */}
      </div>
    </>
  );
}
