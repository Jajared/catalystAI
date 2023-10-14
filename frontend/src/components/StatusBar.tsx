export default function StatusBar({ percentage }: { percentage: number }) {
  let colorClass = "";

  if (percentage < 33) {
    colorClass = "bg-green-500"; // Use red color for the first third
  } else if (percentage < 66) {
    colorClass = "bg-yellow-500"; // Use yellow color for the second third
  } else {
    colorClass = "bg-red-500"; // Use green color for the last third
  }
  return (
    <div className="w-full h-4 overflow-hidden bg-gray-200 rounded">
      <div className={`px-1 text-xs text-center text-slate-800 ${colorClass}`} style={{ width: `${percentage}%` }}>
        {percentage}%
      </div>
    </div>
  );
}
