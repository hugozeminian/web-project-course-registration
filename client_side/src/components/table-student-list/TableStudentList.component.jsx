import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { getStudentList, getStudentsList } from "../../util/api/api";
import { Container } from "@mui/system";
import { getFormattedDateFromDB } from "../../util/general-functions/generalFunctions";

const TableStudentList = () => {
  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });

  const [searchBtn, setSearchBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [studentsList, setStudentsList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsListData = await getStudentsList();
        setStudentsList(studentsListData.map(student => ({
          ...student,
          DateOfBirth: getFormattedDateFromDB(student.DateOfBirth),
        })));
      } catch (error) {
        console.error("Error fetching data on the component:", error.message);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "FirstName",
      label: "First Name",
      options: {},
    },
    {
      name: "LastName",
      label: "Last Name",
      options: {},
    },
    {
      name: "Email",
      label: "E-mail",
      options: {},
    },
    {
      name: "Phone",
      label: "Phone",
      options: { setCellProps: () => ({ style: { width: "160px" } }) },
    },
    {
      name: "DateOfBirth",
      label: "Birthday",
      options: { setCellProps: () => ({ style: { width: "110px" } }) },
    },
    {
      name: "ProgramName",
      label: "Program Name",
      options: {},
    },
    {
      name: "ProgramType",
      label: "Program Type",
      options: {},
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

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <Container>
          <MUIDataTable title={"BVC Students"} data={studentsList} columns={columns} options={options} />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default TableStudentList;
