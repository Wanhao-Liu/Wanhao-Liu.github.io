# Selected Publications and Awards Design

## Goal

Move the four selected publications from the homepage to dedicated bilingual pages while keeping the complete Publications pages unchanged. Replace the homepage publication section with a bilingual Awards module modeled after the reference site's grouped honors presentation.

## Navigation and Routes

- `Selected Publications` / `精选论文` links to `/{locale}/selected-publications/`.
- `Publications` / `论文` continues to link to `/{locale}/publications/`.
- The selected page contains CrossScope, AC-MASAC, Surg-UniWorld, and EndoWAM in that order.
- The complete page continues to contain all eight publications, including NCGR, with its filters and resources unchanged.

## Homepage Awards

The homepage replaces the selected-publication rows with an unframed Awards section grouped into Academic Honors and Competitions. Awards are localized in dedicated TOML files rather than hardcoded in React.

Academic Honors:

- First-Class Scholarship (Top 3%), Guangdong University of Technology, Sep 2024 - Sep 2025.
- Outstanding Student Leader Award, Guangdong University of Technology, Sep 2024 - Sep 2025.
- Advanced Individual Award, Guangdong University of Technology, Sep 2023 - Sep 2024.

Competitions:

- National Second Prize, National University Students Smart Car Competition, Jun 2025 - Sep 2025; Top 5% out of 200+ teams.
- Third Prize, National University Student Smart Car Competition, South China Division, Jul 2024 - Aug 2024.

## Verification

Component tests cover navigation and Awards rendering. Static-export checks cover both selected routes, both complete routes, homepage absence of publication cards, sitemap entries, selected ordering, and NCGR remaining exclusive to the complete Publications page.

