export default {
  async fetch(request, env) {
    // Fetch the original response from Convertri
    let response = await fetch(request);

    // Clone headers and add security headers
    let headers = new Headers(response.headers);

    // Strict-Transport-Security (HSTS) – 2 years, includes subdomains, preload
    headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );

    // Content-Security-Policy – strict but compatible with Convertri
    headers.set(
      "Content-Security-Policy",
      "default-src 'self' https: data:; " +
      "script-src 'self' https: blob: 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' https: 'unsafe-inline'; " +
      "img-src 'self' https: data: blob:; " +
      "font-src 'self' https: data:; " +
      "connect-src 'self' https:; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "frame-src 'self' https:; " +
      "frame-ancestors 'none';"
    );

    // X-Frame-Options – strict clickjacking protection
    headers.delete("X-Frame-Options"); // remove any existing header
    headers.set("X-Frame-Options", "DENY");

    // X-Content-Type-Options – prevent MIME sniffing
    headers.set("X-Content-Type-Options", "nosniff");

    // Referrer-Policy – privacy
    headers.set("Referrer-Policy", "same-origin");

    // X-XSS-Protection – basic XSS protection
    headers.set("X-XSS-Protection", "1; mode=block");

    // Clone the response body
    const body = response.body;

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  }
};
