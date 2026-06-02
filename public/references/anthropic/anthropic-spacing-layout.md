# Anthropic Spacing & Layout System

## Layout Columns
- **Container**: Full-width on mobile, restricted on desktop
- **Gutters**: Variable gutter system using multiple widths
- **Responsive Break**: 88vw + 2 rem tablet breakpoint

## Spacing Scale (Container-based)
- **gutter-small**: ~1rem
- **gutter-medium**: ~2rem (default site)
- **gutter-large**: ~3rem+

## Margin System
- **u-margin-trim**: Top margin cleared for rich text
- **Margin trim top**: Half-line height
- **Margin trim bottom**: Half-line height
- **Standard spacing**: clamp(1rem, 0.65rem + 0.65vw, 2rem)

## Grid System
- **Column count**: 4-12 columns responsive
- **Breakout grid**: 4-8 column multispace grid sections
- **Grid-main**: 100% width, single column for companding
- **Section height**: Fullheight use-events for hero areas

## Rhythm
- **Line height trim**: Content below baselines
- **Vertical rhythm**: Symbolic dimensions in Webflow theme
- **Compact structure**: Tight section-to-section spacing

## Editorial Sections
- **Title Subhead**: Body 1 + 1 line head
- **Body CTAs**: Button list with text links
- **List layouts**: 3-4 item rows, date before title
