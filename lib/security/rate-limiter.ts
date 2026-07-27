/**
 * Sliding Window In-Memory IP Rate Limiter
 * Restricts request frequency per IP address to prevent spam and DDoS attacks
 */

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitStore>();

export function checkRateLimit(ip: string, limit = 60, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetTime) {
    ipMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}
