import React, { Fragment, useState } from "react";
import { headers, initialData } from "./mockData";
import ParentRow from "./components/ParentRow";

const App = () => {
  const [tableData, setTableData] = useState(initialData);
  const handleTableDataUpdate = (childId, parentId, newValue) => {
    console.log(childId, parentId, newValue);
    const updatedRows = tableData?.map((row) => {
      if (row?.id === parentId) {
        const updatedChildren = row?.children?.map((child) =>
          child?.id === childId
            ? { ...child, value: newValue, previousValue: child?.value }
            : child
        );
        const updatedValue = updatedChildren.reduce(
          (sum, child) => sum + child.value,
          0
        );
        return {
          ...row,
          children: updatedChildren,
          value: updatedValue,
          previousValue: row?.value,
        };
      }
      return row;
    });
    setTableData(updatedRows);
  };
  return (
    <div className="main-container">
      <table>
        <thead>
          <tr>
            {headers?.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row) => (
            <Fragment key={row?.id}>
              <ParentRow item={row} />
              {row?.children?.map((child) => (
                <ParentRow
                  item={child}
                  parentId={row?.id}
                  handleTableDataUpdate={handleTableDataUpdate}
                  isChild
                />
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
