import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

function AdminCourseReportsList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/get-reportedcourses`)
      .then((response) => response.json())
      .then((data) => {
        const newRows = data?.courses.map((course: any, index: number) => {
          const reports = course.reports.map((report: any) => ({
            reason: report.reason,
            username: report.user?.name,
          }));
          reports.forEach((report: any) => {
            console.log("reason", report.reason);
          });
          return {
            id: index + 1,
            ...course,
            createdAt: format(course.createdAt),
            reports,
          };
        });
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleViewDetails = (id: String) => {
    navigate(`/admin/course-details/${id}`);
    console.log("view Details", id);
  };

  //   const getRowHeight = (params: any) => {
  //     if (!params.row) return 52; // default row height
  //     const { reports } = params.row;
  //     const lineHeight = 20; // Approximate line height
  //     const padding = 20; // Padding for the cell
  //     const linesPerReport = 2; // Assuming each report has 2 lines
  //     const totalLines = reports.length * linesPerReport;
  //     return lineHeight * totalLines + padding;
  //   };

  const coloumns = [
    { field: "id", headerName: "S.No.", flex: 0.2 },
    { field: "name", headerName: "Title", flex: 0.5 },
    { field: "description", headerName: "Course Description", flex: 0.3 },
    { field: "price", headerName: "Price" },
    { field: "ratings", headerName: "Ratings" },
    { field: "purchased", headerName: "Purchased" },
    { field: "createdAt", headerName: "Created At", flex: 0.3 },
    {
      field: "reportcount",
      headerName: "Report Count",
      flex: 0.2,
      renderCell: (params: any) => {
        const { reports } = params.row;
        return <div>{reports.length}</div>;
      },
    },
    {
      field: "reports",
      headerName: "Reason",
      flex: 0.5,
      renderCell: (params: any) => {
        const { reports } = params.row;
        return (
          <div>
            {reports.map((report: any, index: number) => (
              <div key={index} style={{ marginBottom: "8px" }} className="flex">
                {/* <strong>{index + 1}:</strong> */}
                <strong>{report.username} </strong>
                {":"}
                {report.reason}
              </div>
            ))}
          </div>
        );
      },
    },

    {
      field: "  ",
      headerName: "Details",
      flex: 0.3,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row._id);
            }}
            variant="contained"
            color="primary"
          >
            View Details
          </Button>
        );
      },
    },
  ];

  return (
    <div className="mt-[80px] w-full">
      <Box m="40px">
        <Box
          m="40px 0 0 0"
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },

            "& .MuiDataGrid-row": {
              color: "#000",
              borderBottom: "1px solid #ccc!important",
              height: "80px !important",
              textAlign: "center",
              whiteSpace: "normal !important",
              wordWrap: "break-word !important",
            },
            "& .MuiDataGrid-columnHeader": {
              color: "#fff",
              backgroundColor: "#006ca5",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
              color: "white",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "white",
            },
            "& .MuiDataGrid-colCell[data-field='']": {
              backgroundColor: "#006ca5 !important",
            },
            "& .MuiDataGrid-colCell[data-field=' ']": {
              backgroundColor: "#006ca5 !important",
            },
            "& .MuiDataGrid-colCell[data-field='  ']": {
              backgroundColor: "#006ca5 !important",
            },

            // "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            //   color: "#fff !important",
            // },
            "& .MuiDataGrid-footerContainer": {
              color: "#fff",
              borderTop: "none",
              backgroundColor: "#006ca5",
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#fff",
            },
            "& .name-column--cell": {
              color: "#fff",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#ffff",
            },
            "& .MuiDataGrid-footerContainer .MuiDataGrid-iconButton": {
              color: "white",
            },
            "& .MuiDataGrid-footerContainer .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <DataGrid
            getRowHeight={() => "auto"}
            checkboxSelection
            rows={rows}
            columns={coloumns}
          />
        </Box>
      </Box>
    </div>
  );
}

export default AdminCourseReportsList;
