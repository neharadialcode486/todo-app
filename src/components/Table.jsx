import React from "react";

const Table = ({ tableList, deleteHandler, updateHandler }) => {
  return (
    <table className="w-full mt-10 ">
      <tbody>
        <tr>
          <th className="border text-start px-3 py-2">Profile</th>
          <th className="border text-start px-3 py-2">Name</th>
          <th className="border text-start px-3 py-2">Email</th>
          <th className="border text-start px-3 py-2">Course</th>
          <th className="border text-start px-3 py-2">Fees</th>
          <th className="border text-start px-3 py-2">Id</th>
          <th className="border text-start px-3 py-2">Status</th>
          <th className="border text-start px-3 py-2">Status</th>
        </tr>
        {tableList &&
          tableList.map((obj, i) => (
            <tr key={i}>
              <td className="border py-2 px-3">
                {obj.picture && (
                  <img
                    className="object-cover overflow-hidden h-[40px] w-[40px]"
                    height={40}
                    width={40}
                    src={obj.picture}
                    alt="profile"
                  />
                )}
              </td>
              <td className="border py-2 px-3"> {obj.name}</td>
              <td className="border py-2 px-3">{obj.email}</td>
              <td className="border py-2 px-3">{obj.course}</td>
              <td className="border py-2 px-3">{obj.fees}</td>
              <td className="border py-2 px-3">{obj.id}</td>
              <td className="border py-2 px-3">
                <button
                  onClick={() => updateHandler(obj.id)}
                  className="bg-yellow-600 px-6 py-2  hover:bg-opacity-90 transition-all duration-200 ease-in-out"
                >
                  Update
                </button>
              </td>
              <td className="border py-2 px-3">
                <button
                  onClick={() => deleteHandler(obj.id)}
                  className="bg-red-600 px-6 py-2 hover:bg-opacity-90 transition-all duration-200 ease-in-out "
                >
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
