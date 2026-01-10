import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
export function ImageModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-full max-h-full">
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-[90vw] max-h-[80vh]"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function StatusModal({
  isOpen,
  onClose,
  onSubmit,
  currentStatus,
}) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isLoading,setIsLoading]=useState(false);
  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
        <h2 className="text-lg font-semibold">Update Driver Status</h2>

        <div className="space-y-2">
          {["Pending", "Approved", "Rejected", "Active"].map((status) => (
            <label key={status} className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value={status}
                checked={selectedStatus === status}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              <span>{status}</span>
            </label>//map((status) => (
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(selectedStatus)}
            disabled={isLoading}
            className="w-1/3 rounded-sm bg-cyan-600 text-sm text-white px-4 py-2 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-1 border-t-6 border-white rounded-full animate-spin" />
                <span className="font-semibold">wait..</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CreateDriverModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    vehicleNo: "",
    vehicleCompany: "",
    vehicleType: "",
    dlNumber: "",
    aadharNumber: "",
    bankName: "",
    accountHolder: "",
    accountNo: "",
    ifsc: "",
    upiId: "",
    password: "",
    confirmPassword: "",
    vehicleImageURI: "",
    aadharImageURI: "",
    dlImageURI: "",
    rcImageURI: "",
  });
const [isLoading,setIsLoading]=useState(false);

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFileChange = (key) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [key]: imageUrl }));
    }
  };

  const textFields = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "contact" },
    { label: "Vehicle No", key: "vehicleNo" },
    { label: "Vehicle Company", key: "vehicleCompany" },
    { label: "Vehicle Type", key: "vehicleType" },
    { label: "DL Number", key: "dlNumber" },
    { label: "Aadhar Number", key: "aadharNumber" },
    { label: "Bank Name", key: "bankName" },
    { label: "Account Holder", key: "accountHolder" },
    { label: "Account No", key: "accountNo" },
    { label: "IFSC", key: "ifsc" },
    { label: "UPI ID", key: "upiId" },
    { label: "Password", key: "password", type: "password" },
    { label: "Confirm Password", key: "confirmPassword", type: "password" },
  ];

  const imageFields = [
    { label: "Vehicle Image", key: "vehicleImageURI" },
    { label: "Aadhar Image", key: "aadharImageURI" },
    { label: "DL Image", key: "dlImageURI" },
    { label: "RC Image", key: "rcImageURI" },
  ];

  const handleCreate = () => {
    console.log({ ...formData, id: Date.now().toString(), status: "Pending" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-orange-700">
          Create Driver
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {textFields.map(({ label, key, type = "text" }) => (
            <div key={key}>
              <label className="text-orange-700">{label}</label>
              <input
                type={type}
                value={formData[key]}
                onChange={handleChange(key)}
                className="p-1 px-4 border border-orange-500 rounded w-full"
              />
            </div>
          ))}

          {imageFields.map(({ label, key }) => (
            <div key={key}>
              <label className="text-orange-700">{label}</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(key)}
                className="p-1 px-4 border border-orange-500 rounded w-full"
              />
              {formData[key] && (
                <img
                  src={formData[key]}
                  alt={key}
                  className="mt-2 h-20 border border-orange-500 object-cover"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
         <button
            onClick={handleCreate}
            disabled={isLoading}
            className="w-1/3 rounded-sm bg-cyan-600 text-sm text-white px-4 py-2 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 border-1 border-t-6 border-white rounded-full animate-spin" />
                <span className="font-semibold">wait..</span>
              </div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CreateUserModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
    avatarImageURI: "",
  });
const [isLoading,setIsLoading]=useState(false);

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFileChange = (key) => (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [key]: imageUrl }));
    }
  };

  const textFields = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Contact No", key: "contactNo" },
    { label: "Password", key: "password", type: "password" },
    { label: "Confirm Password", key: "confirmPassword", type: "password" },
  ];
  
  const imageFields = [{ label: "Avatar Image", key: "avatarImageURI" }];

  const handleCreate = () => {
    console.log({ ...formData, id: Date.now().toString() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-orange-700">Create User</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {textFields.map(({ label, key, type = "text" }) => (
            <div key={key}>
              <label className="text-orange-700">{label}</label>
              <input
                type={type}
                value={formData[key]}
                onChange={handleChange(key)}
                className="p-1 px-4 border border-orange-500 rounded w-full"
              />
            </div>
          ))}

          {imageFields.map(({ label, key }) => (
            <div key={key}>
              <label className="text-orange-700">{label}</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(key)}
                className="p-1 px-4 border border-orange-500 rounded w-full"
              />
              {formData[key] && (
                <img
                  src={formData[key]}
                  alt={key}
                  className="mt-2 h-20 object-cover border"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="w-1/3 rounded-sm bg-cyan-600 text-sm text-white px-4 py-2 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-300 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-1 border-t-6 border-white rounded-full animate-spin" />
                <span className="font-semibold">wait..</span>
              </div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DriverControlModal({ isOpen, onClose, driverEntity }) {
  const navigate = useNavigate();

  if (!isOpen || !driverEntity) return null;
  const handleDelete = (driverId) => {
    console.log("Delete Driver:", driverId);
    // Perform actual delete logic here (e.g., API call)
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-orange-700">
          Driver: {driverEntity.name}
        </h2>

        <div className="space-y-3">
          <button
            className="w-full border border-teal-600 text-teal-600 py-2 rounded hover:bg-teal-50 transition duration-200"
            onClick={() => navigate("/driverjourney")}
          >
            View Journey
          </button>

          <button
            className="w-full border border-cyan-700 text-cyan-700 py-2 rounded hover:bg-cyan-50 transition duration-200"
            // onClick={() => navigate(`/driver/${driverEntity.id}/orders`)}
          >
            Edit Driver
          </button>

          <button
            className="w-full border border-rose-600 text-rose-600 py-2 rounded hover:bg-rose-50 transition duration-200"
            onClick={() => {
              handleDelete(driverEntity.id);
              onClose();
            }}
          >
            Delete Driver
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function JourneyControlModal({ isOpen, onClose, journeyEntity }) {
  const navigate = useNavigate();

  if (!isOpen || !journeyEntity) return null;
  const handleDelete = (driverId) => {
    console.log("Delete Driver:", driverId);
    // Perform actual delete logic here (e.g., API call)
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-orange-700">
          Journey Id: {journeyEntity.id}
        </h2>

        <div className="space-y-3">
          <button
            className="w-full border border-teal-600 text-teal-600 py-2 rounded hover:bg-teal-50 transition duration-200"
            onClick={() => navigate("/journeyorders")}
          >
            View All Orders
          </button>

          <button
            className="w-full border border-cyan-700 text-cyan-700 py-2 rounded hover:bg-cyan-50 transition duration-200"
            onClick={() => navigate(`/driver/${journeyEntity.id}/orders`)}
          >
            Edit Journey
          </button>

          <button
            className="w-full border border-rose-600 text-rose-600 py-2 rounded hover:bg-rose-50 transition duration-200"
            onClick={() => {
              handleDelete(journeyEntity.id);
              onClose();
            }}
          >
            Delete Journey
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
