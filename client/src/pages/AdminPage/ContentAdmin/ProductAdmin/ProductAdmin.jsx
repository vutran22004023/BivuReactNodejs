import React, { useState, useEffect, useRef } from "react";
import { useMutationHooks } from "../../../../hooks/UseMutationHook.js";
import OrderTable from "../../../../components/AdminPageComponent/OrderTable.jsx";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Outlet } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Modal,
  Form,
  Input,
  Upload,
  Avatar,
  Space,
  Select,
  Image,
  Switch,
  Col,
  Row,
  Checkbox,
  Rate,
  Tabs
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { getBase64 } from "../../../../utils.js";
import { UploadOutlined, WarningOutlined } from "@ant-design/icons";
import { ProductService,ReviewService } from "../../../../services/index.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import {
  Menu,
  MenuButton,
  Dropdown,
  MenuItem,
  Divider,
  Button,
  Link,
  Typography,
  Box,
  Breadcrumbs,
} from "@mui/joy";
import {
  success,
  error,
  warning,
} from "../../../../components/MessageComponents/Message.jsx";
import DrawerComponent from "../../../../components/DrawerComponent/Drawer.jsx";
import LoadingComponent from "../../../../components/LoadComponent/Loading.jsx";
import ModalComponent from "../../../../components/ModalComponent/Modal.jsx";
import { renderOptions, vietnameseToSlug } from "../../../../utils.js";
import { imgDB, txtDB } from "../../../../Firebase/config.jsx";
import { v4 } from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
  getStorage,
} from "firebase/storage";
export default function ProductAdmin() {
  //button thêm sửa xóa
  const RowMenu = () => (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={handleDetailProduct}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={handleButtonShowReview}>Bình luận sản phẩm</MenuItem>
        {/* <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem> */}
        <Divider />
        <MenuItem color="danger" onClick={handleModalDelete}>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );

  // các biến dữ liệu
  const user = useSelector((state) => state.user);
  const pages = useSelector((state) => state.pagination);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeSelect, setTypeSelect] = useState("");
  const [typeSelectDetail, setTypeSelectDetail] = useState("");
  const [typePage, setTypePage] = useState(0);
  const [valueSwitch, setValueSwitch] = useState(false);
  const [valueCheckBox, setValueCheckBox] = useState([]);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [valueTab, setValueTab] = useState("1");
  const desc = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Tuyệt vời"];
  const onChange = (checked) => {
    setValueSwitch(checked);
  };
  useEffect(() => {
    if(valueSwitch === true) {
      fetchAllColor.mutate()
    }
  },[valueSwitch])

  useEffect(() => {
    if(valueCheckBox) {
      setStateProduct({ ...stateProduct, idColor: valueCheckBox });
    }
  },[valueCheckBox])


  const onChangeCheckBox = (checkedValues) => {
    if(valueSwitch === true) {
      setValueCheckBox(checkedValues)
    }
  }
  useEffect(() => {
    if (pages) {
      // Đảm bảo pages không phải là undefined hoặc null
      setTypePage(pages.page);
    }
  }, [pages?.page]);

  const inittial = () => ({
    name: "",
    image: [],
    type: "",
    slug: "",
    rating: "",
    description: "",
    discount: "",
    linksshopee: "",
    idColor: [],
    categorySize: [
      {
        size: "",
        price: "",
        counInStock: "",
      },
    ],
  });

  const handleAddInput = () => {
    setStateProduct({
      ...stateProduct,
      categorySize: [
        ...stateProduct.categorySize,
        { size: "", price: "", counInStock: "" },
      ],
    });
  };

  const handleAddInputDetail = () => {
    setStateProductDetail({
      ...stateProductDetail,
      categorySize: [
        ...stateProductDetail.categorySize,
        { size: "", price: "", counInStock: "" },
      ],
    });
  };

  const handleRemoveInput = (index) => {
    const newSize = [...stateProduct.categorySize];
    newSize.splice(index, 1);
    setStateProduct({
      ...stateProduct,
      categorySize: newSize,
    });
  };

  const handleRemoveInputDetail = (index) => {
    const newSize = [...stateProductDetail.categorySize];
    newSize.splice(index, 1);
    setStateProductDetail({
      ...stateProductDetail,
      categorySize: newSize,
    });
  };

  const [stateProduct, setStateProduct] = useState(inittial);
  const [stateProductDetail, setStateProductDetail] = useState(inittial);
  const [RowSelected, setRowSelected] = useState("");
  const [valIdColor, setValIdColor] = useState([])
  useEffect(() => {
    if (stateProductDetail?.idColor) {
        fetchAllColor.mutate()
        const idColors = stateProductDetail.idColor.map(item => item);
        setValIdColor(idColors);
    }
}, [stateProductDetail]);

const onChangeCheckBoxDetail = (val) => {
  setValIdColor(val)
}



const saveData = () => {
  setStateProductDetail({ ...stateProductDetail, idColor: valIdColor });
};


