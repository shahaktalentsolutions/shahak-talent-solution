# Shahak Talent Solution — Fixed Website

## What changed

This version is designed to work as a **simple, low-cost WhatsApp-first website**.

- No Node.js or npm required.
- No Google Sheets or Google Apps Script required for the basic enquiry flow.
- Candidate registration opens WhatsApp with all entered details.
- Employer hiring enquiry opens WhatsApp with all entered details.
- Candidate CV cannot be attached automatically by a normal browser to WhatsApp; the user is clearly instructed to attach the selected CV in the WhatsApp chat after the message opens.
- Contact buttons use Shahak's WhatsApp number: **+91 99178 74676**.

## Run it

1. Extract the ZIP.
2. Double-click `index.html`.
3. Open Candidate Registration or Hire Talent.
4. Submit a test form.
5. WhatsApp should open with a pre-filled message.

If Windows opens the file in a browser, that is enough. There is no server requirement for this version.

## If WhatsApp does not open

- Make sure WhatsApp Web or WhatsApp Desktop is available, or use the browser's WhatsApp flow.
- Check that the number in `script.js` is correct.
- The configured number is `919917874676`.

## Important CV limitation

A website cannot silently upload a local CV directly into a WhatsApp chat using a normal `wa.me` link. The site therefore opens WhatsApp with the candidate's details and the CV filename, then asks the candidate to attach the CV manually.

## Later upgrade

Once Shahak starts receiving enough registrations, you can add a proper backend/database, candidate dashboard, recruiter login, employer login, job posting system, CV storage, and official WhatsApp Business API notifications.
