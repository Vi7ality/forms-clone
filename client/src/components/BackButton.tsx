import { useNavigate } from "react-router-dom";
import { navBack } from "../utils/navBack";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navBack(navigate)}
      className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition"
    >
      ← Back
    </button>
  );
};

export default BackButton;
