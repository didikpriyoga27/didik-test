import { flexRender } from "@tanstack/react-table";
import Image from "next/image";
import defaultImage from "../../../../../../../public/default.png";
import { ITableBodyComponentProps } from "./type";

/**
 * A component that renders the table body.
 *
 * It renders a `<tbody>` element that contains table rows, each of which
 * contains table cells. The table cells are rendered using the `cell` property
 * of the column definition, which is passed to the `flexRender` function from
 * `@tanstack/react-table`.
 *
 * @param {ITableBodyComponentProps} props The props object, which contains a
 * `table` property that is an instance of `Table` from `@tanstack/react-table`.
 *
 * @returns {JSX.Element} A JSX element representing the table body.
 */
const TableBodyComponent = ({
  table,
}: ITableBodyComponentProps): JSX.Element => {
  return (
    <tbody className="border-t border-b border-solid border-background">
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="border-r border-solid border-background text-center py-2 last:border-r-0"
            >
              {cell.column.id === "images" ? (
                <div className="flex items-center justify-center">
                  <Image
                    src={defaultImage}
                    alt={"default image"}
                    className="w-16 h-16 object-cover rounded-md"
                    width={64}
                    height={64}
                  />
                </div>
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBodyComponent;
