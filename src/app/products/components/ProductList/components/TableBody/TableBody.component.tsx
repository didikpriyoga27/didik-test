import { flexRender } from "@tanstack/react-table";
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
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="text-center py-2">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBodyComponent;
