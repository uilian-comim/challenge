import { CreateTask, Task } from "@/interfaces/task";
import { v4 } from "uuid";
import { Dayjs } from "dayjs";

function toLS(value: CreateTask): Task {
    return {
        ...value,
        created_at: new Date(),
        id: v4(),
    };
}

function toString(date: Date) {
    const formattedDate = new Dayjs(date).format("DD/MM/YYYY");
    return formattedDate;
}

const format = {
    toLS,
    toString,
};

export default format;
