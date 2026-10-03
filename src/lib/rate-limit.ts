interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const tracker = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of tracker.entries()) {
      if (record.resetAt <= now) {
        tracker.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * In-memory sliding window rate limiter for API endpoints.
 * @param identifier Client IP or fingerprint
 * @param limit Maximum allowed requests within duration
 * @param windowMs Duration window in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): { success: boolean; limit: number; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = tracker.get(identifier);

  if (!record || record.resetAt <= now) {
    tracker.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetAt: now + windowMs,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  record.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - record.count,
    resetAt: record.resetAt,
  };
}

/**
 * Extract client IP from standard reverse proxy headers
 */
export function getClientIp(request: Request): string {
  const headers = request.headers;
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
