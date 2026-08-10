# Homepage Publications Label Design

## Scope

- Rename the English top navigation item from `Selected Publications` to `Publications` because it links to the complete publications page.
- Keep the English homepage section heading as `Selected Publications`.
- Remove NCGR from the homepage selected-publication list only.
- Keep NCGR and all of its resources on the complete publications page.
- Keep the existing Chinese labels unchanged.

## Implementation Boundary

The navigation label will be updated in the shared English labels. The homepage selection logic will explicitly exclude the NCGR publication ID while preserving the existing order for CrossScope, AC-MASAC, Surg-UniWorld, and EndoWAM. Publication source data will not be deleted or changed.

## Verification

Component tests will verify that the navigation says `Publications`, the homepage heading still says `Selected Publications`, and the homepage list omits NCGR while retaining the other four works in order. The full test, content-validation, lint, typecheck, build, and static-export checks will run before deployment.