//  useEffect(() => {
//   setStateProductDetail({...stateProductDetail, idColors: valIdColor});
//  },[stateProductDetail])


  //trạng thái mở modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onFinish();
  };
  //trang thái đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // ochange dữ liệu khi nhập vào imput
  const handleOnchanges = (index, e, fieldName) => {
    let value = e.target.value;
    const slug = vietnameseToSlug(value);
    if (fieldName === "categorySize") {
      const newSize = [...stateProduct.categorySize];
      newSize[index][e.target.name] = e.target.value;
      setStateProduct({
        ...stateProduct,
        categorySize: newSize,
      });
    } else if (fieldName === "name") {
      setStateProduct({
        ...stateProduct,
        [fieldName]: e.target.value,
        slug: slug,
      });
    } else {
      setStateProduct({
        ...stateProduct,
        [fieldName]: e.target.value,
      });
    }
  };

  const handleOnchangeDetails = (index, e, fieldName) => {
    let value = e.target.value;
    const slug = vietnameseToSlug(value);
    if (fieldName === "categorySize") {
      const newSize = [...stateProductDetail.categorySize];
      newSize[index][e.target.name] = e.target.value;
      setStateProductDetail({
        ...stateProductDetail,
        categorySize: newSize,
      });
    } else if (fieldName === "name") {
      setStateProductDetail({
        ...stateProductDetail,
        [fieldName]: e.target.value,
        slug: slug,
      });
    } else {
      setStateProductDetail({
        ...stateProductDetail,
        [fieldName]: e.target.value,
      });
    }
  };

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  //Api create product
  const mutation = useMutationHooks(async (data) => {
    const access_Token = user.access_Token.split("=")[1];
    const res = await axios.post(
      `${import.meta.env.REACT_APP_API_URL}/product/create-product`,
      data,
      {
        headers: {
          token: `Beare ${access_Token}`,
        },
      },
    );
    return res.data;
  });
  // api get all products
  const fetchProductAll = async (context) => {
    const search = "";
    const limit = "";
    const page = context.queryKey[1];
    const sort = 'desc'
    const res = await ProductService.getAllProduct(limit, search, page,sort);
    return res;
  };

  // api update product id
  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const access_Token = user?.access_Token.split("=")[1];
    const res = ProductService.updatedDetailProduct(
      RowSelected,
      data,
      access_Token,
    );
    return res;
  });

  //api delete product
  const mutationDelete = useMutationHooks(() => {
    const access_Token = user?.access_Token.split("=")[1];
    const res = ProductService.DeleteDetailProduct(RowSelected, access_Token);

    return res;
  });
  // api delete many products
  const mutationDeleteMany = useMutationHooks((data) => {
    const { access_Token, ...id } = data;
    const res = ProductService.DeleteManyProduct(id, access_Token);
    return res;
  });

  const handleDeleteMany = (ids) => {
    // console.log('_id', {_id})
    const access_Token = user?.access_Token.split("=")[1];
    mutationDeleteMany.mutate(
      { id: ids, access_Token: access_Token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const fetchTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  const fetchAllColor = useMutationHooks(() => {
    const res = ProductService.getAllColor();
    return res;
  });


  const mutationGetDetailsReview = useMutationHooks(async() => {
      const res = await ReviewService.getDetailReviewProduct(RowSelected);
      return res?.data;
  });
  
  // các biến dữ liệu
  const {
    data,
    isLoading: isLoadingCreateProduct,
    isSuccess,
    isError,
  } = mutation;
  const queryProduct = useQuery({
    queryKey: ["products", typePage],
    queryFn: fetchProductAll,
    retryDelay: 1000,
    staleTime: 1000,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const dataAllProduct = products?.data;
  const { data: dataUpdate, isLoading: dataUpdateisLoading } = mutationUpdate;
  const { data: dataDelete, isLoading: dataDeleteisLoading } = mutationDelete;
  const { data: dataDeleteMany, isLoading: dataDeleteisLoadingMany } =
    mutationDeleteMany;
  const { data: productType, isLoading: isLoadingProductType } = useQuery({
    queryKey: ["productsType"],
    queryFn: fetchTypeProduct,
  });
  const {data: dataAllColor,isLoading:isLoadingColor} = fetchAllColor
  const { data: dataDetailReview,isLoading: isLoadingDetailReview} = mutationGetDetailsReview
  // xử lý search trong table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Thoát
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Đường dẫn",
      dataIndex: "slug",
      sorter: (a, b) => a.slug.length - b.slug.length,
      ...getColumnSearchProps("slug"),
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Action",
      dataIndex: "action",
              key: 'operation',
        fixed: 'right',
        width: 100,
      render: RowMenu,
    },
  ];

  // thông báo status khi submit
  const [form] = Form.useForm();
  useEffect(() => {
    if (data?.status === 200) {
      success();
      setStateProduct(inittial());
      setIsModalOpen(false);
      form.resetFields();
    }
    if (data?.status === "ERR") {
      error();
    }
  }, [data?.status]);

  // thông báo status khi submit bên update
  useEffect(() => {
    if (dataUpdate?.status === 200) {
      success();
      setIsOpenDrawer(false);
    } else if (dataUpdate?.status === "ERR") {
      error();
    }
  }, [dataUpdate?.status]);

  useEffect(() => {
    if (dataDeleteMany?.status === 200) {
      success();
    } else if (dataDeleteMany?.status === "ERR") {
      error();
    }
  }, [dataDeleteMany?.status]);

  //thông báo status khi xóa product
  useEffect(() => {
    if (dataDelete?.status === 200) {
      success();
      setIsModalOpenDelete(false);
    } else if (dataDelete?.status === "ERR") {
      error();
    }
  }, [dataDelete?.status]);

  //reset lại null sau khi create product thành công
  useEffect(() => {
    form.setFieldsValue(stateProduct);
  }, [form, stateProduct]);

  // show  sản phẩm của id và cập nhập lại product
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailProduct(RowSelected);
    if (res?.data) {
      setStateProductDetail({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        slug: res?.data?.slug,
        rating: res?.data?.rating,
        description: res?.data?.description,
        discount: res?.data?.discount,
        categorySize: res.data?.categorySize,
        linksshopee: res.data?.linksshopee,
        idColor: res?.data?.idColor
      });
    }
    setIsLoadingUpdate(false);
  };

  // console.log('setStateProductDetail', stateProductDetail)

  //sao khi bấm vào cập nhập thì input có thể hiện thị thông tin
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetail);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetail, isModalOpen]);

  const handleDetailProduct = () => {
    if (RowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct();
      setIsOpenDrawer(true);
    }
    // console.log("handleDetailProduct",RowSelected)
  };

  const handleButtonShowReview = () => {
    setIsModalOpenView(true)
    mutationGetDetailsReview.mutate()
  }

  // xử lý khi bấm vào submit update product
  const onUpdateProduct = () => {
    mutationUpdate.mutate(stateProductDetail, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  //phần về delete product
  const handleModalDelete = () => {
    if (RowSelected) {
      setIsModalOpenDelete(true);
      // console.log("handleModalDelete",RowSelected)
    }
  };

  const handleOkDelete = () => {
    mutationDelete.mutate(RowSelected, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleChangeSelect = (value) => {
    if (value !== "add_type") {
      setStateProduct({
        ...stateProduct,
        type: value,
      });
    } else {
      setTypeSelect(value);
    }
  };

  const handleChangeSelectDetail = (value) => {
    if (value !== "add_type") {
      setStateProductDetail({
        ...stateProductDetail,
        type: value,
      });
    } else {
      setTypeSelectDetail(value);
    }
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState();


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handlePreviewDetail = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const [dataImage, setDataImage] = useState([]);
  const [dataImageDetail, setDataImageDetail] = useState([]);
  const handleChange = async (fileList) => {
    try {
      const uploadedURLs = [];

      const imgs = ref(imgDB, `Imgs/${v4()}`);
      const uploadTaskSnapshot = await uploadBytes(imgs, fileList);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      // Thêm URL của ảnh vừa upload vào mảng
      uploadedURLs.push(downloadURL);

      // Cập nhật state của dataImage với mảng các URL của ảnh đã upload
      setDataImage([...stateProduct?.image, ...uploadedURLs]);

      return false; // return false để ngăn việc tải tệp lên tự động
    } catch (error) {
      console.error("Error uploading files: ", error);
      return false; // Xử lý lỗi và trả về false để ngăn tệp được tải lên tự động
    }
  };

  useEffect(() => {
    // Khi dataImage thay đổi, cập nhật stateProduct với giá trị mới
    setStateProduct({ ...stateProduct, image: dataImage });
  }, [dataImage]);

  const handleChangeDetail = async (fileList) => {
    try {
      const uploadedURLs = [];

      const imgs = ref(imgDB, `Imgs/${v4()}`);
      const uploadTaskSnapshot = await uploadBytes(imgs, fileList);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      // Thêm URL của ảnh vừa upload vào mảng
      uploadedURLs.push(downloadURL);

      // Cập nhật state của dataImage với mảng các URL của ảnh đã upload
      setDataImageDetail([...stateProductDetail?.image, ...uploadedURLs]);

      return false; // return false để ngăn việc tải tệp lên tự động
    } catch (error) {
      console.error("Error uploading files: ", error);
      return false; // Xử lý lỗi và trả về false để ngăn tệp được tải lên tự động
    }
  };

  useEffect(() => {
    // Khi dataImage thay đổi, cập nhật stateProduct với giá trị mới
    setStateProductDetail({ ...stateProductDetail, image: dataImageDetail });
  }, [dataImageDetail]);

  const storage = getStorage();
  const handleRemoveImage = async (file) => {
    try {
      // Lấy đường dẫn hoặc ID của tệp ảnh trong Firebase Storage từ thuộc tính url của file
      const imageURL = file.url; // Đây có thể là đường dẫn hoặc ID của tệp ảnh trong Storage

      // Thực hiện xóa tệp ảnh từ Firebase Storage
      await deleteObject(ref(storage, imageURL));

      // Sau khi xóa thành công từ Firebase Storage, cập nhật trạng thái của ứng dụng bằng cách loại bỏ ảnh khỏi mảng stateProduct.image
      const newImages = stateProduct.image.filter(
        (image) => image !== file.url,
      );
      setStateProduct({ ...stateProduct, image: newImages });

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const handleRemoveImageDetail = async (file) => {
    try {
      // Sau khi xóa thành công từ Firebase Storage, cập nhật trạng thái của ứng dụng bằng cách loại bỏ ảnh khỏi mảng stateProduct.image
      const newImages = stateProductDetail.image.filter(
        (image) => image !== file.url,
      );
      setStateProductDetail({ ...stateProductDetail, image: newImages });

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const handleReplaceImage = async (index) => {
    try {
      const file = await selectImageFromUser(); // Tạo hàm này để người dùng chọn ảnh mới từ máy tính của họ
      const uploadedURLs = [...stateProduct?.image];
      const replacedImgRef = ref(imgDB, `Logo/${v4()}`);
      const uploadTaskSnapshot = await uploadBytes(replacedImgRef, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      uploadedURLs[index] = downloadURL;
      setStateProduct({ ...stateProduct, image: uploadedURLs });
    } catch (error) {
      console.error("Error replacing image: ", error);
      message.error("Failed to replace image");
    }
  };

  const handleReplaceImageDetail = async (index) => {
    try {
      const file = await selectImageFromUser(); // Tạo hàm này để người dùng chọn ảnh mới từ máy tính của họ
      const uploadedURLs = [...stateProductDetail?.image];
      const replacedImgRef = ref(imgDB, `Logo/${v4()}`);
      const uploadTaskSnapshot = await uploadBytes(replacedImgRef, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      uploadedURLs[index] = downloadURL;
      setStateProductDetail({ ...stateProductDetail, image: uploadedURLs });
    } catch (error) {
      console.error("Error replacing image: ", error);
      message.error("Failed to replace image");
    }
  };

  const selectImageFromUser = () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          resolve(file);
        } else {
          reject(new Error("No file selected"));
        }
      };
      input.click();
    });
  };


  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Get the hours and minutes
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    let seconds = date.getSeconds().toString().padStart(2, "0");
    seconds = seconds.substring(0, 2);
    return `${day}-${month}-${year} lúc ${hours}:${minutes}:${seconds}`;
  };


  const handleChangeReview = (key) => {
    setValueTab(key);
  };

  const fiveStarReviewsCount = dataDetailReview?.filter(
    (review) => review.rating === 5,
  ).length;
  const fourStarReviewsCount = dataDetailReview?.filter(
    (review) => review.rating === 4,
  ).length;
  const threeStarReviewsCount = dataDetailReview?.filter(
    (review) => review.rating === 3,
  ).length;
  const twoStarReviewsCount = dataDetailReview?.filter(
    (review) => review.rating === 2,
  ).length;
  const oneStarReviewsCount = dataDetailReview?.filter(
    (review) => review.rating === 1,
  ).length;
  const ratings = [
    { star: 5, count: fiveStarReviewsCount },
    { star: 4, count: fourStarReviewsCount },
    { star: 3, count: threeStarReviewsCount },
    { star: 2, count: twoStarReviewsCount },
    { star: 1, count: oneStarReviewsCount }
  ];
  const calculateAverageRating = (ratings) => {
    let totalStars = 0;
    let totalCount = 0;
  
    ratings.forEach(rating => {
      totalStars += rating.star * rating.count;
      totalCount += rating.count;
    });
  
    return totalStars / totalCount;
  };
  const averageRating = calculateAverageRating(ratings);
  

  const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: (
        <>
        {dataDetailReview?.length > 0 ? (
          <LoadingComponent isLoading={isLoadingDetailReview}>
        {dataDetailReview?.map((item) => (
          <div className="mt-3">
            <div className="flex " style={{ alignItems: "start" }}>
              <Space Spacewrap size={10} className="mt-2">
                <Avatar size="large" src={item.avatar[0]} />
              </Space>
              <div className="ml-3">
                <p>{item.userName}</p>
                <div className="">
                  <Rate
                    tooltips={desc}
                    disabled
                    value={item.rating}
                  />
                </div>
                <div
                  className="flex text-center"
                  style={{ alignItems: "center" }}
                >
                  <div>Thời gian: {formatDate(item.date)}</div>
                  {item?.size?.length > 0 ? (
                    <>
                      <div
                        className=" h-5 w-[2px] bg-[#c12c2c]"
                        style={{ margin: "0 5px" }}
                      ></div>
                      <div>Phân loại hàng: {item.size}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  Màu sắc: <span>đen</span>
                </div>
                <div>Bình luận: {item.comments}</div>
              </div>
            </div>
          </div>
        ))}
      </LoadingComponent>
        ) :(
          <div className="flex items-center justify-center h-[400px] mr-[130px] text-[16px] md:text-[20px] text-[#ba3636]">Chưa có đánh giá</div>
        )} 
        </>
      ),
    },
    {
      key: '2',
      label: (<span>5 sao ({fiveStarReviewsCount})</span>),
      children: (
        <>
      {dataDetailReview?.filter((item) => item.rating === 5)?.length > 0 ? (
        <LoadingComponent isLoading={isLoadingDetailReview}>
        {dataDetailReview?.filter((item) => item.rating === 5)?.map((item) => (
          <div className="mt-3">
            <div className="flex " style={{ alignItems: "start" }}>
              <Space Spacewrap size={10} className="mt-2">
                <Avatar size="large" src={item.avatar[0]} />
              </Space>
              <div className="ml-3">
                <p>{item.userName}</p>
                <div className="">
                  <Rate
                    tooltips={desc}
                    disabled
                    value={item.rating}
                  />
                </div>
                <div
                  className="flex text-center"
                  style={{ alignItems: "center" }}
                >
                  <div>Thời gian: {formatDate(item.date)}</div>
                  {item?.size?.length > 0 ? (
                    <>
                      <div
                        className=" h-5 w-[2px] bg-[#c12c2c]"
                        style={{ margin: "0 5px" }}
                      ></div>
                      <div>Phân loại hàng: {item.size}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  Màu sắc: <span>đen</span>
                </div>
                <div>Bình luận: {item.comments}</div>
              </div>
            </div>
          </div>
        ))}
      </LoadingComponent>
      ):(
        <div className="flex items-center justify-center h-[400px] mr-[130px] text-[16px] md:text-[20px] text-[#ba3636]">Chưa có đánh giá</div>
      )}
      </>
      ),
    },
    {
      key: '3',
      label: (<span>4 sao ({fourStarReviewsCount})</span>),
      children: (
        <>
      {dataDetailReview?.filter((item) => item.rating === 4)?.length > 0 ? (
        <LoadingComponent isLoading={isLoadingDetailReview}>
        {dataDetailReview?.filter((item) => item.rating === 4)?.map((item) => (
          <div className="mt-3">
            <div className="flex " style={{ alignItems: "start" }}>
              <Space Spacewrap size={10} className="mt-2">
                <Avatar size="large" src={item.avatar[0]} />
              </Space>
              <div className="ml-3">
                <p>{item.userName}</p>
                <div className="">
                  <Rate
                    tooltips={desc}
                    disabled
                    value={item.rating}
                  />
                </div>
                <div
                  className="flex text-center"
                  style={{ alignItems: "center" }}
                >
                  <div>Thời gian: {formatDate(item.date)}</div>
                  {item?.size?.length > 0 ? (
                    <>
                      <div
                        className=" h-5 w-[2px] bg-[#c12c2c]"
                        style={{ margin: "0 5px" }}
                      ></div>
                      <div>Phân loại hàng: {item.size}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  Màu sắc: <span>đen</span>
                </div>
                <div>Bình luận: {item.comments}</div>
              </div>
            </div>
          </div>
        ))}
      </LoadingComponent>
      ):(
        <div className="flex items-center justify-center h-[400px] mr-[130px] text-[16px] md:text-[20px] text-[#ba3636]">Chưa có đánh giá</div>
      )}</>
      ),
    },
    {
      key: '4',
      label: (<span>3 sao ({threeStarReviewsCount})</span>),
      children: (
        <>
      {dataDetailReview?.filter((item) => item.rating === 3)?.length > 0 ? (
        <LoadingComponent isLoading={isLoadingDetailReview}>
        {dataDetailReview?.filter((item) => item.rating === 3)?.map((item) => (
          <div className="mt-3">
            <div className="flex " style={{ alignItems: "start" }}>
              <Space Spacewrap size={10} className="mt-2">
                <Avatar size="large" src={item.avatar[0]} />
              </Space>
              <div className="ml-3">
                <p>{item.userName}</p>
                <div className="">
                  <Rate
                    tooltips={desc}
                    disabled
                    value={item.rating}
                  />
                </div>
                <div
                  className="flex text-center"
                  style={{ alignItems: "center" }}
                >
                  <div>Thời gian: {formatDate(item.date)}</div>
                  {item?.size?.length > 0 ? (
                    <>
                      <div
                        className=" h-5 w-[2px] bg-[#c12c2c]"
                        style={{ margin: "0 5px" }}
                      ></div>
                      <div>Phân loại hàng: {item.size}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  Màu sắc: <span>đen</span>
                </div>
                <div>Bình luận: {item.comments}</div>
              </div>
            </div>
          </div>
        ))}
      </LoadingComponent>
      ):(
        <div className="flex items-center justify-center h-[400px] mr-[130px] text-[16px] md:text-[20px] text-[#ba3636]">Chưa có đánh giá</div>
      )}</>
      ),
    },
    {
      key: '5',
      label: (<span>2 sao ({twoStarReviewsCount})</span>),
      children: (
        <>
      {dataDetailReview?.filter((item) => item.rating === 2)?.length > 0 ? (
        <LoadingComponent isLoading={isLoadingDetailReview}>
        {dataDetailReview?.filter((item) => item.rating === 2)?.map((item) => (
          <div className="mt-3">
            <div className="flex " style={{ alignItems: "start" }}>
              <Space Spacewrap size={10} className="mt-2">
                <Avatar size="large" src={item.avatar[0]} />
              </Space>
              <div className="ml-3">
                <p>{item.userName}</p>
                <div className="">
                  <Rate
                    tooltips={desc}
                    disabled
                    value={item.rating}
                  />
                </div>
                <div
                  className="flex text-center"
                  style={{ alignItems: "center" }}
                >
                  <div>Thời gian: {formatDate(item.date)}</div>
                  {item?.size?.length > 0 ? (
                    <>
                      <div
                        className=" h-5 w-[2px] bg-[#c12c2c]"
                        style={{ margin: "0 5px" }}
                      ></div>
                      <div>Phân loại hàng: {item.size}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  Màu sắc: <span>đen</span>
                </div>
                <div>Bình luận: {item.comments}</div>
              </div>
            </div>
          </div>
        ))}
      </LoadingComponent>
      ):(
        <div className="flex items-center justify-center h-[400px] mr-[130px] text-[16px] md:text-[20px] text-[#ba3636]">Chưa có đánh giá</div>
      )}</>
      ),
    },
    {
      key: '6',
      label: (<span>1 sao ({oneStarReviewsCount})</span>),
      children: (
        <>
      {dataDetailReview?.filter((item) => item.rating === 1)?.length > 0 ? (
        <LoadingComponent isLoading={isLoadingDetailReview}>
        {dataDetailReview?.filter((item) => item.rating === 1)?.map((item) => (
          <div className="mt-3">
            <div className="flex " style={{ alignItems: "start" }}>
              <Space Spacewrap size={10} className="mt-2">
                <Avatar size="large" src={item.avatar[0]} />
              </Space>
              <div className="ml-3">
                <p>{item.userName}</p>
                <div className="">
                  <Rate
                    tooltips={desc}
                    disabled
                    value={item.rating}
                  />
                </div>
                <div
                  className="flex text-center"
                  style={{ alignItems: "center" }}
                >
                  <div>Thời gian: {formatDate(item.date)}</div>
                  {item?.size?.length > 0 ? (
                    <>
                      <div
                        className=" h-5 w-[2px] bg-[#c12c2c]"
                        style={{ margin: "0 5px" }}
                      ></div>
                      <div>Phân loại hàng: {item.size}</div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  Màu sắc: <span>đen</span>
                </div>
                <div>Bình luận: {item.comments}</div>
              </div>
            </div>
          </div>
        ))}
      </LoadingComponent>
      ): (
        <div className="flex items-center justify-center h-[400px] mr-[130px] text-[16px] md:text-[20px] text-[#ba3636]">Chưa có đánh giá</div>
      )}</>
      ),
    },
  ];


  return (
    <>
      <Outlet />
     <Box sx= {{
             position: 'sticky',
        top: 0,
        bottom: 0,
        height: '100dvh',
        overflowY: 'auto',
        width: '100%',
        px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
     }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Dashboard
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Orders
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
          Sản Phẩm
        </Typography>
        <Button
          color="primary"
          startDecorator={<AddCircleIcon />}
          size="sm"
          onClick={showModal}
        >
          Thêm sản phẩm
        </Button>

        {/* model addproduct */}
        <Modal
          title="Thêm sản phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Submit"
          width={600}
        >
          <LoadingComponent isLoading={isLoadingCreateProduct}>
            <Form
              name="basic"
              // labelCol={{
              //   span: 6,
              // }}
              // wrapperCol={{
              //   span: 17,
              // }}
              style={{
                maxWidth: 800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              form={form}
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập Tên sản phẩm",
                  },
                ]}
              >
                <Input
                  value={stateProduct.name}
                  onChange={(e) => handleOnchanges(null, e, "name")}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="Đường dẫn"
                name="slug"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  value={stateProduct.slug}
                  onChange={(e) => handleOnchanges(null, e, "slug")}
                  name="slug"
                  disabled
                />
              </Form.Item>

              <Form.Item
                label="Thể Loại"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập thể loại",
                  },
                ]}
              >
                <Select
                  onChange={handleChangeSelect}
                  name={productType !== "add_type" ? "type" : ""}
                  value={productType?.type}
                  options={renderOptions(productType?.data)}
                />
                {typeSelect === "add_type" ? (
                  <Input
                    style={{ marginTop: "5px" }}
                    value={stateProduct.type}
                    onChange={(e) => handleOnchanges(null, e, "type")}
                    name="type"
                  />
                ) : (
                  <Input
                    style={{ display: "none" }}
                    value={stateProduct.type}
                    onChange={(e) => handleOnchanges(null, e, "type")}
                    name="type"
                  />
                )}
              </Form.Item>

              {stateProduct?.categorySize?.map((item, index) => (
                <div key={index}>
                  <div className="flex">
                    <Form.Item
                      label={`Kích thước ${index}`}
                      name={`size${index}`}
                      rules={[
                        {
                          required: true,
                          message: "vui lòng nhập giá size",
                        },
                      ]}
                      className="w-full"
                    >
                      <Input
                        name="size"
                        value={item.size}
                        onChange={(e) =>
                          handleOnchanges(index, e, "categorySize")
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      label={`Giá ${index}`}
                      name={`price${index}`}
                      rules={[
                        {
                          required: true,
                          message: "vui lòng nhập giá sản phẩm",
                        },
                      ]}
                      className="ml-2 w-full"
                    >
                      <Input
                        name="price"
                        value={item.price}
                        onChange={(e) =>
                          handleOnchanges(index, e, "categorySize")
                        }
                        type="number"
                        min="0"
                      />
                    </Form.Item>
                    <Form.Item>
                      {index === 0 ? (
                        ""
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveInput(index)}
                        >
                          Xóa
                        </Button>
                      )}
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label={`Số lượng kho${index}`}
                      name={`counInStock${index}`}
                      rules={[
                        {
                          required: true,
                          message: "vui lòng nhập giá sản phẩm",
                        },
                      ]}
                      className="ml-2 w-full"
                    >
                      <Input
                        name="counInStock"
                        value={item.counInStock}
                        onChange={(e) =>
                          handleOnchanges(index, e, "categorySize")
                        }
                        className="w-20"
                        type="number"
                        min="0"
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Form.Item className="ml-[100px]">
                <Button onClick={handleAddInput} type="primary">
                  Thêm size
                </Button>
              </Form.Item>

              <Form.Item label="Màu sắc">
                <Switch defaultChecked={false} onChange={onChange} />
              </Form.Item>

              <Form.Item style={{display: valueSwitch === true ? "block" : 'none'}}>
              <div className="text-[red]">(Nếu có tắt vui lòng để check box trống tránh tình trạng lưu vào db)</div>
              <Checkbox.Group
                  style={{
                    width: "100%",
                    height: "200px", // Chiều cao cố định của Checkbox.Group
                    overflowY: 'auto' 
                  }}
                  onChange={onChangeCheckBox}
                >
                  <Row>
                    {dataAllColor?.data.map((item) => {

                      return (
                        <Col span={3}>
                        <Checkbox value={item._id}><div className="w-[20px] h-[20px]" style={{backgroundColor: item.hex}}></div></Checkbox>
                      </Col>
                      )
                    })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập Mô tả sản phẩm",
                  },
                ]}
              >
                <FroalaEditor
                  model={stateProduct.description}
                  onModelChange={(value) =>
                    handleOnchanges(null, { target: { value } }, "description")
                  }
                  config={{
                    placeholderText: "Nhập mô tả vào đây",
                    charCounterCount: true,
                  }}
                  tag="textarea"
                  name="description"
                />
              </Form.Item>
              <Form.Item
                label="Giảm giá sản phẩm"
                name="discount"
                rules={[
                  {
                    required: false,
                    message: "vui lòng nhập giá sản phẩm",
                  },
                ]}
              >
                <Input
                  value={stateProduct.discount}
                  onChange={(e) => handleOnchanges(null, e, "discount")}
                  name="discount"
                  className="w-20"
                  type="number"
                  min='0'
                  max='100'
                />
              </Form.Item>
              <Form.Item
                label="Link shopee"
                name="linksshopee"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input
                  value={stateProduct.linksshopee}
                  onChange={(e) => handleOnchanges(null, e, "linksshopee")}
                  name="linksshopee"
                />
              </Form.Item>

              <Form.Item
                name="image"
                label="Ảnh sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng thêm ảnh sản phẩm",
                  },
                ]}
              >
                <Upload
                  // onChange={handleOnchangeAvatar}
                  beforeUpload={handleChange}
                  listType="picture-card"
                  fileList={
                    stateProduct?.image.map((url, index) => ({
                      uid: index,
                      name: `image-${index}`,
                      status: "done",
                      url: url,
                    })) || []
                  }
                  onPreview={handlePreview}
                  onRemove={handleRemoveImage}
                >
                  {/* {stateProduct?.image.length ? null : uploadButton} */}
                  {uploadButton}
                </Upload>

                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}

                {stateProduct?.image.map((url, index) => (
        <Button
          key={index}
          onClick={() => handleReplaceImage(index)} // chỉ truyền index
          style={{ marginTop: 8 }}
        >
          Chỉnh sửa lại ảnh số {index+1}
        </Button>
      ))} 
              </Form.Item>

              <Form.Item>
                {data?.status === "ERR" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                    }}
                  >
                    {data?.message}
                  </div>
                )}

                {data?.status === 200 && (
                  <div
                    style={{
                      color: "#4fba69",
                      fontSize: "14px",
                      paddingTop: "10px",
                    }}
                  >
                    {data?.message}
                  </div>
                )}
              </Form.Item>
            </Form>
          </LoadingComponent>
        </Modal>

        <DrawerComponent
          width={720}
          title="Chỉnh sửa thông tin sản phẩm"
          isOpen={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
          extra={
            <Space>
              <Button onClick={() => setIsOpenDrawer(false)}>Cancel</Button>
              <Button onClick={onUpdateProduct} type="primary">
                Cập Nhập
              </Button>
            </Space>
          }
        >
          <LoadingComponent isLoading={isLoadingUpdate || dataUpdateisLoading}>
            <Form
              name="basic"
              // labelCol={{
              //   span: 10,
              // }}
              // wrapperCol={{
              //   span: ,
              // }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              form={form}
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điền tên sản phẩm",
                  },
                ]}
              >
                <Input
                  value={stateProductDetail.name}
                  onChange={(e) => handleOnchangeDetails(null, e, "name")}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="Đường dẫn"
                name="slug"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  value={stateProductDetail.slug}
                  onChange={(e) => handleOnchangeDetails(null, e, "slug")}
                  name="slug"
                  disabled
                />
              </Form.Item>

              <Form.Item
                label="Thể Loại"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập thể loại",
                  },
                ]}
              >
                <Select
                  onChange={handleChangeSelectDetail}
                  name={productType !== "add_type" ? "type" : ""}
                  value={stateProductDetail.type}
                  options={renderOptions(productType?.data)}
                />
                {typeSelectDetail === "add_type" ? (
                  <Input
                    style={{ marginTop: "5px" }}
                    value={stateProductDetail.type}
                    onChange={(e) => handleOnchangeDetails(null, e, "type")}
                    name="type"
                  />
                ) : (
                  <Input
                    style={{ display: "none" }}
                    value={stateProductDetail.type}
                    onChange={(e) => handleOnchangeDetails(null, e, "type")}
                    name="type"
                  />
                )}
              </Form.Item>
              <Form.List
                name="categorySize"
                rules={[
                  {
                    validator: async (_, categorySize) => {
                      if (!categorySize || categorySize.length < 2) {
                        return Promise.reject(
                          new Error("At least 2 passengers"),
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          label={`Kích thước ${key}`}
                          {...restField}
                          name={[name, "size"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập size",
                            },
                          ]}
                        >
                          <Input
                            value={name}
                            onChange={(e) =>
                              handleOnchangeDetails(key, e, "categorySize")
                            }
                            name="size"
                          />
                        </Form.Item>
                        <Form.Item
                          label={`Giá ${key}`}
                          {...restField}
                          name={[name, "price"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập giá",
                            },
                          ]}
                        >
                          <Input
                            value={name}
                            onChange={(e) =>
                              handleOnchangeDetails(key, e, "categorySize")
                            }
                            name="price"
                            type="number"
                            min="0"
                          />
                        </Form.Item>

                        <Form.Item
                          label={`Số lượng kho ${key}`}
                          {...restField}
                          name={[name, "counInStock"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số lượng kho",
                            },
                          ]}
                        >
                          <Input
                            value={name}
                            onChange={(e) =>
                              handleOnchangeDetails(key, e, "categorySize")
                            }
                            name="counInStock"
                            type="number"
                            min="0"
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(name);
                              handleRemoveInputDetail(name);
                            }}
                          />
                        ) : null}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          handleAddInputDetail();
                          add();
                        }}
                        icon={<PlusOutlined />}
                      >
                        Thêm kích thước
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item label="Màu sắc">
  <div className="text-[red]">(Nếu có tắt vui lòng để check box trống tránh tình trạng lưu vào db)</div>
  <Checkbox.Group
    style={{
      width: "100%",
      height: "200px", // Chiều cao cố định của Checkbox.Group
      overflowY: 'auto' 
    }}
    onChange={onChangeCheckBoxDetail }
    value={valIdColor}

  >
    {dataAllColor?.data.map((item) => (
      <Col span={3}>
        {/* Đảm bảo có key duy nhất cho mỗi phần tử trong danh sách */}
        <Checkbox value={item._id}>
          <div className="w-[20px] h-[20px]" style={{ backgroundColor: item.hex }}></div>
        </Checkbox>
      </Col>
    ))}
  </Checkbox.Group>
