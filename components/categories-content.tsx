"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

export default function CategoriesContent() {
  const [showMenu, setShowMenu] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const categories = [
    {
      id: 1,
      name: "Art",
      projects: 32450,
      funding: "$245,780,450",
      successRate: "58%",
      featured: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Comics",
      projects: 12340,
      funding: "$178,450,320",
      successRate: "72%",
      featured: true,
      status: "Active",
    },
    {
      id: 3,
      name: "Crafts",
      projects: 18760,
      funding: "$98,340,120",
      successRate: "64%",
      featured: false,
      status: "Active",
    },
    {
      id: 4,
      name: "Dance",
      projects: 5430,
      funding: "$34,560,780",
      successRate: "52%",
      featured: false,
      status: "Active",
    },
    {
      id: 5,
      name: "Design",
      projects: 28970,
      funding: "$345,780,230",
      successRate: "68%",
      featured: true,
      status: "Active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Hidden":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFeaturedStatus = (featured: boolean) => {
    return featured ? (
      <span className="bg-green-100 text-green-800 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
        Yes
      </span>
    ) : (
      <span className="bg-gray-100 text-gray-800 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
        No
      </span>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search categories"
            className="pl-9 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Projects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Funding
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Success Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{category.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.projects}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.funding}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.successRate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getFeaturedStatus(category.featured)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(category.status)}`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap relative">
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(showMenu === category.id ? null : category.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>

                    {showMenu === category.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                        <div className="py-1">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            View Projects
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Category
                          </button>
                          <div className="border-t my-1"></div>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Category
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Category</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter category description"
                  rows={4}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                  <div className="flex items-center">
                    <input type="checkbox" id="featured" className="mr-2" />
                    <label htmlFor="featured" className="text-sm text-gray-700">
                      Show as featured
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex items-center">
                    <input type="checkbox" id="status" className="mr-2" defaultChecked />
                    <label htmlFor="status" className="text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
