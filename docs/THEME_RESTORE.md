# Restore original blue/red appearance

Do not push Git changes without fresh user permission.

When the user says "reverse", remove the palette.css and identity.css stylesheet
links from frontend/index.html and restore theme-color to #003776. Keep every
other stylesheet, script and backend change. The original platform.css,
brand.css, civic.css and journey.css are preserved. This restores the original
blue/red appearance without reverting road coverage or weather fixes.

The active cool-indigo theme is applied by identity.css after palette.css.
Its core palette is Cadet Grey `#959BB5`, Chinese Black `#0A1123`,
American Blue `#3A3E6C`, Ube `#8387C3`, and Cool Grey `#8A8CAC`.
atelier.css is an inactive earlier experiment.
