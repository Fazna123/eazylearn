import { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import swal from "sweetalert";
// import { AiOutlineMail } from "react-icons/ai";
// import { format } from "timeago.js";
import { getAllOrders } from "../../utils/endPoint";
import Spinner from "../Spinner";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format as formatDate } from "date-fns";

type Props = {
  isDashboard: boolean;
};

const AdminReportsList = ({ isDashboard }: Props) => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const fetchOrderData = async () => {
    setLoading(true);
    const { success, error, data } = await getAllOrders();
    if (success) {
      setLoading(false);
      const newOrderData = data?.orders.map((order: any, index: number) => ({
        id: index + 1,
        ...order,
        price: "$" + order.courseId.price,
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

  const handleDateChange = () => {
    if (!fromDate || !toDate) {
      return orderData;
    }
    const filteredData = orderData.filter((order: any) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= fromDate && orderDate <= toDate;
    });
    return filteredData;
  };

  const exportToPdf = () => {
    const filteredData = handleDateChange();
    const doc = new jsPDF();
    const tableColumn = [
      "ID",
      "Name",
      "Email",
      "Course Title",
      "Price",
      "Created At",
    ];
    const tableRows: any[] = [];

    filteredData.forEach((order: any) => {
      const orderData = [
        order.id,
        order.userId.name,
        order.userId.email,
        order.courseId.name,
        order.price,
        formatDate(new Date(order.createdAt), "dd/MM/yyyy"),
      ];
      tableRows.push(orderData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Order Report", 14, 15);
    doc.save("orders_report.pdf");
  };

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

    { field: "createdAt", headerName: "Created At", flex: 0.5 },
  ];

  const rows = handleDateChange().map((item: any) => ({
    id: item.id,
    userName: item.userId.name,
    userEmail: item.userId.email,
    courseTitle: item.courseId.name,
    price: item.price,
    createdAt: formatDate(new Date(item.createdAt), "dd/MM/yyyy"),
    // createdAt: format(item.createdAt),
  }));

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <div className={`${isDashboard ? "mt-[20px]" : "mt-[0px] w-full"}`}>
      {loading ? (
        <Spinner />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box display="flex" justifyContent="left" mb={2}>
              <DatePicker
                label="From"
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                slots={{
                  textField: (textFieldProps) => (
                    <TextField {...textFieldProps} />
                  ),
                }}
                sx={{ ml: 2 }}
              />
              <DatePicker
                label="To"
                value={toDate}
                onChange={(date) => setToDate(date)}
                sx={{ ml: 2 }}
                //renderInput={(params: any) => <TextField {...params} />}
                slots={{
                  textField: (textFieldProps) => (
                    <TextField {...textFieldProps} />
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}
                onClick={exportToPdf}
              >
                Export to PDF
              </Button>
            </Box>
          </LocalizationProvider>
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
              // components={!isDashboard ? { Toolbar: GridToolbar } : undefined}
              {...(!isDashboard && { components: { Toolbar: CustomToolbar } })}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AdminReportsList;
