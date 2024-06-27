import { useEffect, useState } from "react";
import {
  DataGrid,
  //GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Spinner from "./Spinner";
import { getAllOrders } from "../utils/endPoint";
import swal from "sweetalert";

import { format } from "timeago.js";

type Props = {
  isDashboard: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderData = async () => {
    setLoading(true);
    const { success, error, data } = await getAllOrders();
    if (success) {
      setLoading(false);
      const newOrderData = data?.orders.map((order: any, index: number) => ({
        id: index + 1,
        ...order,
        price: "$" + order.courseId.price,

        // createdAt: format(order.createdAt),
      }));
      setOrderData(newOrderData);
    } else {
      setLoading(false);
      swal(`Error in fetching orders: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "courseTitle", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "createdAt", headerName: "Created At", flex: 0.5 }]
      : [{ field: "createdAt", headerName: "Created At", flex: 0.5 }]),
    // : [
    //     {
    //       field: "emailAction",
    //       headerName: "Email",
    //       flex: 0.2,
    //       renderCell: (params: any) => {
    //         return (
    //           <a href={`mailto:${params.row.userEmail}`}>
    //             <AiOutlineMail
    //               className="text-black text-center ml-2"
    //               size={20}
    //             />
    //           </a>
    //         );
    //       },
    //     },
    //   ]
  ];

  const rows = orderData.map((item: any) => ({
    id: item.id,
    userName: item.userId.name,
    userEmail: item.userId.email,
    courseTitle: item.courseId.name,
    price: item.price,
    createdAt: format(item.createdAt),
  }));

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };
  return (
    <div className={`${isDashboard ? "mt-[20px]" : "mt-[0px] w-[90%]"}`}>
      {loading ? (
        <Spinner />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
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
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              // components={!isDashboard ? { Toolbar: GridToolbar } : {}}
              {...(!isDashboard && { components: { Toolbar: CustomToolbar } })}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
