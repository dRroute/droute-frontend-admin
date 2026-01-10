"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Clock,
  MessageSquare,
  Search,
  Trash2,
  User,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
} from "lucide-react"
// Mock data for support tickets
const mockTickets = [
  {
    id: "TKT-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    subject: "Cannot access my account",
    message:
      "I've been trying to log into my account for the past hour but keep getting an error message. Please help urgently!",
    status: "open",
    priority: "emergency",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    category: "Account Access",
  },
  {
    id: "TKT-002",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    subject: "Billing inquiry",
    message:
      "I was charged twice for my subscription this month. Can you please check and refund the duplicate charge?",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-01-15T11:20:00Z",
    category: "Billing",
  },
  {
    id: "TKT-003",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    subject: "Feature request",
    message: "Would it be possible to add dark mode to the application? It would really improve the user experience.",
    status: "open",
    priority: "low",
    createdAt: "2024-01-15T08:45:00Z",
    updatedAt: "2024-01-15T08:45:00Z",
    category: "Feature Request",
  },
  {
    id: "TKT-004",
    customerName: "Emma Davis",
    customerEmail: "emma@example.com",
    subject: "URGENT: System down",
    message:
      "The entire system appears to be down. None of our team can access the platform. This is affecting our business operations!",
    status: "open",
    priority: "emergency",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
    category: "Technical Issue",
  },
  {
    id: "TKT-005",
    customerName: "Robert Brown",
    customerEmail: "robert@example.com",
    subject: "Password reset issue",
    message: "I requested a password reset but haven't received the email. Can you help me reset my password manually?",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-01-14T16:20:00Z",
    updatedAt: "2024-01-15T09:30:00Z",
    category: "Account Access",
  },
]

export default function SupportAdminDashboard() {
  const [tickets, setTickets] = useState(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [adminResponse, setAdminResponse] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() } : ticket,
      ),
    )
  }

  const deleteTicket = (ticketId) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId))
  }

  const openModal = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
    console.log("Opening modal for ticket:", ticket.id) // Add logging for debugging
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedTicket(null)
      setAdminResponse("")
    }, 200) // Small delay to allow animation to complete
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "emergency":
        return "bg-red-100 text-red-800 border border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "in-progress":
        return "bg-purple-100 text-purple-800 border border-purple-200"
      case "resolved":
        return "bg-green-100 text-green-800 border border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const emergencyTickets = tickets.filter((ticket) => ticket.priority === "emergency" && ticket.status !== "resolved")
  const openTickets = tickets.filter((ticket) => ticket.status === "open")
  const inProgressTickets = tickets.filter((ticket) => ticket.status === "in-progress")
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "resolved")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Support Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage customer support tickets and emergency requests</p>
          </div>
        </div>

        {/* Emergency Alert */}
        {emergencyTickets.length > 0 && (
          <div className="border border-red-200 bg-red-50 rounded-lg shadow-sm">
            <div className="p-6 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Emergency Tickets Require Immediate Attention</h3>
              </div>
              <p className="text-red-700 mt-1">
                {emergencyTickets.length} emergency ticket{emergencyTickets.length > 1 ? "s" : ""} need
                {emergencyTickets.length === 1 ? "s" : ""} urgent resolution
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="space-y-2">
                {emergencyTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        {ticket.id}
                      </span>
                      <span className="font-medium">{ticket.subject}</span>
                      <span className="text-sm text-gray-600">by {ticket.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal(ticket)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => updateTicketStatus(ticket.id, "in-progress")}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Open Tickets</h3>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div className="px-6 pb-6">
              <div className="text-2xl font-bold text-blue-600">{openTickets.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">In Progress</h3>
              <Clock className="h-4 w-4 text-purple-600" />
            </div>
            <div className="px-6 pb-6">
              <div className="text-2xl font-bold text-purple-600">{inProgressTickets.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Resolved</h3>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="px-6 pb-6">
              <div className="text-2xl font-bold text-green-600">{resolvedTickets.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Emergency</h3>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
            <div className="px-6 pb-6">
              <div className="text-2xl font-bold text-red-600">{emergencyTickets.length}</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-3">
            <h3 className="text-lg font-semibold">All Support Tickets</h3>
            <p className="text-gray-600 mt-1">Manage and resolve customer support requests</p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tickets by ID, customer name, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="emergency">Emergency</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Tickets Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className={ticket.priority === "emergency" ? "bg-red-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {ticket.priority === "emergency" && <AlertTriangle className="h-4 w-4 text-red-600" />}
                          <span className="text-sm font-medium text-gray-900">{ticket.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                            <div className="text-sm text-gray-500">{ticket.customerEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">{ticket.subject}</div>
                          <div className="text-sm text-gray-500">{ticket.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(ticket.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(ticket)}
                            className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>

                          <select
                            value={ticket.status}
                            onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                            className="block w-32 px-2 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>

                          <button
                            onClick={() => deleteTicket(ticket.id)}
                            className="inline-flex items-center p-1.5 border border-gray-300 rounded-md text-red-400 hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={closeModal}>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              {selectedTicket && (
                <>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                          {selectedTicket.priority === "emergency" && (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                          Ticket Details: {selectedTicket.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Customer: {selectedTicket.customerName} ({selectedTicket.customerEmail})
                        </p>
                      </div>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedTicket.subject}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{selectedTicket.message}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Priority</label>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getPriorityColor(selectedTicket.priority)}`}
                          >
                            {selectedTicket.priority}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedTicket.status)}`}
                          >
                            {selectedTicket.status}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <p className="text-sm text-gray-700 mt-1">{selectedTicket.category}</p>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="admin-response" className="block text-sm font-medium text-gray-700">
                          Admin Response
                        </label>
                        <textarea
                          id="admin-response"
                          rows={4}
                          placeholder="Type your response to the customer..."
                          value={adminResponse}
                          onChange={(e) => setAdminResponse(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                    <button
                      onClick={() => {
                        updateTicketStatus(selectedTicket.id, "resolved")
                        setAdminResponse("")
                        closeModal()
                      }}
                      disabled={selectedTicket.status === "resolved"}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resolve Ticket
                    </button>
                    <button
                      onClick={() => {
                        updateTicketStatus(selectedTicket.id, "in-progress")
                      }}
                      disabled={selectedTicket.status === "in-progress"}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Mark In Progress
                    </button>
                  </div>
                </>
              )}
              </div>
            </div>
          </div>
        </div>
       
      )}
      
    </div>
    
  )
}
