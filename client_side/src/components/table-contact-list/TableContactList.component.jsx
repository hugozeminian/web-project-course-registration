import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { getContactList } from "../../util/api/api";
import { Container } from "@mui/system";

const TableContactList = () => {
  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });

  const [searchBtn, setSearchBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        setCellProps: () => ({ style: { width: "140px" } }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        setCellProps: () => ({ style: { width: "160px" } }),
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        setCellProps: () => ({ style: { width: "200px" } }),
      },
    },
    {
      name: "message",
      label: "Message",
      options: {
        setCellProps: () => ({ style: { width: "500px" } }),
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

  const data = getContactList();

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <Container>
          <MUIDataTable
            title={"BVC Form"}
            data={data}
            columns={columns}
            options={options}
          />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default TableContactList;
