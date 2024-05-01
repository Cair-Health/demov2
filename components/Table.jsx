import React from 'react';
import Image from "next/image";
import eye from '../public/eye-open.svg';
import trash from '../public/trash-03.svg';
import graph from '../public/line-chart-up-01.svg';

const Table = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <table className="divide-y w-5/6 table-auto rounded-xl overflow-hidden divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Report Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              File Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap"></td>
            <td className="px-6 py-4 whitespace-nowrap">
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold">
                
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold">
            <button className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2 mr-4">
                <Image src={trash} height="auto" width="auto" alt="trash" />
              </button>
              <button className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2 mr-4">
                <Image src={eye} height="auto" width="auto" alt="view" />
              </button>
              <button className="border-2 border-gray-200 rounded-xl bg-gray-100 p-2 ">
                <Image src={graph} height="auto" width="auto" alt="graph" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
