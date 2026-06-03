# Popover

A floating panel anchored to a trigger — for secondary content like settings,
details, or small forms that shouldn't take over the screen. It opens on click,
positions itself next to the trigger, and closes when you click outside.

Popover is a **compound component**: you compose three parts.

## Anatomy

\```
Popover ← the root; controls placement and offset
├── PopoverTrigger ← the clickable element that opens it
└── PopoverContent ← the floating panel (controls its own size)
\```

The trigger exposes an `open` slot prop (the current open state); the content
exposes a `close` slot prop (call it to dismiss the panel from inside).

## Usage

<preview path="../demos/popover/popover-basic.vue" title="Basic" description="A trigger and a floating panel."></preview>

## Placement

The root's `placement` prop controls where the panel opens relative to the
trigger. It flips automatically if there isn't room.

<preview path="../demos/popover/popover-placement.vue" title="Placement" description="top and bottom."></preview>

## Closing from inside

`PopoverContent` exposes a `close` function via its default slot — useful for
"Save"/"Cancel" actions that should dismiss the panel.

<preview path="../demos/popover/popover-close.vue" title="Close from inside" description="Buttons that dismiss the popover."></preview>

## Sizing

`PopoverContent` takes a `size` prop controlling the panel width: `fit` (to
content), `full`, or a fixed step (`3xs` through `lg`). Unlike a select menu, a
popover isn't matched to the trigger's width — it's sized for its content.

## Props

### Popover

| Prop        | Type                                                                                                   | Default        | Description                                    |
| ----------- | ------------------------------------------------------------------------------------------------------ | -------------- | ---------------------------------------------- |
| `placement` | `"bottom-start" \| "bottom-end" \| "bottom" \| "top-start" \| "top-end" \| "top" \| "left" \| "right"` | `"bottom-end"` | Where the panel opens relative to the trigger. |
| `offset`    | `number`                                                                                               | `4`            | Gap (px) between trigger and panel.            |
| `class`     | `string`                                                                                               | —              | Classes merged onto the root.                  |

### PopoverTrigger

Slot-only. Exposes `open` (boolean) via its default slot. Accepts `class`.

### PopoverContent

| Prop    | Type                                                                | Default | Description                                |
| ------- | ------------------------------------------------------------------- | ------- | ------------------------------------------ |
| `size`  | `"fit" \| "full" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg"` | `"xs"`  | Panel width. Exposes `close` via its slot. |
| `class` | `string`                                                            | —       | Classes merged onto the panel.             |

## Accessibility

- Built on Headless UI's `Popover`, so focus management, `Escape` to close,
  click-outside dismissal, and ARIA wiring are handled for you.
- The trigger is a real button; the panel is keyboard-navigable and returns focus
  to the trigger on close.
