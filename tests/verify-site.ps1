$siteRoot = Split-Path -Parent $PSScriptRoot
$html = Get-Content -Raw (Join-Path $siteRoot 'index.html')

if ($html -notmatch '<link rel="canonical" href="https://wanhao-liu.github.io/">') {
  throw 'Root canonical URL is missing.'
}

if ($html -notmatch '<meta property="og:url" content="https://wanhao-liu.github.io/">') {
  throw 'Root Open Graph URL is missing.'
}

if ($html -match 'wanhao-liu.github.io/wanhaoliu') {
  throw 'Legacy URL remains in index.html.'
}

if (-not (Test-Path (Join-Path $siteRoot 'robots.txt'))) {
  throw 'robots.txt is missing.'
}

if (-not (Test-Path (Join-Path $siteRoot 'sitemap.xml'))) {
  throw 'sitemap.xml is missing.'
}

$requiredPublicationResources = @(
  'https://dl.acm.org/doi/10.65109/VJGN3439',
  'https://arxiv.org/abs/2602.11735',
  'https://ieeexplore.ieee.org/document/11348538/',
  'https://surg-uniworld.pages.dev/',
  'https://surg-uniworld.pages.dev/videos/control-modalities-model-comparison.mp4',
  'https://arxiv.org/pdf/2608.06770',
  'https://arxiv.org/abs/2608.06770'
)

foreach ($resource in $requiredPublicationResources) {
  if ($html -notmatch [regex]::Escape($resource)) {
    throw "Publication resource is missing: $resource"
  }
}

if ($html -notmatch [regex]::Escape("hideblock('surguniworld_abs');")) {
  throw 'Surg-UniWorld abstract is not hidden on page load.'
}

if ($html -notmatch [regex]::Escape('Rulin Zhou<sup>*</sup>, <b>Wanhao Liu</b><sup>*</sup>')) {
  throw 'Surg-UniWorld equal-contribution markers are missing.'
}
