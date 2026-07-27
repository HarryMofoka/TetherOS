/**
 * Security Input Sanitizer Utility
 * Prevents XSS, Script Injection, and Malicious HTML Payloads
 */

export function sanitizeString(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function sanitizeObject<T>(obj: T): T {
  if (typeof obj === "string") {
    return sanitizeString(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject) as unknown as T;
  }
  if (obj !== null && typeof obj === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized as T;
  }
  return obj;
}
