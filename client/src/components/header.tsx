import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">BoilerScheduler</h1>
            </div>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  location === "/"
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Dashboard
              </Link>
              <Link
                href="/calendar"
                className={cn(
                  "px-3 py-2 text-sm font-medium",
                  location === "/calendar"
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Calendar
              </Link>
            </div>
          </nav>
          <div className="md:hidden">
            <button className="text-slate-600 hover:text-slate-900">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
