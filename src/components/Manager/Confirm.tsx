import React from 'react'
import '../style.css'
interface ConfirmProps {
  visible: boolean
  handleOk: () => void
  handleCancel: () => void
}
export default function Confirm(props: ConfirmProps) {
  const { visible, handleOk, handleCancel } = props

  return (
    <div>
      {visible && (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)]  flex justify-center items-center'>
          <div className='min-w-32 min-h-20 bg-slate-200'>
            <h2 className='text-center text-lg my-3 '>Are you sure?</h2>
            <div className='flex justify-center items-center my-3'>
              <button
                onClick={handleOk}
                className='px-4 py-2 border min-w-20 bg-red-600 text-white border-[#333] mx-2 text-black'
              >
                OK
              </button>
              <button onClick={handleCancel} className='px-4 py-2 border min-w-20 border-[#333] mx-2 text-black'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
