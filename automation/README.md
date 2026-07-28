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

The workflow rejects anything missing `email` or `message` with a 400, which the
site surfaces as an error rather than a false success.
