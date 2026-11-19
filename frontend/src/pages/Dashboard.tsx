



import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import DashboardHero from '../components/DashboardHero'
import StatsCards from '../components/StatsCards'
import QuestionGenerator from '../components/QuestionGenerator'

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#080d1b] text-slate-100">

      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">

        <Header />

        <section className="space-y-8 p-6 lg:p-8">
          <DashboardHero />
          <StatsCards />
          <QuestionGenerator />
        </section>

      </main>

    </div>
  )
}

export default Dashboard
