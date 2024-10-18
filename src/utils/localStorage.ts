import utils from "@/utils";

function setItem(key: string, value: string) {
    const formattedData = utils.format.toLS(JSON.parse(value));
    const existingData = localStorage.getItem(key);
    if (existingData && existingData.length > 0) {
        const parsedData = JSON.parse(existingData);
        localStorage.setItem(
            key,
            JSON.stringify([...parsedData, formattedData])
        );
        return;
    }
    localStorage.setItem(key, JSON.stringify([formattedData]));
}

function getItem(key: string) {
    const value = localStorage.getItem(key);
    return value;
}

const LS = {
    setItem,
    getItem,
};

export default LS;
