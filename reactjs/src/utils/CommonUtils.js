class CommonUtils {
    static isNumber1 (number) {
        if (number === 1) return true;
        return false;
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
}

export default CommonUtils;