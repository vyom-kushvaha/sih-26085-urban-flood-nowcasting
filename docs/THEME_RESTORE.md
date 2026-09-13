# Restore original blue/red appearance

When the user says "reverse", remove the palette.css and atelier.css stylesheet
links from frontend/index.html and restore theme-color to #003776. Keep every
other stylesheet, script and backend change. The original platform.css,
brand.css, civic.css and journey.css are preserved. This restores the original
blue/red appearance without reverting road coverage or weather fixes.

The garden redesign is exclusively in atelier.css and palette.css.
