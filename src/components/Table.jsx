import React from "react";

const Table = ({ tableList }) => {
  return (
    <table className="w-full mt-10 ">
      <tbody>
        <tr>
          <th className="border text-start px-3 py-2">Name</th>
          <th className="border text-start px-3 py-2">Email</th>
          <th className="border text-start px-3 py-2">Course</th>
          <th className="border text-start px-3 py-2">Fees</th>
          <th className="border text-start px-3 py-2"></th>
          <th className="border text-start px-3 py-2"></th>
        </tr>
        {tableList &&
          tableList.map((obj, i) => (
            <tr>
              <td className="border py-2 px-3"> {obj.Name}</td>
              <td className="border py-2 px-3">{obj.Email}</td>
              <td className="border py-2 px-3">{obj.Course}</td>
              <td className="border py-2 px-3">{obj.Fees}</td>
              <td className="border py-2 px-3">
                <button className="bg-yellow-600 px-6 py-2  hover:bg-opacity-90 transition-all duration-200 ease-in-out">
                  Update
                </button>
              </td>
              <td className="border py-2 px-3">
                <button className="bg-red-600 px-6 py-2 hover:bg-opacity-90 transition-all duration-200 ease-in-out ">
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
