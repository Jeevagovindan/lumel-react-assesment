import React, { useState } from "react";

const ParentRow = ({
  item,
  parentId,
  handleTableDataUpdate,
  isChild = false,
}) => {
  const [inputVal, setInputVal] = useState();
  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setInputVal(value > 0 ? parseInt(value) : 0);
  };

  const handleAllocationPercentage = () => {
    const currentValue = item?.value;
    const newValue = (currentValue * inputVal) / 100;
    const finalValue = currentValue + newValue;
    handleTableDataUpdate(item?.id, parentId, finalValue);
  };

  const handleAllocationValue = () => {
    handleTableDataUpdate(item?.id, parentId, inputVal);
  };

  const variance = () => {
    if (item?.previousValue > 0) {
      return (((item?.value - item?.previousValue) / item?.previousValue) * 100).toFixed(2);
    }
    return 0;
  };

  return (
    <tr key={item?.id}>
      <td>{isChild ? "-- " + item?.label : item?.label}</td>
      <td>{item?.value}</td>
      <td>
        {isChild && (
          <input
            type="number"
            value={inputVal}
            onChange={(e) => handleInputChange(e)}
          />
        )}
      </td>
      <td>
        {isChild && (
          <button onClick={handleAllocationPercentage}>Allocate %</button>
        )}
      </td>
      <td>
        {isChild && (
          <button onClick={handleAllocationValue}>Allocate Value</button>
        )}
      </td>
      <td>{variance() + "%"}</td>
    </tr>
  );
};

export default ParentRow;
