import { useState } from 'react'
import Confirm from './Confirm'
import styles from './manager.module.scss'

const initialStudents = [
  {
    id: 1,
    name: 'Ducky'
  },
  {
    id: 2,
    name: 'Alex'
  }
]

export default function Manager() {
  const [students, setStudents] = useState<typeof initialStudents>(initialStudents)
  const [idDelete, setIdDelete] = useState<null | number>(null)
  const visibleValue = idDelete !== null

  const handleConfirm = (id: number) => {
    setIdDelete(id)
  }
  const handleDelete = () => {
    setStudents((prev) => prev.filter((student) => student.id !== idDelete))
    handleCancelDelete()
  }
  const handleCancelDelete = () => {
    setIdDelete(null)
  }
  return (
    <div className={styles.manager}>
      <h1>Manage student</h1>
      <div>
        <table className={styles.table}>
          <thead className={styles.th}>
            <tr className={styles.tr}>
              <td className={styles.td}>Id</td>
              <td className={styles.td}>Name</td>
              <td className={styles.td}>Action</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr className={styles.tr} key={student.id}>
                  <td className={styles.td}>{student.id}</td>
                  <td className={styles.td}>{student.name}</td>
                  <td className={styles.td}>
                    <button
                      className={styles.button}
                      onClick={() => {
                        handleConfirm(student.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Confirm handleOk={handleDelete} handleCancel={handleCancelDelete} visible={visibleValue} />
    </div>
  )
}
