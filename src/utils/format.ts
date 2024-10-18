import { CreateTask, Task } from "@/interfaces/task";
import dayjs from "dayjs";
import { v4 } from "uuid";

function toLS(value: CreateTask): Task {
    return {
        ...value,
        created_at: new Date(),
        id: v4(),
    };
}

function FromDatetoString(date: Date) {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    return formattedDate;
}

const format = {
    toLS,
    FromDatetoString,
};

export default format;
