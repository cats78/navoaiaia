NAVO AI - Vercel setup

Files:
- index.html (contains the full design, CSS and browser JavaScript)
- api/chat.js (Vercel serverless chat endpoint)
- package.json
- vercel.json

GitHub PC instructions:
1. In the repository root, use Add file > Upload files to upload index.html, package.json and vercel.json.
2. Use Add file > Create new file and enter api/chat.js as the filename. GitHub creates the api folder automatically from the slash. Paste the contents of api/chat.js and commit.
3. In Vercel, import/connect this repository. Framework Preset: Other. Leave Build Command and Output Directory blank/default. Root Directory should be the repository root.
4. Deploy. Test https://YOUR-PROJECT.vercel.app/api/chat. GET should return JSON with ok:true.
5. Connect domain in Vercel > Project Settings > Domains, and follow the exact DNS instructions shown there.

The chat has predefined responses and a limited DuckDuckGo Instant Answer lookup. It is not a full generative AI model. No hosting setup can be guaranteed error-free before deployment is tested.
