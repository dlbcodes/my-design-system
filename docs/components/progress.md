# Progress

A horizontal bar showing how far along a task is — a file upload, a multi-step
form, a loading process. The filled portion reflects the current value against a
maximum, and changes animate smoothly so progress reads as motion rather than
jumps.

## Usage

Pass a `value` from 0 to 100. The bar fills to that percentage.

<preview path="../demos/progress/progress-basic.vue" title="Values" description="25%, 50%, 75%, and 100%."></preview>

## Animated

Because the fill transitions, updating `value` over time animates the bar — handy
for uploads or any task you poll.

<preview path="../demos/progress/progress-animated.vue" title="Animated" description="Value increasing over time."></preview>

## Custom maximum

Set `max` to measure against something other than 100 — useful for "step N of M"
progress.

<preview path="../demos/progress/progress-max.vue" title="Custom max" description="3 out of 5."></preview>

## Props

| Prop    | Type     | Default | Description                                                                        |
| ------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| `value` | `number` | —       | Current progress (0–`max`). Omit for an empty/indeterminate bar. Clamped to range. |
| `max`   | `number` | `100`   | The value representing 100% complete.                                              |
| `class` | `string` | —       | Classes merged onto the track — use for height, width, or color.                   |

## Accessibility

- The bar has `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and
  `aria-valuenow`, so assistive tech announces the current progress.
- Values are clamped to the `0`–`max` range, so out-of-range input won't break
  the bar visually or in the ARIA values.
- For a labelled progress bar, pair it with visible text (e.g. "Uploading… 60%")
  or add an `aria-label` describing what's progressing.
