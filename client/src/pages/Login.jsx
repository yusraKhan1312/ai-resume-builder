import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'

const Login = () => {

  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(window.location.search)
  const urlState = queryParams.get("state")

  const [state, setState] = React.useState(urlState || "login")

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)  
      toast.success(data.message)
    } catch (error) {
      toast(error?.response?.data?.message || error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4'>
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full text-center bg-white border border-slate-200 rounded-2xl px-8 shadow-sm">

        <h1 className="text-slate-900 text-4xl mt-10 font-semibold">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-slate-500 text-sm mt-2">Please {state === "login" ? "login" : "sign up"} to continue</p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#90a1b9" />
            <input type="text" name="name" placeholder="Name"
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 border-none outline-none"
              value={formData.name} onChange={handleChange} required />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={16} color="#90a1b9" />
          <input type="email" name="email" placeholder="Email id"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 border-none outline-none"
            value={formData.email} onChange={handleChange} required />
        </div>

        <div className="flex items-center mt-4 w-full bg-slate-50 border border-slate-200 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={16} color="#90a1b9" />
          <input type="password" name="password" placeholder="Password"
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 border-none outline-none"
            value={formData.password} onChange={handleChange} required />
        </div>

        {/* <div className="mt-4 text-left">
          <button className="text-sm text-green-600 hover:underline">
            Forget password?
          </button>
        </div> */}

        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-700 transition">
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() => setState(prev => prev === "login" ? "register" : "login")}
          className="text-slate-500 text-sm mt-4 mb-11 cursor-pointer">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <span className="text-green-600 hover:underline ml-1">click here</span>
        </p>
      </form>
    </div>
  )
}

export default Login
