import type { KnowledgeArticle, KnowledgeArticleInput } from "@/types/knowledgeArticleType";

const now = "2026-10-01T08:00:00Z";
const mockArticles: KnowledgeArticle[] = [
  {
    id: "kb-vpn",
    title: "Hướng dẫn kết nối VPN CT Group",
    content: "Mở VPN Client, chọn CT Group VPN, đăng nhập tài khoản CTERP và hoàn tất MFA.",
    source: "VPN Guide",
    tags: "VPN, Network, Remote Work",
    status: "Published",
    version: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "kb-wifi",
    title: "Xử lý lỗi Wi-Fi Limited Access",
    content: "Tắt/bật Wi-Fi adapter, quên mạng CTGroup-Staff và đăng nhập lại bằng tài khoản doanh nghiệp.",
    source: "Network Troubleshooting SOP",
    tags: "Wi-Fi, Network, Troubleshooting",
    status: "Published",
    version: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "kb-account",
    title: "Khôi phục mật khẩu tài khoản CTERP",
    content: "Xác minh danh tính bằng OTP và tạo mật khẩu mới theo chính sách bảo mật của CT Group.",
    source: "Account Management SOP",
    tags: "Account, Password, IAM",
    status: "Published",
    version: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "kb-bsod",
    title: "Chẩn đoán lỗi màn hình xanh BSOD",
    content: "Thu thập crash dump, kiểm tra driver gần đây, chạy Windows Memory Diagnostic và chuyển IT Engineer khi cần.",
    source: "Hardware Troubleshooting SOP",
    tags: "Hardware, BSOD, Windows",
    status: "Published",
    version: 1,
    createdAt: now,
    updatedAt: now,
  },
];

const clone = (article: KnowledgeArticle): KnowledgeArticle => ({ ...article });

export const knowledgeBaseService = {
  getAll: async (): Promise<KnowledgeArticle[]> => mockArticles.map(clone),
  getById: async (id: string): Promise<KnowledgeArticle | null> => {
    const article = mockArticles.find((item) => item.id === id);
    return article ? clone(article) : null;
  },
  create: async (input: KnowledgeArticleInput): Promise<KnowledgeArticle> => {
    const article: KnowledgeArticle = {
      ...input,
      id: `kb-demo-${mockArticles.length + 1}`,
      status: input.status ?? "Draft",
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockArticles.unshift(article);
    return clone(article);
  },
  update: async (id: string, input: KnowledgeArticleInput): Promise<KnowledgeArticle | null> => {
    const index = mockArticles.findIndex((item) => item.id === id);
    if (index < 0) return null;
    mockArticles[index] = {
      ...mockArticles[index],
      ...input,
      status: input.status ?? mockArticles[index].status,
      version: mockArticles[index].version + 1,
      updatedAt: new Date().toISOString(),
    };
    return clone(mockArticles[index]);
  },
  reindex: async (id: string) => Boolean(mockArticles.find((article) => article.id === id)),
};
