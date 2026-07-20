#!/usr/bin/env sh
set -e

# Regenerate prismicio-types.d.ts from the local models and fail if the result
# differs from what is committed. Nothing regenerates types automatically since
# the move off Slice Machine, so without this a model change can land with stale
# types and only surface as a type error later.
#
# This compares local models against local types, which needs no Prismic auth.
# It does NOT detect models changed in the Prismic UI but never pulled — run
# `npx prismic status` for that.

# Only run when models or the generated types are staged.
if git diff --cached --quiet -- customtypes 'src/slices/**/model.json' prismicio-types.d.ts; then
  exit 0
fi

BEFORE=$(mktemp)
cp prismicio-types.d.ts "$BEFORE"

npx --yes prismic gen types >/dev/null 2>&1

if ! diff -q "$BEFORE" prismicio-types.d.ts >/dev/null 2>&1; then
  cp "$BEFORE" prismicio-types.d.ts
  rm -f "$BEFORE"
  echo "prismicio-types.d.ts is out of date with the models in customtypes/ and src/slices/."
  echo "Run 'npx prismic gen types' and stage the result."
  exit 1
fi

rm -f "$BEFORE"
