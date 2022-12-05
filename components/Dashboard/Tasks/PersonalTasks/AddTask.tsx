import { duration } from 'moment';
import React, { useState } from 'react'
import { MdEventBusy } from 'react-icons/md';
import GridCardHeader from '../../../Common/GridCardHeader'

interface IAddTaskProps {
  addNewTask: (newTask: any) => void
}

function AddTask(props: IAddTaskProps) {
  const { addNewTask } = props;

  return (
    <div className="col-span-full xl:col-span-6 bg-whiterounded-sm">
      <GridCardHeader text='Add a task' />
      <AddTaskForm addNewTask={addNewTask} />
    </div>
  )
}

export default AddTask

function AddTaskForm({ addNewTask }: any) {
  const [inputs, setInputs] = useState({ name:"", moduleCode: "", duration: "0" });

  const handleChange = (event: any) => {
    let inputId: string = event.target.id;
    let value: string = event.target.value;
    if (inputId === "moduleCode") {
      setInputs(() => ({ name: inputs.name, moduleCode: value, duration: inputs.duration }))
    } 

    if (inputId === "duration") {
      setInputs(() => ({ name: inputs.name, moduleCode: inputs.moduleCode, duration: value }))
    }

    if (inputId === "name") {
      setInputs(() => ({ name: value, moduleCode: inputs.moduleCode, duration: inputs.duration }))
    }
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addNewTask(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-8 pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Task Name</label>
        <input 
          type="text" 
          id="name" 
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
        />
      </div>
      <div className="px-8 pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Module Code</label>
        <input 
          type="text" 
          id="moduleCode" 
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required 
        />
      </div>
      <div className="px-8 py-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">Duration</label>
        <input
          type="text" 
          id="duration" 
          onChange={handleChange}
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