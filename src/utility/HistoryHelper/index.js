import { useLocation, useNavigate } from "react-router-dom";

const NavigateSetter = () => {
  History.navigate = useNavigate();
  History.location = useLocation();

  return null;
};

export default NavigateSetter;
