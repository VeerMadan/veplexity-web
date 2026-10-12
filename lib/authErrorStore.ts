// Thread-safe in-memory store for transient OAuth error diagnostics
let lastAuthError: { message: string; timestamp: number } | null = null;

export function recordAuthError(err: any) {
  let message = "Unknown OAuth error";
  if (typeof err === "string") {
    message = err;
  } else if (err instanceof Error) {
    message = `${err.name}: ${err.message}${err.cause ? ` (${JSON.stringify(err.cause)})` : ""}`;
  } else if (err && typeof err === "object") {
    message = err.message || err.error || JSON.stringify(err);
  }
  lastAuthError = {
    message,
    timestamp: Date.now(),
  };
}

export function getLastAuthError(): string | null {
  if (!lastAuthError) return null;
  // Expire after 60 seconds
  if (Date.now() - lastAuthError.timestamp > 60000) {
    lastAuthError = null;
    return null;
  }
  return lastAuthError.message;
}
