# EvoByte website

Humble code. Powerful workflows.

The evobyte.dev site: one `index.html` plus `assets/`. Plain HTML, CSS and JavaScript, no build step.

- `assets/hero-intro.mp4` plays once on load (streaks build the EB mark, 2.5 s, 60 fps).
- `assets/hero-scrub.mp4` is driven by scroll (the EB grows into EVO BYTE, 60 fps). Its first frame matches the intro's last frame.
- Phones and reduced-motion visitors get a still hero and never download the videos.

Deployed on Vercel as a static site (`vercel.json` sets the framework to Other). Preview locally with any static server, for example `npx http-server .`, then open the printed localhost address.

The previous Next.js version of the site is in the git history and on the `New-Design` branch.
