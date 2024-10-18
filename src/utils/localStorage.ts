import { CreateTask, Task } from "@/interfaces/task";
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

function getItem(
    key: string,
    query?: { nameOrDescription?: string | null; priority?: string | null },
    page: number = 1
) {
    const value = localStorage.getItem(key);
    if (value && value.length > 0) {
        const filteredData = JSON.parse(value).filter((item: Task) => {
            if (query && query.nameOrDescription && query.priority) {
                return (
                    (item.name
                        .toLowerCase()
                        .includes(query.nameOrDescription.toLowerCase()) &&
                        item.priority === query.priority) ||
                    (item.description
                        .toLowerCase()
                        .includes(query.nameOrDescription.toLowerCase()) &&
                        item.priority === query.priority)
                );
            }

            if (query && query.nameOrDescription) {
                return (
                    item.name
                        .toLowerCase()
                        .includes(query.nameOrDescription.toLowerCase()) ||
                    item.description
                        .toLowerCase()
                        .includes(query.nameOrDescription.toLowerCase())
                );
            }

            if (query && query.priority) {
                return item.priority === query.priority;
            }

            return true;
        });

        const parsedData = filteredData
            .sort(
                (a: Task, b: Task) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            )
            .slice((page - 1) * 10, page * 10);

        return {
            data: parsedData,
            total: filteredData.length,
        };
    }
}

function saveItem(key: string, oldTask: Task, value: CreateTask) {
    const existingData = localStorage.getItem(key);
    if (existingData && existingData.length > 0) {
        const parsedData = JSON.parse(existingData);
        const oldItemIndex = parsedData.findIndex(
            (item: Task) => item.id === oldTask.id
        );
        if (oldItemIndex > -1) {
            const newValue = {
                ...parsedData[oldItemIndex],
                ...value,
            };
            parsedData[oldItemIndex] = newValue;
            localStorage.setItem(key, JSON.stringify(parsedData));
            return;
        }
        return;
    }
    return;
}

function removeItem(key: string, id: string) {
    const existingData = localStorage.getItem(key);
    if (existingData && existingData.length > 0) {
        const parsedData = JSON.parse(existingData);
        const filteredData = parsedData.filter((item: Task) => item.id !== id);
        localStorage.setItem(key, JSON.stringify(filteredData));
    }
}

const LS = {
    setItem,
    getItem,
    saveItem,
    removeItem,
};

export default LS;
