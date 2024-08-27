interface TodoElementProps {
  task: string;
  priority: Priority;
  done: boolean;
  onToggle: () => void;
}

export default function TodoElement({ task, priority, done, onToggle }: TodoElementProps) {
  const priorityStyles = getPriorityStyles(priority);

  return (
    <li className="flex items-center py-4 first:pt-0 last:pb-0">
      <input
        type="checkbox"
        className="mr-2"
        checked={done}
        onChange={onToggle}
      />
      <div className="flex flex-col">
        <h3 className={`font-medium ${done ? 'line-through text-gray-400' : ''}`}>{task}</h3>
        <h2 className={`ml-2 text-sm ${priorityStyles}`}>{priority}</h2>
      </div>
    </li>
  );
}

function getPriorityStyles(priority: Priority) {
  switch (priority) {
    case "High":
      return "text-red-600 font-bold";
    case "Medium":
      return "text-yellow-600 font-semibold";
    case "Low":
      return "text-green-600";
    default:
      return "";
  }
}
