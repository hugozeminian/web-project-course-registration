import React from "react";
import TitlePage from "../../components/title-page/TitlePage.component";
import TableStudentList from "../../components/table-student-list/TableStudentList.component";

const AdmStudentList = () => {
  return (
    <>
      <TitlePage title="Student List" />
      <TableStudentList />
    </>
  );
};

export default AdmStudentList;
