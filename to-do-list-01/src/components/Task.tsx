import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Task.module.css'
// import { TaskType } from './Tasks';

interface TaskProps {
    data: TaskType;
    onDeleteTask: (id: string) => void;
    onFinishTask: (id: string) => void;
}

export interface TaskType {
    id: string;
    content: string;
    isComplete: boolean;
}

export function Task({data, onDeleteTask, onFinishTask} : TaskProps, ) {
    function handleDeleteTask() {
        onDeleteTask(data.id)
    }

    function handleFinalizeTask() {
        onFinishTask(data.id)
    }
    
    return (
        <div className={styles.item}>
            <button className={styles.checkIcon} onClick={handleFinalizeTask}>
                {
                    data.isComplete
                      ? <CheckCircle size={20} color="#5E60CE" className={styles.checkCircle} weight="fill"/>
                      : <Circle size={20} color="#4EA8DE" className={styles.circle} weight="bold"/>
                  }
            </button>

            <span className={data.isComplete ? styles.taskComplete : styles.taskNotComplete}>{data.content}</span>

            <button className={styles.trashIcon} onClick={handleDeleteTask}>
                <Trash size={20} color="#808080"/>
            </button>
        </div>
    )
}