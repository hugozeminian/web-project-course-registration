import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { getStudentsForms } from "../../util/api/api";
import { Container } from "@mui/system";
import { getFormattedDateFromDB } from "../../util/general-functions/generalFunctions";

const TableContactList = () => {
  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
  });

  const [searchBtn, setSearchBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [studentsForms, setStudentsForms] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsFormsData = await getStudentsForms();
        setStudentsForms(studentsFormsData.map(student => ({
          ...student,
          Date: getFormattedDateFromDB(student.Date),
        })));
      } catch (error) {
        console.error("Error fetching data on the component:", error.message);
      }
    };
    
    fetchData();
  }, []);
 
  const columns = [
    {
      name: "Name",
      label: "Name",
      options: {
        setCellProps: () => ({ style: { width: "140px" } }),
      },
    },
    {
      name: "Email",
      label: "Email",
      options: {
        setCellProps: () => ({ style: { width: "160px" } }),
      },
    },
    {
      name: "Date",
      label: "Date",
      options: {
        setCellProps: () => ({ style: { width: "200px" } }),
      },
    },
    {
      name: "Message",
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


  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <Container>
          <MUIDataTable
            title={"BVC Form"}
            data={studentsForms}
            columns={columns}
            options={options}
          />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default TableContactList;
