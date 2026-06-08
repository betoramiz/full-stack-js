import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetUserById } from "../../usecases/getById.usecase.ts";
import { User } from "../../User.ts";
import type { UserQueries } from "../../users.queries.ts";

describe("GetUserById UseCase", () => {
  let mockUserQueries: UserQueries;
  let useCase: GetUserById;

  beforeEach(() => {
    mockUserQueries = {
      findById: vi.fn(async () => null),
      save: vi.fn(async () => {}),
      getAll: vi.fn(async () => []),
    };

    useCase = new GetUserById(mockUserQueries);
  });

  it("debe fallar con error 404 (NotFound) si el usuario no existe", async () => {
    const userId = "non-existent-uuid";

    const result = await useCase.execute(userId);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.statusCode).toBe(404);
      expect(result.error.message).toContain("User Not Found");
    }

    // Verificar que se buscó usando el id correcto
    expect(mockUserQueries.findById).toHaveBeenCalledWith(userId);
  });

  it("debe retornar la información simplificada del usuario si existe", async () => {
    const userId = "existing-uuid";
    const existingUser = User.reconstitute({
      id: userId,
      name: "Alice Smith",
      email: "alice@example.com",
      isActive: true,
    });

    mockUserQueries.findById = vi.fn(async () => existingUser);

    const result = await useCase.execute(userId);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.id).toBe(userId);
      expect(result.value.name).toBe("Alice Smith");
      // email no debe ser devuelto en Response de GetUserById
      expect((result.value as any).email).toBeUndefined();
    }

    expect(mockUserQueries.findById).toHaveBeenCalledWith(userId);
  });
});
