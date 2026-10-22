export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Keep runtime patch evidence in private platform logs.
    console.info("[security-runtime] Node.js", process.version);
  }
}
