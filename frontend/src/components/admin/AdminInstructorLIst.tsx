import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";

import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

import { format } from "timeago.js";
import { ToastContainer } from "react-toastify";
import { blockUser, unBlockUser } from "../../utils/endPoint";
import { BASE_URL } from "../../utils/api";
//import { useDispatch, useSelector } from "react-redux";

const AdminInstructorsList = () => {
  const [rows, setRows] = useState<any[]>([]);
  //const [approvedInstructors, setApprovedInstructors] = useState<string[]>([]);
  const [blockedInstructors, setBlockedInstructors] = useState<string[]>([]);
  const [unblockedInstructors, setUnblockedInstructors] = useState<string[]>(
    []
  );
  //const navigate = useNavigate();
  // const { currentUser } = useSelector((state: any) => state.user);
  // const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/get-instructors`)
      .then((response) => response.json())
      .then((data) => {
        const newRows = data?.instructors.map(
          (instructor: any, index: number) => ({
            id: index + 1,
            ...instructor,
            isBlock: instructor.isBlock ? "Blocked" : "Active",
            isApproved: instructor.isApproved ? "Approved" : "Pending",
            createdAt: format(instructor.createdAt),
            //courses: instructor.courses.length,
          })
        );
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //...............................................................................

  // const handleApprove = async (id: string) => {
  //   try {
  //     const confirmed = await swal("Are you sure to approve user?", {
  //       buttons: ["Cancel", true],
  //     });
  //     if (confirmed) {
  //       const res = await fetch(`/api/user/approve-instructor/${id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ isApproved: true }),
  //       });
  //       if (res.ok) {
  //         toast.success(`Instructor with ID ${id} approved successfully.`);
  //         setApprovedInstructors((prevApprovedInstructors) => [
  //           ...prevApprovedInstructors,
  //           id,
  //         ]);
  //       } else {
  //         toast.error(`Failed to approve course with ID ${id}.`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(`Error approving course with ID ${id}:`, error);
  //   }
  // };
  //------------------------------------------------------------------------------------
  const handleDelete = async (id: string) => {
    const confirmed = await swal("Are you sure to delete user?", {
      buttons: ["Cancel", "Proceed"],
      dangerMode: true,
    });
    if (confirmed) {
      try {
        const response = await fetch(`${BASE_URL}/api/user/delete-user/${id}`, {
          method: "DELETE", // Assuming you are using DELETE method for deletion
        });
        if (response.ok) {
          // Deletion successful
          setRows(rows.filter((user) => user._id !== id));
          swal("User deleted successfully!", {
            icon: "success",
          });
        } else {
          // Handle error response
          throw new Error("Failed to delete user");
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error deleting user:", error);
        swal("Failed to delete user!", {
          icon: "error",
        });
      }
    }
  };

  //------------------------------------------------------------------------------------
  const handleBlock = async (id: string) => {
    const confirmed = await swal("Are you sure to block user?", {
      buttons: ["Cancel", true],
    });
    if (confirmed) {
      const { success, data, error } = await blockUser(id);
      if (!success) {
        swal(error.message, { icon: "error" });
      } else {
        setBlockedInstructors((prevBlockedInstructors) => [
          ...prevBlockedInstructors,
          id,
        ]);
        setUnblockedInstructors((prevUnBlockedInstructors) =>
          prevUnBlockedInstructors.filter((userId) => userId !== id)
        );

        swal(data.message, { icon: "success" });
      }
    }
  };

  //-------------------------------------------------------------------------------------

  const handleUnBlock = async (id: string) => {
    const confirmed = await swal("Are you sure to unblock user?", {
      buttons: ["Cancel", true],
    });
    if (confirmed) {
      const { success, data, error } = await unBlockUser(id);
      if (!success) {
        swal(error.message, { icon: "error" });
      } else {
        setUnblockedInstructors((prevUnBlockedInstructors) => [
          ...prevUnBlockedInstructors,
          id,
        ]);
        setBlockedInstructors((prevBlockedInstructors) =>
          prevBlockedInstructors.filter((userId) => userId !== id)
        );
        swal(data.message, { icon: "success" });
      }
    }
  };
  //-------------------------------------------------------------------------------------

  const coloumns = [
    { field: "id", headerName: "S.No.", flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email ID", flex: 0.3 },
    //{ field: "courses", headerName: "" },
    { field: "createdAt", headerName: "Joined At" },
    { field: "isBlock", headerName: "Status" },
    { field: "isApproved", headerName: "Approved/Not", flex: 0.3 },

    {
      field: "  ",
      headerName: "Block",
      flex: 0.3,
      renderCell: (params: any) => {
        const { row } = params;
        const isBlocked =
          blockedInstructors.includes(row._id) || row.isBlock === "Blocked";

        const blocked = !unblockedInstructors.includes(row._id);
        return (
          <Button
            disabled={isBlocked && blocked}
            onClick={(e) => {
              e.stopPropagation();
              handleBlock(row._id);
            }}
            variant="contained"
            color="secondary"
          >
            Block
          </Button>
        );
      },
    },
    {
      field: " ",
      headerName: "UnBlock",
      flex: 0.3,
      renderCell: (params: any) => {
        const { row } = params;
        const isUnBlocked =
          unblockedInstructors.includes(row._id) || row.isBlock !== "Blocked";

        const unblocked = !blockedInstructors.includes(row._id);
        return (
          <Button
            disabled={isUnBlocked && unblocked}
            onClick={(e) => {
              e.stopPropagation();
              handleUnBlock(row._id);
            }}
            variant="contained"
            color="primary"
          >
            Unblock
          </Button>
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
            // "& .MuiDataGrid-colCell[data-field='  ']": {
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
      <div>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default AdminInstructorsList;