</Form.Item>
  <Form.Item>
    {/* Button để lưu dữ liệu */}
  <Button onClick={saveData} disabled={JSON.stringify(valIdColor) === JSON.stringify(stateProductDetail.idColor)}>Lưu màu</Button>
  </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập Mô tả sản phẩm",
                  },
                ]}
              >
                <FroalaEditor
                  model={stateProductDetail.description}
                  onModelChange={(value) =>
                    handleOnchangeDetails(
                      null,
                      { target: { value } },
                      "description",
                    )
                  }
                  config={{
                    placeholderText: "Nhập mô tả vào đây",
                    charCounterCount: true,
                  }}
                  tag="textarea"
                  name="description"
                />
              </Form.Item>

              <Form.Item
                label="Giảm giá sản phẩm"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập giảm giá sản phẩm",
                  },
                ]}
              >
                <Input
                  value={stateProductDetail.discount}
                  onChange={(e) => handleOnchangeDetails(null, e, "discount")}
                  name="discount"
                  className="w-20"
                  type="number"
                  min='0'
                  max='100'
                />
              </Form.Item>

              <Form.Item
                label="Link shopee"
                name="linksshopee"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input
                  value={stateProductDetail.linksshopee}
                  onChange={(e) => handleOnchangeDetails(null, e, "linksshopee")}
                  name="linksshopee"
                />
              </Form.Item>

              <Form.Item
                name="image"
                label="Ảnh sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng thêm ảnh sản phẩm",
                  },
                ]}
              >
                <Upload
                  beforeUpload={handleChangeDetail}
                  listType="picture-card"
                  fileList={
                    stateProductDetail?.image.map((url, index) => ({
                      uid: index,
                      name: `image-${index}`,
                      status: "done",
                      url: url,
                    })) || []
                  }
                  onPreview={handlePreviewDetail}
                  onRemove={handleRemoveImageDetail}
                >
                  {uploadButton}
                </Upload>

                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
                {stateProductDetail?.image.map((url, index) => (
        <Button
          key={index}
          onClick={() => handleReplaceImageDetail(index)} // chỉ truyền index
          style={{ marginTop: 8 }}
        >
          Chỉnh sửa lại ảnh số {index+1}
        </Button>
      ))}  
              </Form.Item>

              <Form.Item>
                {dataUpdate?.status === "ERR" && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      paddingTop: "10px",
                    }}
                  >
                    {dataUpdate?.message}
                  </div>
                )}
              </Form.Item>
            </Form>
          </LoadingComponent>
        </DrawerComponent>

        <ModalComponent
          isOpen={isModalOpenDelete}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
        >
          <LoadingComponent isLoading={dataDeleteisLoading}>
            <div style={{ textAlign: "center" }}>
              <WarningOutlined style={{ fontSize: "50px", color: "red" }} />
              <p>bạn có chắc chắn xóa dữ liệu này không?</p>
            </div>
          </LoadingComponent>
        </ModalComponent>

        <LoadingComponent isLoading={isLoadingProducts}>
          <OrderTable
            handleDeleteMany={handleDeleteMany}
            dataDeleteisLoadingMany={dataDeleteisLoadingMany}
            dataDeleteMany={dataDeleteMany}
            products={dataAllProduct}
            columns={columns}
            total={products?.total}
            pageCurrent={products?.pageCurrent}
            totalPages={products?.totalPage}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </LoadingComponent>
      </Box>

      <DrawerComponent
          width={720}
          title="Đánh giá sản phẩm"
          isOpen={isModalOpenView}
          onClose={() => setIsModalOpenView(false)}
        >
            <div
              className="flex bg-[#ece6e6] p-5"
              style={{ border: "1px solid red" }}
            >
              <div className="w-[120px] md:w-[200px] ">
              {averageRating ? (
                <div className="text-[1rem] text-[#ee4d2d] md:text-[1.125rem] ">
                  <span className="text-[1.125rem] text-[#ee4d2d] md:text-[1.875rem] ">
                    {averageRating?.toFixed(1)}
                  </span>{" "}
                  trên 5 với
                </div>
              ): (
                <div className="text-[1rem] text-[#ee4d2d] md:text-[1.125rem]">Chưa có đánh giá</div>
              )}
              </div>
              <div className="flex w-full flex-1" style={{ padding: "0 20px" }}>
                <Tabs defaultActiveKey="0" items={items} onChange={handleChangeReview}/>
              </div>
            </div>
        </DrawerComponent>
      </Box>
    </>
  );
}
