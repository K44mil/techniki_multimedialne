export const tableID = {
  ID: ''
};

export const TableOptions = {
  sortFilterList: false,
  filter: false,
  print: false,
  download: false,
  selectableRows: 'none',
  viewColumns: false,
  searchPlaceholder: 'Your Custom Search Placeholder',
  onRowClick: rowdata => {
    if (rowdata !== undefined) tableID.ID = rowdata[0];
  }
};
