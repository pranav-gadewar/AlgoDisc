import React, { useState } from "react";
import img1 from "../../../assets/Images/Pranav.jpg"; // Adjust the path as necessary
import img2 from "../../../assets/Images/Mayuresh.jpg"; // Adjust the path as necessary
import img3 from "../../../assets/Images/Nikita.jpg"; // Adjust the path as necessary
import img4 from "../../../assets/Images/Shruti.jpg"; // Adjust the path as necessary

function Members() {
  // Initial members data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Pranav Gadewar",
      description: "Project Developer",
      image: img1,
    },
    {
      id: 2,
      name: "Mayuresh Kahar",
      description: "Power Point Presentation",
      image: img2,
    },
    {
      id: 3,
      name: "Nikita Bachute",
      description: "Concept Explanation",
      image: img3,
    },
    {
      id: 4,
      name: "Shruti Velhal",
      description: "Concept Explanation",
      image: img4,
    },
  ]);

  // State for selected member details
  const [selectedMember, setSelectedMember] = useState(null);

  // Handle view member details
  const viewMemberDetails = (member) => {
    setSelectedMember(member);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Our Members</h1>

      {/* Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center cursor-pointer"
            onClick={() => viewMemberDetails(member)} // View details when clicked
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
          </div>
        ))}
      </div>

      {/* View Member Details Section */}
      {selectedMember && (
        <div className="mt-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Member Details</h2>
          <div className="flex flex-col items-center">
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{selectedMember.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{selectedMember.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;
