import type { Profile, User } from "@/types/userType";
import { cloneUser, mockUsers } from "./mockData";

const getCurrentUserId = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as { id?: string }).id : undefined;
  } catch {
    return undefined;
  }
};

export const userService = {
  getAll: async (): Promise<User[]> => mockUsers.map(cloneUser),

  getProfile: async (): Promise<Profile> => {
    const user = mockUsers.find((candidate) => candidate.id === getCurrentUserId()) ?? mockUsers[3];
    return cloneUser(user);
  },

  updateProfile: async (data: Profile): Promise<Profile> => {
    const index = mockUsers.findIndex((user) => user.id === data.id);
    if (index >= 0) mockUsers[index] = { ...mockUsers[index], ...data };
    const updated = index >= 0 ? mockUsers[index] : data;
    localStorage.setItem("user", JSON.stringify({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    }));
    return cloneUser(updated);
  },
};
