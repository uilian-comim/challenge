import { CreateTask, Task } from "@/interfaces/task";
import utils from "@/utils";

interface Query {
    nameOrDescription?: string | null;
    priority?: string | null;
    orderBy?: string | null;
    sort?: string | null;
}

function sortItems(
    items: Task[],
    orderBy: "name" | "description" | "priority" | "created_at",
    sort: "asc" | "desc"
) {
    return items.sort((a: Task, b: Task) => {
        if (sort === "asc") {
            return a[orderBy] > b[orderBy] ? 1 : -1;
        } else {
            return a[orderBy] < b[orderBy] ? 1 : -1;
        }
    });
}

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

function getItem(key: string, query?: Query, page: number = 1) {
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

        if (query && query.orderBy && query.sort) {
            const sortedData = sortItems(
                filteredData,
                query.orderBy as
                    | "name"
                    | "description"
                    | "priority"
                    | "created_at",
                query.sort as "asc" | "desc"
            ).slice((page - 1) * 10, page * 10);

            return {
                data: sortedData,
                total: filteredData.length,
            };
        }
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
