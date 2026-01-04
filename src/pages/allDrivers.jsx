import React, { useState } from "react";
import {
  CreateDriverModal,
  DriverControlModal,
  ImageModal,
  StatusModal,
} from "../component/reusableComponent";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthErrorMessage, selectAuthloader } from "../redux/selector";

function AllDrivers() {
  const [search, setSearch] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [createDriverModalOpen, setCreateDriverModalOpen] = useState(false);
  const [controlModalOpen, setControlModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthloader);
  const errorMessage = useSelector(selectAuthErrorMessage);

  const tableHeaders = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email Id" },
    { key: "contact", label: "Contact No." },
    { key: "vehicleNo", label: "Vehicle no." },
    { key: "vehicleCompany", label: "Vehicle Company" },
    { key: "vehicleType", label: "Vehicle Type" },
    { key: "dlNumber", label: "DL Number" },
    { key: "aadharNumber", label: "Aadhar Number" },
    { key: "bankName", label: "Bank Name" },
    { key: "accountHolder", label: "Account Holder Name" },
    { key: "accountNo", label: "Account No." },
    { key: "ifsc", label: "IFSC Code" },
    { key: "upiId", label: "UPI Id" },
    { key: "vehicleImageURI", label: "Vehicle ImageURI" },
    { key: "aadharImageURI", label: "Aadhar ImageURI" },
    { key: "dlImageURI", label: "DL ImageURI" },
    { key: "rcImageURI", label: "RC ImageURI" },
    { key: "status", label: "Status" },
    { key: "control", label: "control" },
  ];

  const [tableData, setTableData] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      contact: "9876543210",
      vehicleNo: "MH12AB1234",
      vehicleCompany: "Tata",
      vehicleType: "Truck",
      dlNumber: "DL123456789",
      aadharNumber: "AADHAR123456",
      bankName: "HDFC",
      accountHolder: "John D.",
      accountNo: "1234567890",
      ifsc: "HDFC0001234",
      upiId: "john@upi",
      vehicleImageURI:
        "https://images.unsplash.com/photo-1729457046390-0eb8571eb1d4?w=600",
      aadharImageURI:
        "https://unsplash.com/photos/a-purple-vase-with-two-purple-flowers-in-it-BOa6aiwEMrc",
      dlImageURI:
        "https://images.unsplash.com/photo-1729457046390-0eb8571eb1d4?w=600",
      rcImageURI:
        "https://images.unsplash.com/photo-1733690577845-4f4641a456b3?w=600",
      status: "Pending",
    },
  ]);
  const handleControlClick = (data) => {
    setSelectedDriver(data);
    setControlModalOpen(true);
    // console.log("driver =",data)
  };

  const handleImageClick = (uri) => {
    setSelectedImage(uri);
    setImageModalOpen(true);
  };

  const openStatusModal = (index) => {
    setSelectedRowIndex(index);
    setStatusModalOpen(true);
  };

  const updateStatus = (newStatus) => {
    const updated = [...tableData];
    updated[selectedRowIndex].status = newStatus;
    setTableData(updated);
    setStatusModalOpen(false);
  };

  return (
    <div className="w-full h-screen flex flex-col">
         {isLoading?(<div className="flex-1 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-orange-600 font-medium text-lg">
              Loading Drivers...
            </div>
          </div>
        </div>):(
          <>
      <div className="bg-orange-100 border-b border-orange-500 h-14 flex items-center justify-around px-4">
        <input
          type="text"
          placeholder="Search Driver by Name, Email or Contact..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-1 rounded-md px-4 border border-orange-400 bg-white w-full max-w-md"
        />
        <button
          onClick={() => setCreateDriverModalOpen(true)}
          className="bg-cyan-800 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded-sm shadow-sm transition-all duration-200"
        >
          Create Driver
        </button>
      </div>
      <div className="h-full overflow-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-300 text-left">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="p-2 border-b border-gray-400 whitespace-nowrap"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData
                .filter((row) => {
                  if (!search.trim()) return true; // Show all if search empty
                  const s = search.toLowerCase();
                  return (
                    (row.name && row.name.toLowerCase().includes(s)) ||
                    (row.email && row.email.toLowerCase().includes(s)) ||
                    (row.contact && row.contact.toLowerCase().includes(s))
                  );
                })
                .map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-100">
                    {tableHeaders.map((header, cellIndex) => {
                      const value = row[header.key];
                      const isImageColumn = header.key
                        .toLowerCase()
                        .includes("imageuri");
                      const isStatusColumn = header.key === "status";
                      const isControlColumn = header.key === "control";

                      return (
                        <td
                          key={cellIndex}
                          className="p-2 border-b border-gray-200 whitespace-nowrap"
                        >
                          {isImageColumn ? (
                            <button
                              onClick={() => handleImageClick(value)}
                              className="bg-teal-500 hover:bg-teal-600 text-white text-sm px-3 py-1 rounded-sm shadow-sm transition-all duration-200"
                            >
                              View Image
                            </button>
                          ) : isStatusColumn ? (
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  value === "Approved"
                                    ? "bg-green-200 text-green-800"
                                    : value === "Pending"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : value === "Rejected"
                                    ? "bg-red-200 text-red-800"
                                    : "bg-blue-200 text-blue-800"
                                }`}
                              >
                                {value}
                              </span>
                              <button
                                onClick={() => openStatusModal(rowIndex)}
                                className="text-gray-600 hover:text-blue-600"
                              >
                                <FaEdit />
                              </button>
                            </div>
                          ) : isControlColumn ? (
                            <button
                              onClick={() => handleControlClick(row)}
                              className="bg-orange-600 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded-sm shadow-sm transition-all duration-200"
                            >
                              Control
                            </button>
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        imageUrl={selectedImage}
      />

      <StatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onSubmit={updateStatus}
        currentStatus={
          selectedRowIndex !== null ? tableData[selectedRowIndex].status : ""
        }
      />
      <CreateDriverModal
        isOpen={createDriverModalOpen}
        onClose={() => setCreateDriverModalOpen(false)}
      />
      <DriverControlModal
        isOpen={controlModalOpen}
        onClose={() => setControlModalOpen(false)}
        driverEntity={selectedDriver}
      /></>)}
    </div>
  );
}

export default AllDrivers;
