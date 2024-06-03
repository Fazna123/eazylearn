import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { format } from "timeago.js";
import { ToastContainer, toast } from "react-toastify";

const AdminDeleteCourseList = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [revokedCourses, setRevokedCourses] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/get-deletedcourses")
      .then((response) => response.json())
      .then((data) => {
        const newRows = data?.courses.map((course: any, index: number) => ({
          id: index + 1,
          ...course,

          createdAt: format(course.createdAt),
        }));
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //...............................................................................

  const handleRevoke = async (id: string) => {
    try {
      const confirmed = await swal("Are you sure to revoke this course?", {
        buttons: ["Cancel", true],
      });
      if (confirmed) {
        const res = await fetch(`/api/user/revoke-course/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isBlock: false }),
        });

        if (res.ok) {
          toast.success(`Course with ID ${id} revoked successfully.`);
          setRows((prevRows) => prevRows.filter((row) => row._id !== id));
          setRevokedCourses((prevRevokedCourses) => [
            ...prevRevokedCourses,
            id,
          ]);
        }
      } else {
        toast.error(`Failed to revoke course with ID ${id}.`);
      }
    } catch (error) {
      console.error(`Error in revoking course with ID ${id}:`, error);
    }
  };

  //-------------------------------------------------------------------------------------

  const handleViewDetails = (id: String) => {
    navigate(`/admin/course-details/${id}`);
    console.log("view Details", id);
  };
  //console.log(data);
  const coloumns = [
    { field: "id", headerName: "S.No.", flex: 0.2 },
    { field: "name", headerName: "Title", flex: 0.5 },
    { field: "description", headerName: "Course Description", flex: 0.5 },
    { field: "price", headerName: "Price" },
    { field: "ratings", headerName: "Ratings" },
    { field: "purchased", headerName: "Purchased" },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },

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
    {
      field: " ",
      headerName: "Revoke the Course",
      flex: 0.3,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleRevoke(row._id);
            }}
            variant="contained"
            color="primary"
          >
            Revoke
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
              textAlign: "center",
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
          <DataGrid checkboxSelection rows={rows} columns={coloumns} />
        </Box>
      </Box>
      <div>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default AdminDeleteCourseList;
