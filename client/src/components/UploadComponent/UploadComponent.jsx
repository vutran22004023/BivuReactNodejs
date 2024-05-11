import React, { useState, useEffect } from "react";
import { Upload, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { imgDB, txtDB } from "../../Firebase/config";
const UploadImage = ({
  setInforPageDetail,
  InforPageDetail,
  valueImge,
  amount,
  valueName,
}) => {
  const [dataImage, setDataImage] = useState([]);
  const handleChange = async (file) => {
    try {
      const uploadedURLs = [];

      const imgs = ref(imgDB, `Logo/${v4()}`);
      const uploadTaskSnapshot = await uploadBytes(imgs, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      // Thêm URL của ảnh vừa upload vào mảng
      uploadedURLs.push(downloadURL);

      // Cập nhật state của dataImage với mảng các URL của ảnh đã upload
      setDataImage(uploadedURLs);

      return false; // return false để ngăn việc tải tệp lên tự động
    } catch (error) {
      console.error("Error uploading files: ", error);
      return false; // Xử lý lỗi và trả về false để ngăn tệp được tải lên tự động
    }
  };

  
  const handlePreview = async (file) => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }
    setPreviewImage(file.thumbUrl);
    setPreviewVisible(true);
  };
  const handleRemoveImage = async (file) => {
    try {
      // Sau khi xóa thành công từ Firebase Storage, cập nhật trạng thái của ứng dụng bằng cách loại bỏ ảnh khỏi mảng stateProduct.image
      const newImages = valueImge.filter(
        (image) => image !== file.url,
      );
      setInforPageDetail({ ...InforPageDetail, [valueName]: newImages });

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  useEffect(() => {
    // Khi dataImage thay đổi, cập nhật stateProduct với giá trị mới
    setInforPageDetail({ ...InforPageDetail, [valueName]: dataImage });
  }, [dataImage, setInforPageDetail, valueName]);

  return (
    <Upload
      listType="picture-card"
      fileList={
        valueImge.map((url, index) => ({
          uid: index,
          name: `image-${index}`,
          status: "done",
          url: url,
        })) || []
      }
      beforeUpload={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemoveImage}
    >
      {valueImge.length === amount ? null : (
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
      )}
    </Upload>
  );
};

export default React.memo(UploadImage);
