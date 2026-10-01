import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Users } from "lucide-react";
import UserFeature from "@/components/admin/user_component/UserFeature";
import UserTable from "@/components/admin/user_component/UserTable";
import { userService } from "@/services/userService";
import type { User } from "@/types/userType";
import Spinner from "@/components/common/Spinner";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const nextUsers = await userService.getAll();
      setUsers(nextUsers);
      setError("");
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Không thể tải người dùng.");
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    let active = true;
    void userService.getAll().then((nextUsers) => {
      if (active) {
        setUsers(nextUsers);
        setError("");
        setIsLoading(false);
      }
    }).catch((caughtError: unknown) => {
      if (active) setError(caughtError instanceof Error ? caughtError.message : "Không thể tải người dùng.");
    });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users;
    return users.filter((user) =>
      [user.name, user.email, user.phoneNumber ?? "", user.role]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [searchTerm, users]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Accounts</p>
        <h1 className="text-2xl font-bold text-slate-900">Người dùng</h1>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users size={17} className="text-indigo-600" /> {filtered.length} người dùng
        </div>
        <button type="button" onClick={() => { setIsFetching(true); void loadUsers(); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          {isFetching ? <Spinner /> : <RefreshCw size={16} />} Làm mới
        </button>
      </div>
      {error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <p className="font-medium text-red-700">{error}</p>
          <button type="button" onClick={() => void loadUsers()} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white">Thử lại</button>
        </div>
      ) : (
        <>
          <UserFeature data={filtered} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <UserTable displayed={filtered} loading={isLoading} />
        </>
      )}
    </div>
  );
}
