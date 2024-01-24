import { useSearchParams } from "react-router-dom";
import Select from "./Select.jsx";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const sortBy = searchParams.get("sortBy");
  
  return (
    <Select
      options={options}
      type="white"
      onChange={(e) => handleChange(e)}
      value={sortBy}
    />
  );
}

export default SortBy;
