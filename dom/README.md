
## What is DOM-Based XSS?

**DOM-Based Cross-Site Scripting (DOM XSS)** occurs when the vulnerability is in the **client-side JavaScript code**, not the server.

The malicious script is executed as a result of **modifying the DOM (Document Object Model)** in the browser using data from the URL or user input, **without proper validation or sanitization.**

---

### Key Points:

- Happens **entirely on the client-side**
- No server interaction is needed to trigger the attack
- Relies on JavaScript functions like `document.location`, `document.URL`, `document.write`, or `innerHTML`

---

### Simple Example:

Suppose a website has a script like:
```js
document.getElementById("message").innerHTML = location.hash;
```

An attacker can craft a URL like:
```
http://localhost:4000/#<script>alert('Hacked')</script>
```

When someone opens this URL, the script gets inserted directly into the page, and runs.

---

### Impact of DOM XSS:

- Similar to other XSS: steal data, hijack sessions, deface pages, or perform actions on behalf of the user.
- Dangerous because it can bypass some server-side protections.

---

### How to Prevent DOM XSS:

- **Avoid using `innerHTML`, `document.write`, etc.**
- Use `textContent` or other safer DOM methods
- Sanitize user input even on the client side
- Use libraries like **DOMPurify** to clean untrusted data

