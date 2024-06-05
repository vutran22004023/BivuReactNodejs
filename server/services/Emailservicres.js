import nodemailer from 'nodemailer';
import * as dotenv from "dotenv";
dotenv.config();
 const convertPrice = (price) => {
    try {
      const result = price?.toLocaleString().replaceAll(',','.')
      return `${result} VND`
    }catch(e) {
      return null;
    }
}
const sendEmailCreateOrder = async (newOrder) => {
    const { orderItem, totalPrice, fullName, address, city, phone, email,shippingPrice } = newOrder;
    // Tạo HTML cho email
    let htmlContent = `
        <div>
            <h2>Xác nhận Đơn Hàng</h2>
            <p>Xin chào ${fullName},</p>
            
            <p>Cảm ơn bạn đã đặt hàng tại shop Phật Giáo Bi Vũ. Dưới đây là chi tiết về đơn hàng của bạn:</p>
            
            <table border="1" cellpadding="10" cellspacing="0" style="width: 100%;">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Đơn Giá</th>
                        <th>Số Lượng</th>
                        <th>Thành Tiền</th>
                    </tr>
                </thead>
                <tbody>`;

    // Thêm từng mục trong đơn hàng vào bảng
    orderItem?.forEach((item, index) => {
        htmlContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${convertPrice(item.price)}</td>
                <td>${item.amount}</td>
                <td>${convertPrice(item.price * item.amount)}</td>
            </tr>`;
    });

    // Thêm tổng số tiền vào bảng
    htmlContent += `
                </tbody>
                <tfoot>
                <tr>
                        <td colspan="4" align="right"><strong>Phí ship:</strong></td>
                        <td>${convertPrice(shippingPrice)}</td>
                </tr>
                    <tr>
                        <td colspan="4" align="right"><strong>Tổng Số Tiền:</strong></td>
                        <td>${convertPrice(totalPrice)}</td>
                    </tr>
                </tfoot>
            </table>
            
            <p>Thông tin người đặt:</p>
            <ul>
                <li><strong>Họ và Tên:</strong> ${fullName}</li>
                <li><strong>Địa Chỉ:</strong> ${address}</li>
                <li><strong>Số Điện Thoại:</strong> ${phone}</li>
                <li><strong>Email:</strong> ${email}</li>
            </ul>
            
            <p>Xin vui lòng kiểm tra lại thông tin đơn hàng của bạn. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi.</p>
            
            <p>Trân trọng,</p>
            <p>Shop Phật Giáo Bi Vũ</p>
        </div>`;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    // Gửi email
    const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: "levu1962004@gmail.com",
        subject: "Chi tiết đơn hàng tại shop Phật Giáo Bi Vũ",
        html: htmlContent,
    });
};

export default {
    sendEmailCreateOrder
};
