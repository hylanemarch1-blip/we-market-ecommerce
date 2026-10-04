import type { UserRole } from "@prisma/client";

declare module "@auth/core/types" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role: UserRole;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}
