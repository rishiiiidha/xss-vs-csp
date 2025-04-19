
### **What is Stored XSS?**

Stored XSS happens when **malicious user input is saved (or stored) by the web application** and later shown to other users **without proper validation or escaping**.

---

### **Simple Example:**

Let’s say a website allows users to post comments on blog posts.

1. You (a normal user) write a comment like:  
   *“This post was great!”*

2. The application stores it in the database and shows it to others as:  
   ```html
   <p>This post was great!</p>
   ```

3. But if an attacker posts this instead:  
   ```html
   <script>alert('Hacked!');</script>
   ```

4. Then the application stores **that script** and shows it to other users. When someone views the page, the JavaScript runs automatically — **that’s stored XSS**.

---






| Reflected XSS                     | Stored XSS                          |
|----------------------------------|-------------------------------------|
| Script comes from the URL        | Script is saved in the app itself   |
| Requires user to click a link    | No action needed from other users   |
| One-time execution               | Executes every time a page is loaded |

---

### **Where Stored XSS Can Happen:**

- Blog comments
- Usernames or display names
- Product reviews
- Chat messages
- Feedback forms
- Profile descriptions

---

### **How to Identify It:**

1. Look for **entry points** — where user input is taken (forms, URL, headers).
2. Then check **exit points** — where that data is shown to other users.
3. Inject a test string like:  
   ```html
   <script>alert(1)</script>
   ```
4. If it appears and executes later, it’s stored XSS.

---

### **Mitigation (How to Prevent It):**

- **Escape output** properly before displaying user input in HTML.
- Use **Content Security Policy (CSP)**.
- Validate and sanitize input on both server and client sides.
- Use libraries or frameworks that automatically handle escaping.

---

