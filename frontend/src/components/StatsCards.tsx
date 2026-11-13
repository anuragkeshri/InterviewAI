
// import { FileQuestion, Users, TrendingUp } from 'lucide-react'

// function StatsCards() {
//   const stats = [
//     {
//       title: 'Questions Generated',
//       value: '0',
//       icon: FileQuestion,
//       color: 'bg-indigo-100 text-indigo-600',
//     },
//     {
//       title: 'Interview Sessions',
//       value: '0',
//       icon: Users,
//       color: 'bg-blue-100 text-blue-600',
//     },
//     {
//       title: 'AI Success Rate',
//       value: '—',
//       icon: TrendingUp,
//       color: 'bg-emerald-100 text-emerald-600',
//     },
//   ]

//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-2">
//       {stats.map((stat) => {
//         const Icon = stat.icon

//         return (
//           <div
//             key={stat.title}
//             className="rounded-2xl border-3 border-double border-blue-300 bg-white p-6 shadow-sm"
//           >
//             <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
//               <Icon size={23} />
//             </div>

//             <p className="text-sm text-slate-500">
//               {stat.title}
//             </p>

//             <h3 className="mt-2 text-3xl font-bold text-slate-900">
//               {stat.value}
//             </h3>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default StatsCards



import {
  FileQuestion,
  Users,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'

const stats = [
  {
    title: 'Questions Generated',
    value: '0',
    icon: FileQuestion,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    description: 'Total questions created',
  },
  {
    title: 'Interview Sessions',
    value: '0',
    icon: Users,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    description: 'Sessions conducted',
  },
  {
    title: 'AI Success Rate',
    value: '—',
    icon: TrendingUp,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    description: 'Available after generation',
  },
]

function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111A2E] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-950/20"
          >
            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" />

            <div className="relative flex items-start justify-between">

              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}>
                <Icon size={23} className={stat.iconColor} />
              </div>

              <ArrowUpRight
                size={18}
                className="text-slate-600 transition group-hover:text-indigo-400"
              />
            </div>

            <div className="relative mt-6">
              <p className="text-sm font-medium text-slate-400">
                {stat.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>

          </div>
        )
      })}

    </div>
  )
}

export default StatsCards
