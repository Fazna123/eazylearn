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

const AdminInstructorsList = () => {
  const [rows, setRows] = useState<any[]>([]);

  //const [modalOpen, setModalOpen] = useState(false);
  //const [selectedUserId, setSelectedUserId] = useState("");
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [unblockedUsers, setUnblockedUsers] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/get-students`, {
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
      },
      credentials: "include", // Include cookies in the request
    })
      .then((response) => response.json())
      .then((data) => {
        const newRows = data?.students.map((student: any, index: number) => ({
          id: index + 1,
          ...student,
          isBlock: student.isBlock ? "Blocked" : "Active",
          createdAt: format(student.createdAt),
          courses: student.courses.length,
        }));
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //...............................................................................
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
        setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, id]);
        setUnblockedUsers((prevUnBlockedUsers) =>
          prevUnBlockedUsers.filter((userId) => userId !== id)
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
        setUnblockedUsers((prevUnBlockedUsers) => [...prevUnBlockedUsers, id]);
        setBlockedUsers((prevBlockedUsers) =>
          prevBlockedUsers.filter((userId) => userId !== id)
        );
        swal(data.message, { icon: "success" });
      }
    }
  };
  //-------------------------------------------------------------------------------------

  const handleDelete = async (id: string) => {
    const confirmed = await swal("Are you sure to delete user?", {
      buttons: ["Cancel", "Proceed"],
      dangerMode: true,
    });
    if (confirmed) {
      try {
        const response = await fetch(`${BASE_URL}/api/user/delete-user/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }, // Assuming you are using DELETE method for deletion
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

  //-------------------------------------------------------------------------------

  const coloumns = [
    { field: "id", headerName: "S.No.", flex: 0.1 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email ID", flex: 0.4 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.3 },
    { field: "createdAt", headerName: "Joined At" },
    { field: "isBlock", headerName: "Status" },

    {
      field: "  ",
      headerName: "Block",
      flex: 0.3,
      renderCell: (params: any) => {
        const { row } = params;
        const isBlocked =
          blockedUsers.includes(row._id) || row.isBlock === "Blocked";

        const blocked = !unblockedUsers.includes(row._id);
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
          unblockedUsers.includes(row._id) || row.isBlock !== "Blocked";

        const unblocked = !blockedUsers.includes(row._id);
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
      {/* {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </div>
          </div>
        </div>
      )} */}
      <div>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default AdminInstructorsList;
