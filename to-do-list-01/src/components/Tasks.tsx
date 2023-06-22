import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Tasks.module.css'
import { Clipboard, PlusCircle } from 'phosphor-react'
import { Task, TaskType } from './Task';
import { v4 as uuidv4 } from 'uuid';


export function Tasks() {
    const [taskList, setTaskList] = useState<TaskType[]>([])

    const [addNewTask, setAddNewTask] = useState('')
    
    function handleAddTask(event: FormEvent) {
        event.preventDefault()
        
        setTaskList([
            ...taskList,
            { 
                id: uuidv4(),
                content: addNewTask,
                isComplete: false
            }
        ])

        setAddNewTask('')
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setAddNewTask(event.target.value)
    }

    function deleteTask(idTask: string) {
        const taskListWithoutDeletedOne = taskList.filter(task => {
            return task.id != idTask;
        })

        setTaskList(taskListWithoutDeletedOne)
    }

    function finishTask(idTask: string) {
        const taskListWithoutCompletedOne = taskList.filter(task => {
            if (task.id == idTask){
                task.isComplete = !task.isComplete;
            };
            return task;
        })

        setTaskList(taskListWithoutCompletedOne)
    }

    const numberOfTasks = taskList.length;
    const numberOfTasksCompleted = taskList.filter(task => task.isComplete == true).length;
    
    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={handleAddTask}>
                <input 
                    type="text" 
                    className={styles.input} 
                    placeholder='Adicione uma nova tarefa'
                    value={addNewTask}
                    onChange={handleNewTaskChange}
                    required
                />
                <button type='submit' className={styles.button}>Criar <PlusCircle size={15}/></button>
            </form>

            <div className={styles.headerTasks}>
                <strong className={styles.created}>Tarefas criadas <span className={styles.tasksCount}>{numberOfTasks}</span></strong>
                <strong className={styles.done}>Concluídas <span className={styles.tasksCount}>{numberOfTasksCompleted} de {numberOfTasks}</span></strong>
            </div>

            <div className={styles.card}>
                {taskList.length == 0 ? (
                    <div className={styles.emptyCard}>                    
                        <Clipboard size={55}/>
                        <div className={styles.messageEmpty}>
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </div>
                    </div>
                ): (
                    <div className={styles.taskList}>
                        {taskList.map(t => {
                            return (
                                <Task 
                                    key={t.id}
                                    onDeleteTask={deleteTask}
                                    onFinishTask={finishTask}
                                    data={t}
                                />
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

