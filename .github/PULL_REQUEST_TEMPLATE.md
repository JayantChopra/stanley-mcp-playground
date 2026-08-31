## What this changes

<!-- One or two sentences. What can a reader do after this lands that they couldn't before? -->

## Type

- [ ] New recipe
- [ ] New or changed skill
- [ ] Fix to existing recipe or docs
- [ ] Site
- [ ] Tooling / CI

## Checklist

- [ ] I ran this recipe or skill against a real Stanley account and it works as written.
- [ ] `python3 tools/lint.py` passes.
- [ ] If recipes changed, I rebuilt the site (`node tools/build-site.mjs`) and committed the output.
- [ ] No secrets, tokens, or personal account data anywhere in the diff.
- [ ] Skills keep the hard approval rules intact (see SECURITY.md).
