# Content Security Policy (CSP) Levels 

Content Security Policy is a security feature that helps prevent cross-site scripting (XSS) and other code injection attacks by controlling which resources can be loaded and executed on a web page. CSP uses different directives and values to establish varying levels of security. Here's a breakdown of different CSP levels and the keywords used in each:

## CSP Levels Overview

### No CSP
- **Description**: No protection against XSS attacks
- **Implementation**: No CSP header is set
- **Vulnerability**: All injection vectors can be exploited

### Basic CSP
- **Description**: Minimal protection that still allows inline scripts
- **Implementation**: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src *; object-src 'none'; base-uri 'self';`
- **Protection Level**: Blocks some advanced XSS attacks but allows many common vectors

### Moderate CSP
- **Description**: Blocks inline scripts but allows same-origin scripts
- **Implementation**: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'self'`
- **Protection Level**: Blocks most XSS attacks but requires script modifications

### Strict CSP
- **Description**: Uses nonces for script validation and blocks most attack vectors
- **Implementation**: `default-src 'none'; script-src 'self' 'nonce-{random}'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'`
- **Protection Level**: Highest protection, requiring nonces for all scripts

## CSP Directive Keywords Explained

### Source Lists

- **`'self'`**: Allows resources from the same origin (same domain, protocol, and port)
- **`'unsafe-inline'`**: Allows inline JavaScript and CSS (opens up XSS vulnerabilities)
- **`'unsafe-eval'`**: Allows the use of `eval()` and similar functions (security risk)
- **`'none'`**: Blocks all sources of the specified type
- **`'nonce-{random}'`**: Allows scripts with a matching nonce attribute (one-time code)
- **`'strict-dynamic'`**: Allows scripts loaded by trusted scripts (trust propagation)
- **`*`**: Wildcard that allows resources from any source (weakens security)
- **`data:`**: Allows data URI schemes (can be exploited)
- **`https:`**: Allows loading resources only over HTTPS

### Resource Directives

- **`default-src`**: Fallback for other resource types when they don't have a specific policy
- **`script-src`**: Controls which scripts can be executed
- **`style-src`**: Controls which styles can be applied
- **`img-src`**: Controls which images can be loaded
- **`connect-src`**: Controls which URLs can be loaded using script interfaces (fetch, XHR)
- **`font-src`**: Controls which fonts can be loaded
- **`object-src`**: Controls which plugins can be loaded (Flash, Java)
- **`media-src`**: Controls which audio and video can be loaded
- **`frame-src`**: Controls which URLs can be loaded in frames
- **`worker-src`**: Controls which Workers, SharedWorkers, or ServiceWorkers can be loaded

### Document Directives

- **`base-uri`**: Restricts the URLs that can be used in a document's `<base>` element
- **`form-action`**: Restricts the URLs that can be used as the target of form submissions
- **`frame-ancestors`**: Restricts the parents that may embed the page (protects against clickjacking)
- **`navigate-to`**: Restricts the URLs to which the document can navigate

### Reporting Directives

- **`report-uri`**: Specifies a URL where CSP violations should be reported (deprecated)
- **`report-to`**: Newer version of report-uri that uses the Report-To HTTP header

## Analyzing Each CSP Level

### Basic CSP Breakdown
```
default-src 'self';                  # Default: only allow same-origin sources
script-src 'self' 'unsafe-inline';   # Allow same-origin scripts AND inline scripts
style-src 'self' 'unsafe-inline';    # Allow same-origin styles AND inline styles
img-src *;                           # Allow images from any source
object-src 'none';                   # Block plugins like Flash and Java
base-uri 'self';                     # Restrict <base> element to same origin
```

**Security Impact**: This configuration blocks loading scripts from external domains (except through JSONP or other bypasses) but still allows inline scripts including event handlers, making it vulnerable to many XSS attacks.

### Moderate CSP Breakdown
```
default-src 'self';                  # Default: only allow same-origin sources
script-src 'self';                   # Only allow same-origin scripts, NO inline scripts
style-src 'self';                    # Only allow same-origin styles, NO inline styles
img-src 'self';                      # Only allow same-origin images
object-src 'none';                   # Block plugins like Flash and Java
base-uri 'self';                     # Restrict <base> element to same origin
```

**Security Impact**: This removes the 'unsafe-inline' exception, blocking inline scripts and event handlers. This configuration blocks most XSS attacks but requires all JavaScript to be in external files.

### Strict CSP Breakdown
```
default-src 'none';                  # Default: block everything unless explicitly allowed
script-src 'self' 'nonce-{random}';  # Only allow same-origin scripts with matching nonce
style-src 'self';                    # Only allow same-origin styles
img-src 'self';                      # Only allow same-origin images
connect-src 'self';                  # Only allow same-origin XHR/fetch
font-src 'self';                     # Only allow same-origin fonts
object-src 'none';                   # Block plugins like Flash and Java
base-uri 'none';                     # Block <base> element completely
form-action 'self';                  # Only allow forms to submit to same origin
frame-ancestors 'none';              # Block this page from being embedded (anti-clickjacking)
```

**Security Impact**: This is the most restrictive configuration. The default-src 'none' blocks all resource types unless explicitly allowed. Scripts must have a matching nonce attribute (randomly generated for each page load), preventing inline scripts, event handlers, and unauthorized external scripts.

