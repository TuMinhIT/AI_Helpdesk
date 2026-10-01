import { useEffect, useMemo, useState } from "react";
import { FileText, Pencil, Plus, RefreshCw, Search, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { knowledgeBaseService } from "@/services/knowledgeBaseService";
import type { KnowledgeArticle, KnowledgeArticleInput, KnowledgeArticleStatus } from "@/types/knowledgeArticleType";

const emptyForm: KnowledgeArticleInput = { title: "", content: "", source: "", tags: "", status: "Draft" };

const KnowledgeBasePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditor = location.pathname.endsWith("/new") || Boolean(id);
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<KnowledgeArticleInput>(emptyForm);
  const [isLoading, setIsLoading] = useState(true);

  const loadArticles = async () => {
    const nextArticles = await knowledgeBaseService.getAll();
    setArticles(nextArticles);
    setIsLoading(false);
  };

  useEffect(() => {
    let active = true;
    void knowledgeBaseService.getAll().then((nextArticles) => {
      if (active) {
        setArticles(nextArticles);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!id) {
      Promise.resolve().then(() => setForm(emptyForm));
      return;
    }
    void knowledgeBaseService.getById(id).then((article) => {
      if (article) setForm({ title: article.title, content: article.content, source: article.source, tags: article.tags, status: article.status });
    });
  }, [id]);

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("vi-VN");
    return articles.filter((article) => [article.title, article.content, article.tags ?? "", article.source ?? ""].some((value) => value.toLocaleLowerCase("vi-VN").includes(term)));
  }, [articles, search]);

  const saveArticle = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title?.trim() || !form.content?.trim()) {
      toast.error("Vui lòng nhập tiêu đề và nội dung tài liệu.");
      return;
    }
    if (id) await knowledgeBaseService.update(id, form);
    else await knowledgeBaseService.create(form);
    toast.success("Đã lưu tài liệu Knowledge Base.");
    navigate("/admin/knowledge-base");
    await loadArticles();
  };

  if (isEditor) {
    return (
      <section className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">Knowledge Base / Mock Data</p><h1 className="mt-1 text-2xl font-black text-slate-900">{id ? "Chỉnh sửa tài liệu" : "Thêm tài liệu"}</h1></div>
          <button type="button" onClick={() => navigate("/admin/knowledge-base")} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Quay lại</button>
        </div>
        <form onSubmit={saveArticle} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <label className="block text-sm font-semibold text-slate-700">Tiêu đề<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700">Nguồn<input value={form.source ?? ""} onChange={(event) => setForm({ ...form, source: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500" /></label>
            <label className="block text-sm font-semibold text-slate-700">Tags<input value={form.tags ?? ""} onChange={(event) => setForm({ ...form, tags: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500" /></label>
          </div>
          <label className="block text-sm font-semibold text-slate-700">Trạng thái<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as KnowledgeArticleStatus })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-normal outline-none focus:border-cyan-500"><option value="Draft">Draft</option><option value="Published">Published</option><option value="Archived">Archived</option></select></label>
          <label className="block text-sm font-semibold text-slate-700">Nội dung<textarea rows={10} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" /></label>
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-900"><Sparkles size={16} /> Lưu tài liệu</button>
        </form>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">Knowledge Base / Mock Data</p><h1 className="mt-1 text-2xl font-black text-slate-900">Tài liệu AI</h1><p className="mt-1 text-sm text-slate-500">Dữ liệu mẫu dùng cho RAG prototype khi backend chưa có API thật.</p></div><Link to="/admin/knowledge-base/new" className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-700"><Plus size={17} /> Thêm tài liệu</Link></div>
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><FileText size={17} className="text-cyan-600" /> {filteredArticles.length} tài liệu</div><div className="relative w-full sm:w-80"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm tài liệu..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cyan-500" /></div></div>
      {isLoading ? <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white"><RefreshCw className="animate-spin text-cyan-600" /></div> : <div className="grid gap-4 md:grid-cols-2">{filteredArticles.map((article) => <article key={article.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><div className="rounded-xl bg-cyan-50 p-2 text-cyan-700"><FileText size={18} /></div><div className="min-w-0"><h2 className="font-bold text-slate-900">{article.title}</h2><p className="mt-1 text-xs text-slate-500">{article.source || "Internal SOP"}</p></div></div><Link to={`/admin/knowledge-base/${article.id}/edit`} className="rounded-lg p-2 text-slate-400 hover:bg-cyan-50 hover:text-cyan-700" aria-label={`Sửa ${article.title}`}><Pencil size={16} /></Link></div><p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{article.content}</p><div className="mt-4 flex flex-wrap gap-2">{(article.tags ?? "").split(",").filter(Boolean).map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{tag.trim()}</span>)}</div></article>)}</div>}
    </section>
  );
};

export default KnowledgeBasePage;
