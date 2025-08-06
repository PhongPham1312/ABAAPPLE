class CommonUtils {
    static isNumber1 (number) {
        if (number === 1) return true;
        return false;
    }

    static isSubstring = (mainString, subString) => {
        if (!mainString || !subString) return false;
        return mainString.toLowerCase().includes(subString.toLowerCase());
    };
}

export default CommonUtils;