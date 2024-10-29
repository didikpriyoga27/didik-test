import { flexRender } from "@tanstack/react-table";
import { ITableBodyComponentProps } from "./type";

/**
 * A component that renders the table body.
 *
 * It renders a `<tbody>` element that contains table rows, each of which
 * contains table cells. The table cells are rendered using the `cell`
 * property of the column definition, which is passed to the `flexRender`
 * function from `@tanstack/react-table`.
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
    <tbody className="border-t border-solid border-background">
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="border-b border-solid border-background last:border-b-0"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="border-r border-solid border-background text-center p-2 last:border-r-0"
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            className="text-center p-4"
            colSpan={table.getVisibleLeafColumns().length}
          >
            <span className="ml-2">No products found</span>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBodyComponent;
