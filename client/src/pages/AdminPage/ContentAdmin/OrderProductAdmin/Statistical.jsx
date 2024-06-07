import React, { useState, useEffect, useRef } from "react";
import {
  DatePicker,
} from "antd";
const { RangePicker } = DatePicker;
import {
  Typography,
  Box,
  Breadcrumbs,
} from "@mui/joy";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import priceIcon from "../../../../assets/font-end/imgs/icon/iconprice.png";
import iconproductsuccess from "../../../../assets/font-end/imgs/icon/productsuccess.png";
import iconproducterror from "../../../../assets/font-end/imgs/icon/producterror.png";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  Pie,
  Cell,
  PieChart
} from "recharts";
import dayjs from "dayjs";
import { useMutationHooks } from "../../../../hooks/UseMutationHook";
import { OrderProduct } from "../../../../services/index";
import {convertPrice} from "../../../../utils"
import { useSelector, useDispatch } from "react-redux";
import IsLoadingComponent from '../../../../components/LoadComponent/Loading'
export default function Statistical() {
  const user = useSelector((state) => state.user);
  const [valuesDateOrder, setValueDateOrder] = useState({
    datestart: "",
    dateend: "",
  });

  useEffect(() => {
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1; // Tháng trong dayjs bắt đầu từ 0, nên cần +1
    const currentDate = dayjs().date();

    const datestart = dayjs(`${currentYear}-${currentMonth}-01`).format(
      "YYYY-MM-DD",
    );
    const dateend = dayjs(
      `${currentYear}-${currentMonth}-${currentDate}`,
    ).format("YYYY-MM-DD");

    setValueDateOrder({
      datestart: datestart,
      dateend: dateend,
    });

    mutationDashboard.mutate()
  }, []);

  useEffect(() => {
    mutationDateOrderProduct.mutate({
      datestart: valuesDateOrder.datestart,
      dateend: valuesDateOrder.dateend,
    });
  }, [valuesDateOrder]);

  const mutationDateOrderProduct = useMutationHooks(async (data) => {
    const access_Token =  user.access_Token.split("=")[1];
    const res = await OrderProduct.getAllOrderProductsDate(
      data?.datestart,
      data?.dateend,
      access_Token
    );
    return res;
  });

  const mutationDashboard = useMutationHooks(async () => {
    const access_Token =  user.access_Token.split("=")[1];
    const res = await OrderProduct.getDashBoard(access_Token)
    return res;
  });

  const { data: dateorderporuct } = mutationDateOrderProduct;
  const {data: datadashboard, isLoading: isLoadingDashBoard} =  mutationDashboard
  const data =
    dateorderporuct?.dataOrderProductDate?.map((item) => ({
      name: item._id,
      "Tổng Số tiền đã giao hàng": item.totalAmountprice,
      "Tổng đơn hàng đã giao": item.totalDeliveredtrue,
      "Tổng đơn hàng chưa giao": item.totalDeliveredfalse,
    })) || [];

  const handleDate = (value, dateString) => {
    setValueDateOrder({
      datestart: dateString[0],
      dateend: dateString[1],
    });
  };

  const datapi = dateorderporuct?.dataOrderProductDate?.map((item) => ({
    name: item._id,
    value: item.totalAmountprice
  })) || [];

  dateorderporuct?.dataOrderProductDate?.map((item) => ({
    name: item._id,
    "Tổng Số tiền đã giao hàng": item.totalAmountprice,
    "Tổng đơn hàng đã giao": item.totalDeliveredtrue,
    "Tổng đơn hàng chưa giao": item.totalDeliveredfalse,
  })) || [];


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#00FF00', '#0000FF', '#00FFFF'];
  const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Formatter function for Y-axis ticks
const yAxisTickFormatter = (value) => {
  return `${value.toLocaleString()} VND`;
};

// Formatter function for Tooltip values
const tooltipFormatter = (value, name) => {
  if (name === 'Tổng Số tiền đã giao hàng') {
    return [`${value.toLocaleString()} VND`, name];
  }
  return [value, name];
};
  return (
    <Box
    sx={{
      position: "sticky",
      top: 0,
      bottom: 0,
      height: "100dvh",
      overflowY: "auto",
      width: "100%",
      px: { xs: 2, md: 6 },
      pt: {
        xs: "calc(12px + var(--Header-height))",
        sm: "calc(12px + var(--Header-height))",
        md: 3,
      },
      pb: { xs: 2, sm: 2, md: 3 },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Breadcrumbs
        size="sm"
        aria-label="breadcrumbs"
        separator={<ChevronRightRoundedIcon fontSize="sm" />}
        sx={{ pl: 0 }}
      >
        <Typography color="primary" fontWeight={500} fontSize={12}>
          Thống kê đơn hàng
        </Typography>
      </Breadcrumbs>
    </Box>

    <Box
      sx={{
        display: "flex",
        mb: 1,
        gap: 1,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "start", sm: "center" },
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Typography level="h2" component="h1">
        Bảng điều khiển
      </Typography>
    </Box>

    <Box sx={{ marginTop: "20px" }}>
      <div className="block gap-5 md:flex ">
        <div className="mb-2 flex flex-1 gap-2 rounded bg-[#f6f5f5] p-5 md:mb-0">
          <div>
            <img src={priceIcon} className="w-[64px] h-[64px]"/>
          </div>
          <div>
            <IsLoadingComponent isLoading={isLoadingDashBoard}>
            <div className="text-[25px] font-semibold">{convertPrice(datadashboard?.dataOrderProduct[0]?.totalAmountprice)}</div>
            <div className="text-[15px] font-light">Tổng tiền</div>
            </IsLoadingComponent>
          </div>
        </div>
        <div className="mb-2 flex flex-1 gap-2 rounded bg-[#f6f5f5] p-5 md:mb-0">
          <div>
            <img src={iconproductsuccess} className="w-[64px] h-[64px]" />
          </div>
          <div>
          <IsLoadingComponent isLoading={isLoadingDashBoard}>
            <div className="text-[25px] font-semibold">{datadashboard?.dataOrderProducttotalDelivered[0]?.totalDeliveredtrue}</div>
            <div className="text-[15px] font-light">Số đơn hàng giao thành công</div>
            </IsLoadingComponent>
          </div>
        </div>
        <div className="mb-2 flex flex-1 gap-2 rounded bg-[#f6f5f5] p-5 md:mb-0">
          <div>
            <img src={iconproducterror} className="w-[64px] h-[64px]"/>
          </div>
          <div>
          <IsLoadingComponent isLoading={isLoadingDashBoard}>
            <div className="text-[25px] font-semibold">{datadashboard?.dataOrderProducttotalDelivered[0]?.totalDeliveredfalse}</div>
            <div className="text-[15px] font-light">Số đơn hàng chưa giao</div>
            </IsLoadingComponent>
          </div>
        </div>
      </div>
    </Box>

    <Box sx={{ marginTop: "20px" }}>
      <Typography level="h2" component="h1" sx={{ marginBottom: "20px" }}>
        Số liệu đơn hàng
      </Typography>
      <div className="block md:flex">
      <div className=" rounded bg-[#f6f5f5] w-full md:w-[70%]" style={{ padding: "20px 20px" }}>
      <Typography level="h4" component="h5" sx={{marginBottom:'20px'}}>
        Biểu đồ số liệu tổng tiền đơn hàng 
      </Typography>
        <div className="mb-6 flex ">
          <RangePicker
            onChange={handleDate}
            format="YYYY-MM-DD "
            value={[
              dayjs(valuesDateOrder.datestart, "YYYY-MM-DD"),
              dayjs(valuesDateOrder.dateend, "YYYY-MM-DD"),
            ]}
          />
        </div>
        <div className="p-5">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={yAxisTickFormatter}/>
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Line type="monotone" dataKey="Tổng Số tiền đã giao hàng" stroke="#8884d8" />
            <Line
              type="monotone"
              dataKey="Tổng đơn hàng đã giao"
              stroke="#30ff01"
            />
            <Line
              type="monotone"
              dataKey="Tổng đơn hàng chưa giao"
              stroke="#ff0e01"
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded bg-[#f6f5f5] ml-0 mt-[20px] md:mt-0 md:ml-[20px] w-full md:w-[30%]" style={{ padding: "20px 10px" }}>
      <Typography level="h4" component="h5" sx={{marginBottom:'20px'}}>
        Biểu đồ hình tròn số liệu đơn hàng
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
  <PieChart>
    <Pie
      data={datapi}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {datapi.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend />
  </PieChart>
</ResponsiveContainer>
      </div>
      </div>
    </Box>
  </Box>
  )
}
