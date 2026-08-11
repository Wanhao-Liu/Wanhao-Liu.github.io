# SurgLAT Publication Addition Design

## Scope

Add SurgLAT to the complete bilingual Publications page as the first publication. Keep the four-item Selected Publications page unchanged.

## Publication Metadata

- Title: `SurgLAT: Surgical Latent Attention Tracking for Depth-Aware Robotic Laparoscope Control`
- Entry type and venue: 2026 arXiv preprint
- arXiv: `2608.07876`
- Webpage: `https://surglat-home-page.pages.dev/`
- PDF: `https://arxiv.org/pdf/2608.07876`
- Authors, in paper order: Rulin Zhou, Qiujie Song, Yujie Ma, An Wang, Wanhao Liu, Guoheng Ma, Yidu Wang, Guankun Wang, Xingrong Diao, Jiankun Wang, Chaowei Zhu, Xianming Liu, Hongliang Ren
- Equal contribution: the first three authors
- Corresponding author: Hongliang Ren

The title, author order, and abstract come from the arXiv HTML for version 1. The role markers follow the user's explicit instruction.

## Media And Links

Download the project webpage pipeline asset from `https://surglat-home-page.pages.dev/assets/method_cropped.png` to `public/images/SurgLAT/pipeline.png`. Reference the local copy through the existing `preview` field so the left-side media remains available even if cross-origin loading changes.

The title and pipeline image link to the project webpage. Resource actions expose Webpage, PDF, and arXiv. The abstract remains collapsed by default through the existing Publications component.

## Ordering And Selection

Place the BibTeX entry before all current entries. All 2026 preprints use August, and the parser preserves source order when year and month are equal, so SurgLAT renders first. Do not set `selected={true}` and do not add the ID to `selectedPublicationOrder`.

## Verification

Extend export verification to assert that:

- SurgLAT and arXiv `2608.07876` appear on the full Publications page.
- SurgLAT appears before Surg-UniWorld on the full Publications page.
- The pipeline asset and project webpage are present.
- The first three authors carry equal-contribution markers and Hongliang Ren carries the corresponding-author marker.
- SurgLAT does not appear on Selected Publications.
- The full publication count increases from 8 to 9 while Selected Publications remains at 4.

