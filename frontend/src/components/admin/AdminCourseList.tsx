import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { format } from "timeago.js";
import { ToastContainer } from "react-toastify";

const AdminCourseList = () => {
  const [rows, setRows] = useState<any[]>([]);
  //const [approvedCourses, setApprovedCourses] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/get-approved-courses")
      .then((response) => response.json())
      .then((data) => {
        const newRows = data?.courses.map((course: any, index: number) => ({
          id: index + 1,
          ...course,
          isApproved: course.isApproved ? "Approved" : "Pending",
          createdAt: format(course.createdAt),
        }));
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //...............................................................................

  // const handleApprove = async (id: string) => {
  //   try {
  //     const confirmed = await swal("Are you sure to approve this course?", {
  //       buttons: ["Cancel", true],
  //     });
  //     if (confirmed) {
  //       const res = await fetch(`/api/user/approve-course/${id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ isApproved: true }),
  //       });

  //       if (res.ok) {
  //         toast.success(`Course with ID ${id} approved successfully.`);
  //         setApprovedCourses((prevApprovedCourses) => [
  //           ...prevApprovedCourses,
  //           id,
  //         ]);
  //       }
  //     } else {
  //       toast.error(`Failed to approve course with ID ${id}.`);
  //     }
  //   } catch (error) {
  //     console.error(`Error approving course with ID ${id}:`, error);
  //   }
  // };

  //-------------------------------------------------------------------------------------
  const handleDelete = async (id: string) => {
    const confirmed = await swal("Are you sure to delete course?", {
      buttons: ["Cancel", "Proceed"],
      dangerMode: true,
    });
    if (confirmed) {
      try {
        const response = await fetch(`/api/user/delete-course/${id}`, {
          method: "DELETE", // Assuming you are using DELETE method for deletion
        });
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
    { field: "isApproved", headerName: "Status" },
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
    // {
    //   field: " ",
    //   headerName: "Approve",
    //   flex: 0.3,
    //   renderCell: (params: any) => {
    //     const { row } = params;
    //     const isApproved =
    //       approvedCourses.includes(row._id) || row.isApproved === "Approved";
    //     return (
    //       <Button
    //         disabled={isApproved}
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           handleApprove(row._id);
    //         }}
    //         variant="contained"
    //         color="primary"
    //       >
    //         {isApproved ? "Approved" : "Approve"}
    //       </Button>
    //     );
    //   },
    // },
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
  //const rows: any = [];

  // {
  //   data &&
  //     data.forEach((item: any) => {
  //       rows.push({
  //         id: item.id,
  //         _id: item._id,
  //         title: item.name,
  //         description: item.description,
  //         price: item.price,
  //         ratings: item.ratings,
  //         purchased: item.purchased,
  //         created_at: format(item.createdAt),
  //         isApproved: item.isApproved ? "Approved" : "Pending",
  //       });
  //     });
  // }

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

export default AdminCourseList;
