import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

const AllCourses = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/get-myteachings`)
      .then((response) => response.json())
      .then((data) => {
        const newRows = data?.courses.map((course: any, index: number) => ({
          id: index + 1,
          ...course,
          createdAt: format(course.createdAt),
          isApproved: course.isApproved ? "Approved" : "Pending",
        }));
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //-----------------------------------------------------------------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = await swal("Are you sure to delete course?", {
      buttons: ["Cancel", "Proceed"],
      dangerMode: true,
    });
    if (confirmed) {
      try {
        const response = await fetch(
          `${BASE_URL}/api/user/delete-course/${id}`,
          {
            method: "DELETE", // Assuming you are using DELETE method for deletion
          }
        );
        if (response.ok) {
          // Deletion successful
          setRows(rows.filter((course) => course._id !== id));
          swal("Course deleted successfully!", {
            icon: "success",
          });
        } else {
          // Handle error response
          throw new Error("Failed to delete course");
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error deleting course:", error);
        swal("Failed to delete course!", {
          icon: "error",
        });
      }
    }
  };
  //-----------------------------------------------------------------------------------------

  const coloumns = [
    { field: "id", headerName: "S.No.", flex: 0.2 },
    { field: "name", headerName: "Title", flex: 0.5 },
    { field: "description", headerName: "Course Description", flex: 1 },
    { field: "price", headerName: "Price", flex: 0.3 },
    { field: "ratings", headerName: "Ratings", flex: 0.3 },
    { field: "purchased", headerName: "Purchased", flex: 0.3 },
    { field: "createdAt", headerName: "Created At", flex: 0.3 },
    { field: "isApproved", headerName: "Status", flex: 0.3 },
    {
      field: " ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <>
            <Link to={`/instructor/edit-course/${row._id}`}>
              <FiEdit2 className="text-black" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: "",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
          >
            <AiOutlineDelete className="text-black" size={20} />
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
            // "& .MuiDataGrid-colCell[data-field=' ']": {
            //   backgroundColor: "#006ca5 !important",
            // },

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
    </div>
  );
};

export default AllCourses;
