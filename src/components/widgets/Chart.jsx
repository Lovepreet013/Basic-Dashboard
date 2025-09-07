import DonutChart, { COLORS } from "./DonutChart";

const data = [
  { name: "Group A", value: 100 },
  { name: "Group B", value: 100 },
  { name: "Group C", value: 200 },
  { name: "Group D", value: 400 },
  { name: "Group D", value: 100 },
];

const Chart = () => {
  return (
    <div>
      <h3 className="mx-5 mt-5 font-bold text-gray-800">Cloud Accounts</h3>
      <div className="flex items-start">
        <DonutChart  data={data}/>

        <ul className="flex flex-col mt-5 ml-5 space-y-2">
          {data.map((entry, index) => (
            <li key={index} className="flex items-center space-x-2">
              {/* colored box */}
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="text-gray-600 text-sm font-medium">{`${entry.name} (${entry.value})`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chart;
