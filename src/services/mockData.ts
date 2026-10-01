import type { User } from "@/types/userType";

export const mockUsers: User[] = [
  {
    id: "usr-admin-01",
    name: "GASCOLAE ADMIN",
    email: "admin@gmail.com",
    role: "Admin",
    phoneNumber: "0908 123 456",
    address: "CT Group Head Office - Tầng 4",
    isActive: true,
  },
  {
    id: "usr-engineer-01",
    name: "Lê Đình Linh",
    email: "engineer@ctgroup.com",
    role: "ITEngineer",
    phoneNumber: "0912 345 678",
    address: "CT Group Head Office - SysAdmin Team",
    isActive: true,
  },
  {
    id: "usr-manager-01",
    name: "Nguyễn Văn Trí",
    email: "manager@ctgroup.com",
    role: "ITManager",
    phoneNumber: "0933 999 888",
    address: "CT Group AI Center",
    isActive: true,
  },
  {
    id: "usr-employee-01",
    name: "Lê Văn A",
    email: "employee@ctgroup.com",
    role: "User",
    phoneNumber: "0977 111 222",
    address: "Phòng Kế toán — CT Group Head Office",
    isActive: true,
  },
  {
    id: "usr-employee-02",
    name: "Trần Thị B",
    email: "employee2@ctgroup.com",
    role: "User",
    phoneNumber: "0988 333 444",
    address: "Phòng Nhân sự HR — CT Group Head Office",
    isActive: true,
  },
];

export const MOCK_PASSWORD = "123456";

export const cloneUser = (user: User): User => ({ ...user });
