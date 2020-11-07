export interface Task {
    id: string;
    label: string;
    type: TaskType;
    status: TaskStatus;
    author: string;
    recipients: string[];
    created: number;
    updated: number;
}

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in-progress',
    DONE = 'done'
}

export enum TaskType {
    RECORDING = 'recording',
    MIXING = 'mixing',
}