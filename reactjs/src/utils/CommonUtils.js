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
        if (!money) return '0';
        return parseInt(money, 10).toLocaleString('fr-FR'); // dùng locale có dấu cách
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