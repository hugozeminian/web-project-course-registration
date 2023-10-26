import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { getStudentList } from "../../util/api/api";

const TableStudentList = () => {
  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });

  const [searchBtn, setSearchBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const columns = [
    {
      name: "first_name",
      label: "First Name",
      options: {
        setCellProps: () => ({ style: { width: "140px" } }),
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        setCellProps: () => ({ style: { width: "140px" } }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        setCellProps: () => ({ style: { width: "260px" } }),
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {},
    },
    {
      name: "date_of_birth",
      label: "Birthday",
      options: {},
    },
    {
      name: "department",
      label: "Department",
      options: {},
    },
    {
      name: "program",
      label: "Program",
      options: {
        setCellProps: () => ({ style: { width: "260px" } }),
      },
    },
  ];

  const options = {
    search: searchBtn,
    download: false,
    print: false,
    viewColumns: true,
    filter: filterBtn,
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    customToolbarSelect: () => {},
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

  const data = getStudentList();

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={""}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default TableStudentList;
