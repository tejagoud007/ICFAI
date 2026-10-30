import { useState } from 'react'
import { GraduationCap, LayoutDashboard, BarChart3, Users, Settings, CheckCircle } from 'lucide-react'
import { ThinkingOrb } from 'thinking-orbs'
import { BorderBeam } from 'border-beam'
import StudentAnalytics from './components/StudentAnalytics'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white m-0">IAAS</h1>
            <p className="text-xs text-slate-400 m-0">Intelligent Academic Analytics System</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3.5 h-3.5" /> React + Tailwind CSS Configured
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950/40 p-4 space-y-2 hidden md:block">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <LayoutDashboard className="w-4 h-4" /> Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition">
              <BarChart3 className="w-4 h-4" /> Analytics & Reports
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition">
              <Users className="w-4 h-4" /> Student Profiles
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition">
              <Settings className="w-4 h-4" /> Settings
            </a>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 max-w-5xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Step 5 — Tailwind CSS & UI Setup</h2>
              <p className="text-slate-400 mt-1 text-sm">
                Tailwind CSS v4, TypeScript, path aliases (<code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded">@/*</code>), and shadcn foundation are configured.
              </p>
            </div>

            {/* Quick Setup Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="text-indigo-400 font-semibold text-sm">Stack</div>
                  <div className="text-lg font-bold text-white mt-1">Vite + React 19</div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Fast HMR and TypeScript build pipeline</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="text-emerald-400 font-semibold text-sm">Styling</div>
                  <div className="text-lg font-bold text-white mt-1">Tailwind CSS v4</div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Utility-first responsive design framework</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="text-cyan-400 font-semibold text-sm">Components</div>
                  <div className="text-lg font-bold text-white mt-1">shadcn / Lucide</div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Utility helpers & icon system ready</p>
              </div>
            </div>

            {/* Interactive Test Button */}
            <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-semibold text-white">Interactive State Verification</h3>
              <p className="text-xs text-slate-400">Click to verify state updates with Tailwind button styles.</p>
              <button
                type="button"
                onClick={() => setCount((c) => c + 1)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm rounded-lg transition shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer"
              >
                Count: {count}
              </button>
            </div>

            {/* AI Thinking State */}
            <BorderBeam size="md" colorVariant="colorful" strength={0.7} theme="dark">
              <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <ThinkingOrb state="working" size={20} />
                  AI Assistant Processing
                </h3>
                <p className="text-xs text-slate-400">The AI assistant is analyzing student profiles...</p>
                <div className="flex justify-center py-6">
                  <ThinkingOrb state="searching" size={64} />
                </div>
              </div>
            </BorderBeam>

            {/* Student Analytics */}
            <StudentAnalytics />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

