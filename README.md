# Egg Drop Challenge Pages

This repository contains a GitHub Pages-friendly site that walks 4th grade engineers through every stage of the Egg Drop Challenge: Ask, Explore, Model, Evaluate, and Explain. Each page includes curated resources, actionable checklists, and a shared navigation wheel so teams can jump between phases.

## Project Structure

```
.
├── index.html
├── ask.html
├── explore.html
├── model.html
├── evaluate.html
├── explain.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── design-wheel.svg
```

## Preview Locally

You can serve the static site using any local web server. A quick option with Python is shown below:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser. The design wheel and question cycling script load correctly when served over HTTP.

## Deploy with GitHub Pages

1. Commit and push the latest changes to the branch you want to publish (typically `main`).
2. In your repository settings, open **Pages**.
3. Under **Source**, choose **Deploy from a branch** and select the branch and `/ (root)` directory.
4. Click **Save**. GitHub Pages will build the site and provide a public URL.
5. Share the URL with students and update resources as the challenge evolves.

Once configured, new commits to the selected branch will automatically update the live site after GitHub Pages finishes its build.
