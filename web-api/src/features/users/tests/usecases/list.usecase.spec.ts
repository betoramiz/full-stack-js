import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetList } from "../../usecases/list.usecase.ts";
import type { UserQueries } from "../../users.queries.ts";

describe("GetList UseCase", () => {
  let mockUserQueries: UserQueries;
  let useCase: GetList;

  beforeEach(() => {
    mockUserQueries = {
      findById: vi.fn(async () => null),
      save: vi.fn(async () => {}),
      getAll: vi.fn(async () => []),
    };

    useCase = new GetList(mockUserQueries);
  });

  it("debe devolver una lista vacía si no hay usuarios en el sistema", async () => {
    mockUserQueries.getAll = vi.fn(async () => []);

    const result = await useCase.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
    expect(mockUserQueries.getAll).toHaveBeenCalled();
  });

  it("debe devolver la lista completa de usuarios si existen registros", async () => {
    const mockUsers = [
      { id: "uuid-1", name: "Alice", email: "alice@example.com" },
      { id: "uuid-2", name: "Bob", email: "bob@example.com" },
    ];

    mockUserQueries.getAll = vi.fn(async () => mockUsers);

    const result = await useCase.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ id: "uuid-1", name: "Alice", email: "alice@example.com" });
    expect(result[1]).toEqual({ id: "uuid-2", name: "Bob", email: "bob@example.com" });
    expect(mockUserQueries.getAll).toHaveBeenCalled();
  });
});
