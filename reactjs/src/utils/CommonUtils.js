class CommonUtils {
    static isNumber1 (number) {
        if (number === 1) return true;
        return false;
    }

    static nhan2so(a, b) {
    // Chuyển về string, loại bỏ khoảng trắng & ký tự không phải số hoặc dấu chấm
        const cleanA = String(a).replace(/[^\d.-]/g, '');
        const cleanB = String(b).replace(/[^\d.-]/g, '');

        const numA = Number(cleanA);
        const numB = Number(cleanB);

        if (isNaN(numA) || isNaN(numB)) {
            throw new Error(`Giá trị không hợp lệ: a=${a}, b=${b}`);
        }

        return numA * numB;
    }

    static isSubstring = (mainString, subString) => {
        if (!mainString || !subString) return false;
        return mainString.toLowerCase().includes(subString.toLowerCase());
    };

    static getCurrentMonth = () => {
        const today = new Date();
        return today.getMonth() + 1; // getMonth() trả về 0–11, nên +1
    };

    static getCurrentYear = () => {
        return new Date().getFullYear();
    };

    static formatNgay = (ngay) => {
        if (!ngay || typeof ngay !== 'string') return '';
        const parts = ngay.split('.');
        if (parts.length < 2) return '';

        const day = parseInt(parts[0], 10);   // loại bỏ số 0
        const month = parseInt(parts[1], 10); // loại bỏ số 0

        return `${day}.${month}`;
    };

    static formatMoney = (money) => {
        // Trường hợp null, undefined, hoặc chuỗi rỗng → trả về "0"
        if (money === null || money === undefined || money === '') return '0';

        // Bỏ khoảng trắng và ép thành số
        let num = Number(String(money).replace(/\s+/g, ''));

        // Nếu không phải số thì trả về "0"
        if (isNaN(num)) return '0';

        // Lấy giá trị tuyệt đối và format có khoảng trắng giữa các nhóm
        let absFormatted = Math.abs(num).toLocaleString('fr-FR'); // fr-FR dùng dấu cách

        // Nếu âm thì thêm "- " trước số, nếu dương thì trả về số
        return num < 0 ? `- ${absFormatted}` : absFormatted;
    };

    static getCurrentDateFormatted = () => {
        const now = new Date();
        const day = now.getDate();           // Không cần padStart
        const month = now.getMonth() + 1;    // Tháng tính từ 0 nên cộng thêm 1
        const year = now.getFullYear();

        return `${day}.${month}.${year}`;
    };

    static inHoaChuoi(str) {
        if (!str) return "";
        return str.toUpperCase();
    }

    static formatPhoneNumber(phone) {
        if (!phone) return "";
        // Xóa mọi ký tự không phải số
        const digits = phone.replace(/\D/g, "");
        // Chia nhóm mỗi 4 số và chấm
        return digits.replace(/(\d{4})(?=\d)/g, "$1.");
    }

    static formatPhone(phone) {
        if (!phone) return '';
        return phone.toString().replace(/\D/g, ''); // Xóa tất cả ký tự không phải số
    }

    static vietTatChucVu = (chucvu) => {
        if (!chucvu) return '';

        let cv = chucvu.trim().toLowerCase();

        if (cv === 'kỹ thuật' ) return 'kt';
        if (cv === 'part time' ) return 'pt';
        if (cv === 'full time' ) return 'ft';
        if (cv === 'quản lý' ) return 'ql';

        return chucvu; // giữ nguyên nếu không có trong danh sách viết tắt
    };

    static boDau(str = "") {
        return str
            .normalize("NFD")                    // tách ký tự + dấu
            .replace(/[\u0300-\u036f]/g, "")     // xóa toàn bộ dấu
            .replace(/đ/g, "d")                  // đ -> d
            .replace(/Đ/g, "D");                 // Đ -> D
        }
    }

export default CommonUtils;