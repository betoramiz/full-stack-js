import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateUser } from "../../usecases/create.usecase.ts";
import type { UserQueries } from "../../users.queries.ts";

describe("CreateUser UseCase", () => {
  let mockUserQueries: UserQueries;
  let useCase: CreateUser;

  beforeEach(() => {
    mockUserQueries = {
      findById: vi.fn(async () => null),
      save: vi.fn(async () => {}),
      getAll: vi.fn(async () => []),
    };

    useCase = new CreateUser(mockUserQueries);
  });

  it("debe fallar si el nombre del usuario tiene menos de 3 caracteres", async () => {
    const command = {
      name: "Ab", // Nombre muy corto (debe ser >= 3)
      email: "test@example.com",
    };

    const result = await useCase.execute(command);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.statusCode).toBe(400);
      expect(result.error.message).toContain("El nombre debe tener al menos 3 caracteres.");
    }

    // Verificar que no se llamó a la persistencia
    expect(mockUserQueries.save).not.toHaveBeenCalled();
  });

  it("debe crear un usuario exitosamente si el nombre y email son válidos", async () => {
    const command = {
      name: "John Doe",
      email: "john@example.com",
    };

    const result = await useCase.execute(command);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name).toBe("John Doe");
      expect(result.value.email).toBe("john@example.com");
      expect(result.value.id).toBeDefined();
      expect(result.value.isActive).toBe(true);
    }

    // Verificar que se llamó a la persistencia con la entidad de dominio User
    expect(mockUserQueries.save).toHaveBeenCalled();
  });
});
