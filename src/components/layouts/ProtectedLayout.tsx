import { useOutlet } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
  const outlet = useOutlet();

  return <div className="h-screen">{outlet}</div>;
};

export default ProtectedLayout;
