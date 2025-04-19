### **What is Reflected XSS?**

- **Reflected XSS** happens when data sent by the user (in the URL, form, or headers) is **immediately** returned in the web page's response **without proper validation or escaping**.
- This means the server **"reflects"** the input back in the page—like a mirror—but it doesn’t clean it, so attackers can inject malicious scripts.

---

### **Simple Example**

Imagine you go to:

```
http://localhost:3000/search?term=shoes
```

You see:

```html
<p>You searched for: shoes</p>
```

Now, an attacker changes the URL to:

```
http://localhost:3000/search?term=<script>alert('Hacked!')</script>
```

And the page shows:

```html
<p>You searched for: <script>alert('Hacked!')</script></p>
```

This runs the script in your browser!

---

### **What Can an Attacker Do with Reflected XSS?**

- Steal cookies or session tokens.
- Impersonate users.
- Change what the user sees.
- Send fake requests as the user.
- Spread malware by tricking users to click the malicious link.

---

### **How is it Delivered?**

Since reflected XSS is not stored, the attacker must **trick users** into clicking a malicious link, often through:

- Emails
- Social media
- Malicious ads
- Public posts with clickable links

---

### **Why Is It Dangerous?**

Even though it’s not stored on the website, it still:

- Runs with the victim’s permissions.
- Can fully hijack accounts.
- Can spread very quickly if shared.

---

### **How to Find Reflected XSS? (For Testers)**

1. **Test all inputs**: Query parameters, headers, form fields.
2. **Send unique test strings** and look for reflection in response.
3. **Check the context**: Is it inside a tag? A script? An attribute?
4. **Try basic payloads** like: `<script>alert(1)</script>`
5. **Use tools** like Burp Suite for automation.
6. **Confirm in browser** by checking if script runs.

---



| Type       | Where It's Stored     | How It's Triggered        |
|------------|------------------------|----------------------------|
| Reflected  | Not stored, immediate  | Triggered via a crafted URL |


---

### **How to Prevent Reflected XSS**

- **Escape HTML/JavaScript** outputs properly.
- **Use frameworks** with built-in XSS protection (e.g., React, Angular).
- **Validate and sanitize input.**
- **Use Content Security Policy (CSP).**

