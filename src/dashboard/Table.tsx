import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { TriangleIcon } from '@tastiest-io/tastiest-icons';
import clsx from 'clsx';
import lodash, { isUndefined } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import {
  HeaderGroup,
  TableOptions,
  useFlexLayout,
  useSortBy,
  useTable,
} from 'react-table';
import { Button, Input } from '..';

export interface TableProps {
  label?: string;
  columns: any[];
  data: any[];

  /** Entries in each page */
  paginateInterval?: number;
  leftAlignedColumns?: number[];

  // Dropdown accordian Element for each row (optional)
  rowAccordianElement?: React.ComponentType<{ id: string; row: any }>;

  noDataLabel?: string;
  isLoadingInitialData?: boolean;

  // Describes how data is filtered on search
  searchFunction?: (query: string, data: any[]) => any[];

  // Update data example given here
  // https://react-table.tanstack.com/docs/examples/editable-data
  updateData?: (
    value: any | any[],
    rowIndex: number,
    columnId: string | number
  ) => void;
}

export type TableColumn = {
  // Required by react-table
  Header: string;
  accessor: string;

  // Additional
  bold?: boolean;
}[];

export function Table(props: TableProps) {
  const {
    columns,
    data = [],
    label,
    noDataLabel = 'No Data',
    updateData = null,
    isLoadingInitialData = false,
    searchFunction = () => null,
    paginateInterval,
    leftAlignedColumns = [0],
    rowAccordianElement: RowAccordianElement,
  } = props;

  // Used for Accordian Element
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(data);

  const updateSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.length) {
      setFilteredData(data);
      return;
    }

    setFilteredData(searchFunction(query, data) ?? []);
  };

  // Set initial data for the table in the case that default useState value fails
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      updateData,
      data: filteredData,
    } as TableOptions<any>,
    useSortBy,
    useFlexLayout
  );

  console.log('Table ➡️ getTablePr5ops:', getTableProps());
  console.log('Table ➡️ headerGroups:', headerGroups);
  console.log('Table ➡️ rows:', rows);

  const [page, setPage] = useState(1);
  const numPages = useMemo(
    () => (paginateInterval ? Math.ceil(rows.length / paginateInterval) : 1),
    [rows]
  );

  const pageRows = useMemo(() => {
    if (paginateInterval) {
      return rows.slice(
        Math.floor((page - 1) * paginateInterval),
        Math.floor(page * paginateInterval)
      );
    }

    return rows;
  }, [page, rows, filteredData]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between w-full mb-2">
        {label && <div className="pr-4 text-xl font-somatic">{label}</div>}
        <div style={{ width: '300px' }} className="">
          <Input
            size="small"
            color="neutral"
            variant={'solid'}
            value={searchQuery ?? ''}
            onValueChange={updateSearch}
            suffix={
              <SearchOutlined className="cursor-default select-none text-gray-300" />
            }
          />
        </div>
      </div>

      <div
        style={{ maxWidth: '100%' }}
        className={clsx(
          'w-full pb-6 overflow-x-auto bg-white rounded-md',
          RowAccordianElement ? 'pl-8 pr-4' : 'px-6'
        )}
      >
        {data.length > 0 && (
          <table className="w-full" {...getTableProps()}>
            <TableHead
              headerGroups={headerGroups}
              leftAlignedColumns={leftAlignedColumns}
            />

            <tbody {...getTableBodyProps()}>
              {pageRows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="flex flex-col border-t border-border-gray-300"
                  >
                    <div className="relative flex w-full">
                      {row.cells.map((cell, j) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={clsx(
                              'flex items-center',
                              !leftAlignedColumns.some((c) => c === j) &&
                                'text-center justify-center'
                            )}
                          >
                            <div>
                              <div className="py-2 pr-2 overflow-x-hidden whitespace-nowrap">
                                {cell.render('Cell', { ...cell })}
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {RowAccordianElement && (
                        <div
                          onClick={() =>
                            setExpandedRow(
                              expandedRow === row.id ? null : row.id
                            )
                          }
                          className="absolute left-0 flex items-center h-full px-2 py-2 -ml-6 text-gray-300 cursor-pointer hover:text-gray-500"
                        >
                          <TriangleIcon
                            className={clsx(
                              'w-2 duration-200 transform fill-current',
                              expandedRow === row.id
                                ? '-rotate-90'
                                : 'rotate-90'
                            )}
                          />
                        </div>
                      )}
                    </div>

                    {RowAccordianElement && expandedRow === row.id && (
                      <div className="pb-3">
                        <RowAccordianElement id={row.id} row={row.original} />
                      </div>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Loading and no-data states */}
        {data?.length ? null : (
          <div className="flex items-center justify-center h-32">
            {isLoadingInitialData ? (
              <LoadingOutlined className="text-4xl fill-current text-primary" />
            ) : (
              <p className="text-lg">{noDataLabel}</p>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {paginateInterval && rows.length > paginateInterval ? (
        <TablePagination page={page} numPages={numPages} setPage={setPage} />
      ) : null}
    </div>
  );
}

interface TableHeadProps {
  headerGroups: HeaderGroup<object>[];
  leftAlignedColumns: number[];
}

const TableHead = (props: TableHeadProps) => {
  const { headerGroups, leftAlignedColumns } = props;

  return (
    <thead>
      {headerGroups.map((headerGroup, i) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, j) => (
            <th
              {...column.getHeaderProps((column as any).getSortByToggleProps())}
              className={clsx(
                'pt-4 pb-2 text-sm text-gray-600 opacity-75 font-normal select-none whitespace-nowrap'
              )}
            >
              <div className="flex items-center pr-2 text-center">
                <p
                  className={clsx(
                    !isUndefined(leftAlignedColumns.find((n) => n === i))
                      ? 'text-left'
                      : 'text-center',
                    'w-full font-medium'
                  )}
                >
                  {column.render('Header')}
                </p>
                <span>
                  {(column as any).isSorted ? (
                    <TriangleIcon
                      className={clsx(
                        'h-2 ml-2 duration-150 transform fill-current text-gray-400',
                        (column as any).isSortedDesc
                          ? 'rotate-90'
                          : '-rotate-90'
                      )}
                    />
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

interface TablePaginationProps {
  page: number;
  numPages: number;
  setPage: (value: number) => void;
}

const TablePagination = (props: TablePaginationProps) => {
  const { page, numPages, setPage } = props;

  // The numbers to display for the pagination buttons. Eg < 3 4 5 6 7 >
  const pageDisplayNumbers = useMemo(() => {
    // Five gives us the current page in the middle and two on each side.
    // Must be an odd number
    const cardinality = Math.min(numPages, 5);

    // Variance from the center.
    // Eg for a cardinality of 5, the distance from center to the edge is 2.
    const variance = Math.floor(cardinality / 2);

    // The center number. Eg 1 2 3 4 5
    // __________________________^____
    const centerMin = Math.max(1, 1 + variance);
    const centerMax = Math.max(1, numPages - variance);

    let center: number = centerMin;
    if (page > centerMin && page < centerMax) center = page;
    if (page <= centerMin) center = centerMin;
    if (page >= centerMax) center = centerMax;

    const start = center - variance;
    const end = center + variance + 1;

    return lodash.range(start, end);
  }, [page, numPages]);

  return (
    <div className="flex justify-end w-full gap-1 mt-2 font-mono">
      <Button
        size="small"
        color="light"
        onClick={() => (page <= 1 ? null : setPage(page - 1))}
        disabled={page <= 1}
      >
        {'<'}
      </Button>

      {pageDisplayNumbers.map((p) => (
        <Button
          key={p}
          size="tiny"
          color={p === page ? 'secondary' : 'light'}
          onClick={() => setPage(p)}
        >
          {p}
        </Button>
      ))}

      <Button
        size="small"
        color="light"
        onClick={() => (page >= numPages ? null : setPage(page + 1))}
        disabled={page >= numPages}
      >
        {'>'}
      </Button>
    </div>
  );
};
