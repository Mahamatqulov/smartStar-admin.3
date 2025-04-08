"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Search, Plus, UserIcon, MoreHorizontal, Eye, Edit, Lock, Unlock, Trash2 } from "lucide-react"
import { debounce } from "lodash"

interface User {
  id: number
  name: string
  email: string
  role: string
  projects: number
  backed: number
  pledged: string
  joined: string
  status: string
}

export default function UsersContent() {
  const [showMenu, setShowMenu] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([])
  const [totalPages, setTotalPages] = useState(1)

  // Sample data - in a real app, this would come from an API
  const allUsers: User[] = [
    {
      id: 1,
      name: "Thomas Noonan",
      email: "thomas@example.com",
      role: "Creator",
      projects: 3,
      backed: 12,
      pledged: "$1,240",
      joined: "Jan 12, 2022",
      status: "Active",
    },
    {
      id: 2,
      name: "Jacquelyn Benson",
      email: "jacquelyn@example.com",
      role: "Creator",
      projects: 5,
      backed: 8,
      pledged: "$780",
      joined: "Mar 5, 2021",
      status: "Active",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Admin",
      projects: 0,
      backed: 24,
      pledged: "$3,450",
      joined: "Nov 18, 2020",
      status: "Active",
    },
    {
      id: 4,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Backer",
      projects: 0,
      backed: 42,
      pledged: "$5,670",
      joined: "Feb 3, 2022",
      status: "Active",
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      email: "emily@example.com",
      role: "Moderator",
      projects: 1,
      backed: 15,
      pledged: "$1,890",
      joined: "Jul 22, 2021",
      status: "Active",
    },
    // Generate more sample users for testing pagination
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 6,
      name: `User ${i + 6}`,
      email: `user${i + 6}@example.com`,
      role: i % 4 === 0 ? "Admin" : i % 3 === 0 ? "Moderator" : i % 2 === 0 ? "Creator" : "Backer",
      projects: i % 2 === 0 ? Math.floor(Math.random() * 5) : 0,
      backed: Math.floor(Math.random() * 50),
      pledged: `$${Math.floor(Math.random() * 10000)}`,
      joined: `Jan ${Math.floor(Math.random() * 28) + 1}, ${2020 + Math.floor(Math.random() * 4)}`,
      status: i % 10 === 0 ? "Suspended" : i % 7 === 0 ? "Pending" : "Active",
    })),
  ]

  // Filter and paginate users
  const filterUsers = useCallback(() => {
    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      let filtered = [...allUsers]

      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(
          (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
        )
      }

      // Apply role filter
      if (selectedRole) {
        filtered = filtered.filter((user) => user.role === selectedRole)
      }

      // Apply status filter
      if (selectedStatus) {
        filtered = filtered.filter((user) => user.status === selectedStatus)
      }

      setFilteredUsers(filtered)
      setTotalPages(Math.ceil(filtered.length / itemsPerPage))

      // Update displayed users based on current page
      const startIndex = (currentPage - 1) * itemsPerPage
      setDisplayedUsers(filtered.slice(startIndex, startIndex + itemsPerPage))
      setLoading(false)
    }, 300)
  }, [searchTerm, selectedRole, selectedStatus, currentPage, itemsPerPage])

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term)
      setCurrentPage(1) // Reset to first page on new search
    }, 300),
    [],
  )

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  // Handle role filter change
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value)
    setCurrentPage(1) // Reset to first page on filter change
  }

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value)
    setCurrentPage(1) // Reset to first page on filter change
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  // Apply filters when dependencies change
  useEffect(() => {
    filterUsers()
  }, [filterUsers])

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800"
      case "Moderator":
        return "bg-orange-100 text-orange-800"
      case "Creator":
        return "bg-blue-100 text-blue-800"
      case "Backer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page, current page and neighbors, and last page
      pages.push(1)

      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      if (startPage > 2) pages.push(-1) // -1 represents ellipsis

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) pages.push(-2) // -2 represents ellipsis

      pages.push(totalPages)
    }

    return pages
  }

  // Skeleton loader for table rows
  const TableSkeleton = () => (
    <>
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <tr key={`skeleton-${index}`} className="animate-pulse">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-8 bg-gray-200 rounded w-8"></div>
          </td>
        </tr>
      ))}
    </>
  )

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users"
              className="pl-9 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={handleSearchChange}
            />
          </div>
          <select
            className="border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={handleRoleChange}
            value={selectedRole}
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Creator">Creator</option>
            <option value="Backer">Backer</option>
          </select>
          <select
            className="border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={handleStatusChange}
            value={selectedStatus}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Backed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pledged
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <TableSkeleton />
              ) : (
                displayedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <UserIcon className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.projects}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.backed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.pledged}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap relative">
                      <div className="relative">
                        <button
                          onClick={() => setShowMenu(showMenu === user.id ? null : user.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>

                        {showMenu === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <div className="py-1">
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                {user.status === "Active" ? (
                                  <>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Suspend User
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="h-4 w-4 mr-2" />
                                    Activate User
                                  </>
                                )}
                              </button>
                              <div className="border-t my-1"></div>
                              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing{" "}
              {loading
                ? "..."
                : `${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredUsers.length)}`}{" "}
              of {loading ? "..." : filteredUsers.length} users
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="px-3 py-1 border rounded-l text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {getPaginationNumbers().map((page, index) =>
                page < 0 ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-700">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={loading}
                    className={`px-3 py-1 ${
                      currentPage === page ? "bg-gray-200 text-gray-700 font-medium" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="px-3 py-1 border rounded-r text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New User</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>

            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="creator">Creator</option>
                    <option value="backer">Backer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-4 flex items-center">
                <input type="checkbox" id="sendEmail" className="mr-2" />
                <label htmlFor="sendEmail" className="text-sm text-gray-700">
                  Send welcome email with login credentials
                </label>
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
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
