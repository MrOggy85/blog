#!/usr/bin/env bash
# Makes the small cover images the index shows: static/thumbs/<slug>.webp, 504 px tall
# (a 168 px card on a 3x phone screen), from each post's `img:`. The full images are
# 2.5 MB at worst, and the index used to load all of them.
#
# Run after adding or changing a post's cover image, then commit the thumbs.
# Needs ImageMagick. Set CONVERT to override the command (on odin: CONVERT="tk convert").
set -euo pipefail
cd "$(dirname "$0")/.."
CONVERT=${CONVERT:-convert}
mkdir -p static/thumbs
for md in markdown/*.md; do
	slug=$(basename "$md" .md)
	img=$(sed -n 's/^img:[[:space:]]*//p' "$md" | head -1 | tr -d "\"'\r")
	src="static/$img"; out="static/thumbs/$slug.webp"
	[ -f "$src" ] || { echo "skip $slug: no $src" >&2; continue; }
	[ "$out" -nt "$src" ] && continue
	# [0] = first frame, so a GIF cover does not become an animation.
	$CONVERT "$src[0]" -resize 'x504>' -strip -quality 72 "$out"
	echo "$out $(stat -c %s "$out" 2>/dev/null || stat -f %z "$out") bytes"
done
