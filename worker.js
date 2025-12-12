export default {
  async fetch(request, env) {
    // Fetch the original page from Convertri
    let response = await fetch(request);

    // Clone headers and add security headers
    let headers = new Headers(response.headers);

    // Strict-Transport-Security (HSTS)
    headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );

    // Content-Security-Policy (CSP)
    headers.set(
      "Content-Security-Policy",
      "default-src 'self' https: data:; " +
      "script-src 'self' https: 'unsafe-inline' 'unsafe-eval' blob:; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "frame-src 'self' https:; " +
      "frame-ancestors 'none';"
    );

    // X-Frame-Options (Clickjacking protection)
    headers.set("X-Frame-Options", "DENY");

    // X-Content-Type-Options (prevent content sniffing)
    headers.set("X-Content-Type-Options", "nosniff");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  }
};
