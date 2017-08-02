import React from "react";

export default ({ header, data }) => {
  return (
    <table className="table table-hover table-stripped table-bordered small">
      <thead>
        <tr>
          {header.map(
            item =>
              item.show
                ? <th key={item.id}>
                    {item.title}
                  </th>
                : ""
          )}
        </tr>
      </thead>
      <tbody>
        {data.map(item =>
          <tr key={item.id}>
            <td>
              {item.id}
            </td>
            <td>
              {item.nomination}
            </td>
            <td>
              {item.type}
            </td>
            <td>
              {item.lesson_1}
            </td>
            <td>
              {item.lesson_5}
            </td>
            <td>
              {item.lesson_8}
            </td>
            <td>
              {item.duration}
            </td>
            <td>
              {item.until}
            </td>
            {item.actions
              ? <td className="text-center">
                  <button
                    className="btn btn-warning btn-xs"
                    style={{ marginRight: "2px" }}
                  >
                    <i className="fa fa-pencil" />
                  </button>
                  <button className="btn btn-danger btn-xs">
                    <i className="fa fa-trash" />
                  </button>
                </td>
              : ""}
          </tr>
        )}
      </tbody>
    </table>
  );
};
