import React, { useState } from "react";

import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { JourneyControlModal } from "../component/reusableComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthErrorMessage, selectAuthloader } from "../redux/selector";
function AllJourney() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [controlModalOpen, setControlModalOpen] = useState(false);
  const [selectedJourney ,setSelectedJourney]=useState(false);
   const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthloader);
  const errorMessage = useSelector(selectAuthErrorMessage);
  
  const tableHeaders = [
    { key: "id", label: "ID" },
    { key: "sourceAddress", label: "Source Address" },
    { key: "destinationAddress", label: "Destination Address" },
    { key: "sourceCoordinate", label: "Source Coordinate" },
    { key: "destinationCoordinate", label: "Destination Coordinate" },
    { key: "departureTime", label: "Departure Time" },
    { key: "arrivalTime", label: "Arrival Time" },
    { key: "weightCapacity", label: "weight Capacity" },
    { key: "avlLength", label: "Available Length" },
    { key: "avlWidth", label: "Available Width" },
    { key: "avlHeight", label: "Available Height" },
    { key: "status", label: "Status" },
    { key: "control", label: "control" },
  ];

  const [tableData, setTableData] = useState([
    {
      id: "1",
      sourceAddress: "pune balewadi maharashtra",
      destinationAddress: "pune mahalunge balewadi maharashtra",
      sourceCoordinate: "13.88,18.177",
      destinationCoordinate: "98.77,18.77",
      departureTime: "10/07/2025 1:00PM",
      arrivalTime: "12/08/2025 2:00 AM",
      weightCapacity: "500 Kg",
      avlLength: "3m",
      avlWidth: "5m",
      avlHeight: "4m",
      status: "Cancelled",
    },
  ]);

  const handleControlClick = (data) => {
    setSelectedJourney(data);
    setControlModalOpen(true);
  
  };

  return (
    <div className="w-full h-screen flex flex-col">
        {isLoading?(<div className="flex-1 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-orange-600 font-medium text-lg">
              Loading Journeys...
            </div>
          </div>
        </div>):( <>
      <div className="bg-orange-100 border-b border-orange-500 h-14 flex items-center  px-4">
        <input
          type="text"
          placeholder="Search Journey by id or Address ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-1 rounded-md px-4 border border-orange-400 bg-white w-full max-w-md"
        />
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
                    (row.id && row.id.toLowerCase().includes(s)) ||
                    (row.sourceAddress &&
                      row.sourceAddress.toLowerCase().includes(s)) ||
                    (row.destinationAddress &&
                      row.destinationAddress.toLowerCase().includes(s))
                  );
                })
                .map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-100">
                    {tableHeaders.map((header, cellIndex) => {
                      const value = row[header.key];
                      const isControlColumn = header.key === "control";
                      return (
                        <td
                          key={cellIndex}
                          className="p-2 border-b border-gray-200 whitespace-nowrap"
                        >
                          {isControlColumn ? (
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
      <JourneyControlModal
        isOpen={controlModalOpen}
        onClose={() => setControlModalOpen(false)}
        journeyEntity={selectedJourney}
      /></>)}
    </div>
  );
}

export default AllJourney;
