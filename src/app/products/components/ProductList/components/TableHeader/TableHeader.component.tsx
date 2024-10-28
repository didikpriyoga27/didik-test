import { flexRender } from "@tanstack/react-table";
import { ITableHeaderComponentProps } from "./type";

/**
 * A component that renders the table header.
 *
 * It renders a `<thead>` element that contains table rows, each of which
 * contains table cells. The table cells are rendered using the `header`
 * property of the column definition, which is passed to the `flexRender`
 * function from `@tanstack/react-table`.
 *
 * @param {ITableHeaderComponentProps} props The props object, which contains a
 * `table` property that is an instance of `Table` from `@tanstack/react-table`.
 *
 * @returns {JSX.Element} A JSX element representing the table header.
 */
const TableHeaderComponent = ({
  table,
}: ITableHeaderComponentProps): JSX.Element => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} className="py-2">
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeaderComponent;
