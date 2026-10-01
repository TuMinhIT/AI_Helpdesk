import { Link } from "react-router-dom";
import assets from "@/assets/index";

const ShopName = () => {
  return (
    <div>
      <Link className="flex min-w-0 items-center gap-2.5 text-slate-900 group sm:gap-3" to={"/"}>
        <img src={assets.logo} alt="CT Group" className="h-9 w-12 shrink-0 rounded-xl object-cover shadow-md shadow-slate-900/20 transition-transform group-hover:scale-105 sm:h-10 sm:w-14" />
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1.5">
            <span className="hidden rounded bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-600 sm:inline">CT GROUP</span>
            <span className="truncate text-[10px] font-medium text-slate-400 sm:text-xs">CTERP App</span>
          </div>
          <span className="truncate text-base font-extrabold leading-tight tracking-tight text-slate-900 sm:text-lg">
            AI IT Copilot
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ShopName;
