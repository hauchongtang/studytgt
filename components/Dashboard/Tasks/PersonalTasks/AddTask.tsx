import React from 'react'
import GridCardHeader from '../../../Common/GridCardHeader'

function AddTask() {
  return (
    <div className="col-span-full xl:col-span-6 bg-whiterounded-sm">
      <GridCardHeader text='Add a task' />
      <AddTaskForm />
    </div>
  )
}

export default AddTask

function AddTaskForm() {
  return (
    <form>
      <div className="px-8 pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Module Code</label>
        <input 
          type="text" 
          id="moduleCode" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
        />
      </div>
      <div className="px-8 py-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Duration</label>
        <input
          type="text" 
          id="duration" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
        />
      </div>
      <button
        type="submit"
        className="text-white
          bg-blue-700
          hover:bg-blue-800 
          focus:ring-4 
          focus:outline-none 
          focus:ring-blue-300 
          font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 
          dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-8 mt-2"
      >
        Submit
      </button>
    </form>
  )
}