import React from 'react';

const RegistryScan = () => {
  // Define the vulnerability data.
  // The widths of the colored bars will be calculated from these values.
  const vulnerabilities = [
    { name: 'Critical', count: 9, color: 'bg-red-500', legendColor: 'bg-red-500' },
    { name: 'High', count: 150, color: 'bg-orange-500', legendColor: 'bg-orange-500' },
    { name: 'Medium', count: 600, color: 'bg-yellow-400', legendColor: 'bg-yellow-400' },
    { name: 'Low', count: 711, color: 'bg-gray-400', legendColor: 'bg-gray-400' }, // Adjusted value to reach 1470
  ];

  // Calculate the total number of vulnerabilities
  const totalVulnerabilities = vulnerabilities.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="flex flex-col p-6 space-y-4 bg-white rounded-lg ">
      {/* Image Risk Assessment Section */}
      <div className="flex flex-col space-y-2">
        <h3 className=" font-bold text-gray-800">
          Image Risk Assessment
        </h3>
        <p className="text-4xl font-extrabold text-gray-800">
          {totalVulnerabilities} <span className="text-lg font-normal text-gray-500 ml-2">Total Vulnerabilities</span>
        </p>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="flex w-full h-4 rounded-full overflow-hidden">
        {vulnerabilities.map((item, index) => {
          const widthPercentage = (item.count / totalVulnerabilities) * 100;
          return (
            <div
              key={item.name}
              className={`${item.color} h-full`}
              style={{ width: `${widthPercentage}%` }}
            ></div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
        {vulnerabilities.map((item) => (
          <div key={item.name} className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${item.legendColor}`}></span>
            <span className="text-gray-600 text-sm font-medium">
              {item.name} ({item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistryScan;