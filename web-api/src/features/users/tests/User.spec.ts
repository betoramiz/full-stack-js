import { describe, it, expect } from "vitest";
import { User } from "../User.ts";

describe("User Domain Entity", () => {
  it("debe fallar al crear un usuario con un nombre menor a 3 caracteres", () => {
    const result = User.create("Ab", "test@example.com", "uuid-123");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.statusCode).toBe(400);
      expect(result.error.message).toContain("El nombre debe tener al menos 3 caracteres.");
    }
  });

  it("debe instanciar correctamente un usuario válido con estado activo por defecto", () => {
    const result = User.create("Alice Smith", "alice@example.com", "uuid-123");
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const primitives = result.value.toPrimitives();
      expect(primitives.id).toBe("uuid-123");
      expect(primitives.name).toBe("Alice Smith");
      expect(primitives.email).toBe("alice@example.com");
      expect(primitives.isActive).toBe(true);
    }
  });

  it("debe permitir reconstituir un usuario con propiedades existentes sin aplicar validaciones de creación", () => {
    // Reconstitute permite nombres cortos o estados inactivos si ya estaban guardados
    const reconstituted = User.reconstitute({
      id: "uuid-123",
      name: "Ab", // Nombre corto (que fallaría en create)
      email: "test@example.com",
      isActive: false, // Inactivo
    });

    expect(reconstituted).toBeInstanceOf(User);
    
    const primitives = reconstituted.toPrimitives();
    expect(primitives.id).toBe("uuid-123");
    expect(primitives.name).toBe("Ab");
    expect(primitives.email).toBe("test@example.com");
    expect(primitives.isActive).toBe(false);
  });

  it("debe retornar una copia correcta del estado interno al llamar a toPrimitives", () => {
    const userResult = User.create("John Doe", "john@example.com", "uuid-999");
    expect(userResult.ok).toBe(true);
    
    if (userResult.ok) {
      const user = userResult.value;
      const primitives1 = user.toPrimitives();
      const primitives2 = user.toPrimitives();
      
      // Debe ser el mismo contenido pero diferente referencia de objeto
      expect(primitives1).toEqual(primitives2);
      expect(primitives1).not.toBe(primitives2);
    }
  });
});
