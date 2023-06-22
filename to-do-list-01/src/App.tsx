import { Header } from './components/Header'
import { Tasks } from './components/Tasks'
import { TaskType } from './components/Task'
import styles from './App.module.css'
import './global.css'
import { v4 as uuidv4 } from 'uuid';

const tasks: TaskType[] = [
  {
    id: uuidv4(),
    content: '', 
    isComplete: false,
  }
]

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>

        <main>
          {tasks.map(task => {
            return (
              <Tasks 
                key={task.id}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}

