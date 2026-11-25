# Contact form automation

`n8n-contact-form.workflow.json` receives submissions from both forms on the
site (the home page section and `/contact`) and emails them to the team.

## Import it

1. In n8n: **Workflows → Import from File** and pick the JSON.
2. Open **Email the team** and attach an SMTP credential. Adjust `fromEmail` if
   your provider requires a verified sender.
3. **Save**, then **Activate**.
4. Copy the **Production** URL from the *Contact form webhook* node. It looks
   like `https://<your-n8n-host>/webhook/guyshore-contact`.

The test URL (`/webhook-test/...`) only accepts one call after you press
"Listen for test event". Use the production URL for the deployed site.

## Point the site at it

Set the variable in whatever runs the site:

```
N8N_CONTACT_WEBHOOK_URL=https://<your-n8n-host>/webhook/guyshore-contact
```

Locally that means a `.env.local` file; on Netlify it is
**Site configuration → Environment variables**. The variable is read server-side
only, inside the `submitContact` server action, so the URL is never exposed to
the browser.

Until the variable is set the form still validates and reports success, but the
submission only reaches the server log. `src/app/contact/actions.ts` warns when
this happens.

## What arrives

The site posts JSON:

| Field | Notes |
| --- | --- |
| `name`, `email`, `message` | always present, validated before sending |
| `source` | `home` or `contact-page`, from a hidden field on each form |
| `company`, `need` | always empty today: both forms render the short variant. They fill in if a form is switched to `fields="full"` |
| `submittedAt` | ISO timestamp |

The workflow rejects anything missing `email` or `message` and answers
`{"ok": false, ...}`. The site treats that body as a failure regardless of the
HTTP status, because `responseCode` on the *Respond to Webhook* node is not
honoured by every n8n version — a rejection can come back as 200.

## "Talk to the author" (blog posts)

`n8n-author-contact.workflow.json` is the workflow **GuyShore blog: talk to the author** on the
`black-elephant` n8n Cloud instance. It receives the form that opens from the contact block inside
every blog post and from the line at the end of the article, and sends two Gmail messages through
the `business@guyshore.com` Gmail OAuth2 credential:

1. **To the team** (business@guyshore.com): the message, the reader's name and email, the article,
   the language, which button they used, and whether they opted in to new posts. Reply-To is the reader.
2. **To the reader**, in their language (en or pt-PT), with **business@guyshore.com in cc** and
   Reply-To business@: a copy of their message and a link back to the blog.

The HTML of both emails is built in the *Build emails* Code node, which escapes everything the
visitor typed and only ever links back to guyshore.com. If the copy to the reader fails (a bad
address), the node continues, so the team email still counts as delivered.

The site posts to `N8N_AUTHOR_WEBHOOK_URL` (production URL:
`https://black-elephant.app.n8n.cloud/webhook/guyshore-author-contact`), set in `.env.local` and,
before this ships, in Netlify. Payload: `name`, `email`, `message`, `newsletter` (boolean),
`lang`, `articleTitle`, `articleUrl`, `position` (`middle` or `end`), `source`
(`blog-author`), `submittedAt`. A missing name, invalid email or empty message gets
`{"ok": false}` with a 400.

Note: the live contact-form workflow also sends through Gmail now; the SMTP node in
`n8n-contact-form.workflow.json` is older than what runs in n8n.
