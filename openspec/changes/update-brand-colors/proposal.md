# Proposal: Update Brand Colors

## Intent
Align CSS color palette with logo colors (#34ccca turquoise, #8c974b olive). Current variables use unrelated blues/golds that don't reflect brand identity. **Critical finding**: logo primary #34ccca fails WCAG AA on white (1.97:1), requiring darker shades for text/buttons.

## Scope

### In Scope
- Replace `css/styles.css` `:root` variables with logo-derived palette
- Add accessible dark shades meeting WCAG AA 4.5:1 contrast
- Define warm red accent (#c0392b) to complement cool primary palette
- Document all variables with usage guidance in CSS comments

### Out of Scope
- HTML/markup changes
- Dark mode implementation
- Asset or image updates

## Capabilities

### New Capabilities
- `brand-color-palette`: Logo-aligned color system with WCAG AA compliance

## Approach
1. **Primary family** (turquoise): `--primary-1: #1a7a7a` (dark, 5.05:1 on white for text/CTA), `--primary-2: #34ccca` (logo, decorative only), `--primary-3: #66e0de` (light, hovers), `--primary-4: #0d5c5c` (darker, active states)
2. **Secondary family** (olive): `--secondary-1: #6e7a3c` (dark, 4.58:1 on white for text), `--secondary-2: #F5F7FB` (keep light gray background), `--secondary-3: #8c974b` (logo, section backgrounds), `--secondary-4: #a8b56b` (light, hovers)
3. **Accent**: `--accent-1: #c0392b` (warm red, 5.07:1 on white for badges/notifications)
4. Replace values in `css/styles.css` lines 7-24

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `css/styles.css` `:root` (lines 7-24) | Modified | All 12 color variables updated |
| HTML components | Indirect | Colors inherit via CSS variables |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Visual regression on dark sections | Low | All ratios pre-calculated, dark shades provided |
| Brand recognition impact | Low | Using exact logo colors as base |

## Rollback Plan
`git checkout HEAD -- css/styles.css` — single file change, all colors centralized in `:root`.

## Dependencies
None

## Success Criteria
- [ ] Logo colors #34ccca and #8c974b present in palette
- [ ] All text-on-white combinations ≥ 4.5:1 (WCAG AA)
- [ ] Accent #c0392b passes 4.5:1 on white
- [ ] 3 color families + neutrals maximum
- [ ] Variables documented with usage comments in CSS
- [ ] `#34ccca` and `#8c974b` marked as "decorative only" (fail contrast)
