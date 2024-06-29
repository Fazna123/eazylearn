import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import swal from "sweetalert";

import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

import { format } from "timeago.js";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../utils/api";

interface Instructor {
  _id: string;
  id: number;
  name: string;
  email: string;
  isBlock: string;
  isApproved: string;
  createdAt: string;
  isRejected: string;
  verification: Record<string, string>;
}

const AdminInstructorApprovalList = () => {
  const [rows, setRows] = useState<Instructor[]>([]);
  const [approvedInstructors, setApprovedInstructors] = useState<string[]>([]);
  const [rejectedInstructors, setRejectedInstructors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);
  //const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/api/user/get-instructors-approval`, {
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
      },
      credentials: "include", // Include cookies in the request
    })
      .then((response) => response.json())
      .then((data) => {
        const newRows = data?.instructors.map(
          (instructor: any, index: number) => ({
            id: index + 1,
            ...instructor,
            isBlock: instructor.isBlock ? "Blocked" : "Active",
            isApproved: instructor.isApproved ? "Approved" : "Pending",
            createdAt: format(instructor.createdAt),
            isRejected: instructor.isRejected ? "Rejected" : "Not Rejected",
            verification: instructor.verification,
            //courses: instructor.courses.length,
          })
        );
        setRows(newRows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //--------------------------------------------------------------------

  //...............................................................................

  const handleApprove = async (id: string) => {
    try {
      const confirmed = await swal("Are you sure to approve user?", {
        buttons: ["Cancel", true],
      });
      if (confirmed) {
        const res = await fetch(
          `${BASE_URL}/api/user/approve-instructor/${id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isApproved: true }),
          }
        );
        if (res.ok) {
          toast.success(`Instructor with ID ${id} approved successfully.`);
          setApprovedInstructors((prevApprovedInstructors) => [
            ...prevApprovedInstructors,
            id,
          ]);
        } else {
          toast.error(`Failed to approve course with ID ${id}.`);
        }
      }
    } catch (error) {
      console.error(`Error approving course with ID ${id}:`, error);
    }
  };
  //------------------------------------------------------------------------------------
  const handleReject = async (id: string) => {
    const confirmed = await swal("Are you sure to reject this instructor?", {
      buttons: ["Cancel", "Proceed"],
      dangerMode: true,
    });
    if (confirmed) {
      try {
        const response = await fetch(`${BASE_URL}/api/user/reject-user/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          // Deletion successful
          setRows(rows.filter((user) => user._id !== id));
          setRejectedInstructors((prevRejectedInstructors) => [
            ...prevRejectedInstructors,
            id,
          ]);
          swal("User rejected successfully!", {
            icon: "success",
          });
        } else {
          // Handle error response
          throw new Error("Failed to reject user");
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error deleting user:", error);
        swal("Failed to reject user!", {
          icon: "error",
        });
      }
    }
  };

  //------------------------------------------------------------------------------------
  const handleDetails = (instructorId: any) => {
    console.log("Clicked instructorId:", instructorId);
    console.log("All rows:", rows);
    const selectedInstructor = rows.find(
      (instructor) => instructor._id === instructorId
    );
    console.log("details", selectedInstructor);
    setSelectedInstructor(selectedInstructor || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //------------------------------------------------------------------------------------
  //   const handleBlock = async (id: string) => {
  //     const confirmed = await swal("Are you sure to block user?", {
  //       buttons: ["Cancel", true],
  //     });
  //   };

  //-------------------------------------------------------------------------------------

  const columns = [
    { field: "id", headerName: "S.No.", flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email ID", flex: 0.3 },
    //{ field: "courses", headerName: "" },
    { field: "createdAt", headerName: "Joined At" },
    { field: "isBlock", headerName: "Status" },
    { field: "isApproved", headerName: "Approved/Not", flex: 0.3 },
    {
      field: "verification",
      headerName: "Details",
      flex: 0.2,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDetails(row._id);
            }}
            variant="contained"
            color="primary"
          >
            Details
          </Button>
        );
      },
    },
    {
      field: " ",
      headerName: "Approve",
      flex: 0.3,
      renderCell: (params: any) => {
        const { row } = params;
        const isApproved =
          approvedInstructors.includes(row._id) ||
          row.isApproved === "Approved";
        return (
          <Button
            disabled={isApproved}
            onClick={(e) => {
              e.stopPropagation();
              handleApprove(row._id);
            }}
            variant="contained"
            color="success"
          >
            {isApproved ? "Approved" : "Approve"}
          </Button>
        );
      },
    },
    {
      field: "  ",
      headerName: "Reject",
      flex: 0.3,
      renderCell: (params: any) => {
        const { row } = params;
        const isRejected =
          rejectedInstructors.includes(row._id) ||
          row.isRejected === "Rejected";
        return (
          <Button
            disabled={isRejected}
            onClick={(e) => {
              e.stopPropagation();
              handleReject(row._id);
            }}
            variant="contained"
            color="secondary"
          >
            {isRejected ? "Rejected" : "Reject"}
          </Button>
        );
      },
    },
    {
      field: "   ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        const { row } = params;
        const handleLinkClick = (
          event: React.MouseEvent<HTMLAnchorElement>
        ) => {
          event.stopPropagation();
        };
        return (
          <a href={`mailto:${row.email}`} onClick={handleLinkClick}>
            <AiOutlineMail
              className="text-black mt-5 ml-2 text-center"
              size={20}
            />
          </a>
        );
      },
    },
    // {
    //   field: "",
    //   headerName: "Delete",
    //   flex: 0.2,
    //   renderCell: (params: any) => {
    //     const { row } = params;
    //     return (
    //       <Button
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           handleDelete(row._id);
    //         }}
    //       >
    //         <AiOutlineDelete className="text-black" size={20} />
    //       </Button>
    //     );
    //   },
    // },
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
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Instructor Answers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedInstructor && (
              <div>
                <p>Name: {selectedInstructor.name}</p>
                {/* <p>Email: {selectedInstructor.email}</p> */}
                <p>Verification:</p>
                <ul>
                  {Object.entries(selectedInstructor.verification).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default AdminInstructorApprovalList;
