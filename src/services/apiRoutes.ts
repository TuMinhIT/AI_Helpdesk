export const API_ROUTES = {
  auth: {
    root: "/api/v1/auth",
    register: "/api/v1/auth/register",
    login: "/api/v1/auth/login",
    refresh: "/api/v1/auth/refresh-token",
    logout: "/api/v1/auth/logout",
  },
  users: {
    root: "/api/v1/users",
    all: "/api/v1/users/all",
    profile: "/api/v1/users/me",
  },
  products: {
    root: "/api/v1/products",
    byId: (id: string) => "/api/v1/products/" + id,
    images: (productId: string) => "/api/v1/products/" + productId + "/images",
    imageById: (productId: string, imageId: string) =>
      "/api/v1/products/" + productId + "/images/" + imageId,
  },
  categories: {
    root: "/api/v1/categories",
    byId: (id: string) => "/api/v1/categories/" + id,
  },
  repairServices: {
    root: "/api/v1/repair-services",
    byId: (id: string) => "/api/v1/repair-services/" + id,
  },
  orders: {
    root: "/api/v1/orders",
    byId: (id: string) => "/api/v1/orders/" + id,
    byUser: (userId: string) => "/api/v1/orders/user/" + userId,
    mine: "/api/v1/orders/me",
    status: (id: string) => "/api/v1/orders/" + id + "/status",
  },
  addresses: {
    root: "/api/v1/address",
    mine: "/api/v1/address/me",
    byId: (id: string) => "/api/v1/address/me/" + id,
  },
  payments: {
    checkout: (orderId: string) => "/api/v1/payments/" + orderId + "/checkout",
  },
  sepay: {
    ipn: "/api/v1/payments/sepay/ipn",
  },
  knowledgeArticles: {
    root: "/api/v1/knowledge-articles",
    bulk: "/api/v1/knowledge-articles/bulk",
    byId: (id: string) => "/api/v1/knowledge-articles/" + id,
    reindex: (id: string) => "/api/v1/knowledge-articles/" + id + "/reindex",
  },
  rag: {
    ask: "/api/v1/rag/ask",
    search: "/api/v1/rag/search",
    feedback: "/api/v1/rag/feedback",
  },
  uploads: {
    image: "/api/v1/uploads/image",
    images: "/api/v1/uploads/images",
    imageById: (id: string) => "/api/v1/uploads/images/" + id,
  },
  unsupported: {
    cart: "/api/v1/cart",
    variants: "/api/v1/variants",
    coupons: "/api/v1/coupons",
    notifications: "/api/v1/notifications",
    googleLogin: "/api/v1/auth/google",
    changePassword: "/api/v1/auth/change-password",
    resetPassword: "/api/v1/auth/reset-password",
  },
} as const;

export class UnsupportedEndpointError extends Error {
  readonly status = 501;
  constructor(endpoint: string) {
    super("Backend endpoint chưa được cung cấp: " + endpoint);
    this.name = "UnsupportedEndpointError";
  }
}
