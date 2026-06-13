# Dropdown

A menu of actions triggered by a button — for things like row actions, account
menus, and "more options" overflows. Built on Headless UI's menu, it handles
keyboard navigation (arrow keys, Enter, Escape), focus, and active-item
highlighting for you.

Dropdown is a **compound component** composed of four parts.

## Anatomy

```
Dropdown               ← the root; controls placement and offset
├── DropdownTrigger    ← the button that opens the menu
└── DropdownContent    ← the floating menu panel
    └── DropdownItem    ← each selectable action (emits`select`)
```

`DropdownItem` is slot-only — put a label, or an icon plus a label, inside it. It
emits `select` when chosen, and exposes an `active` slot prop (true when
highlighted by hover or keyboard).

## Usage

<preview path="../demos/dropdown/dropdown-basic.vue" title="Basic" description="A trigger and a menu of items."></preview>

## With icons

Items take arbitrary slot content, so you can include icons.

<preview path="../demos/dropdown/dropdown-icons.vue" title="With icons" description="Icon + label items."></preview>

## Handling selection

Listen for `select` on each item to react to a choice. The menu closes
automatically when an item is chosen.

<preview path="../demos/dropdown/dropdown-select.vue" title="Selection" description="Reacting to the select event."></preview>

## Disabled items

Mark an item `disabled` to make it non-interactive — it's skipped by keyboard
navigation and doesn't emit `select`.

<preview path="../demos/dropdown/dropdown-disabled.vue" title="Disabled item" description="A non-selectable item."></preview>

## Props

### Dropdown

| Prop        | Type                                                                              | Default          | Description                                   |
| ----------- | --------------------------------------------------------------------------------- | ---------------- | --------------------------------------------- |
| `placement` | `"bottom-start" \| "bottom-end" \| "bottom" \| "top-start" \| "top-end" \| "top"` | `"bottom-start"` | Where the menu opens relative to the trigger. |
| `offset`    | `number`                                                                          | `4`              | Gap (px) between trigger and menu.            |
| `class`     | `string`                                                                          | —                | Classes merged onto the root.                 |

### DropdownTrigger

Slot-only. Exposes `open` (boolean) via its slot. Accepts `class`.

### DropdownContent

| Prop    | Type                                                                | Default  | Description                                     |
| ------- | ------------------------------------------------------------------- | -------- | ----------------------------------------------- |
| `size`  | `"fit" \| "full" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg"` | `"full"` | Menu width. `full` matches the trigger's width. |
| `class` | `string`                                                            | —        | Classes merged onto the panel.                  |

### DropdownItem

| Prop       | Type      | Default | Description                                                     |
| ---------- | --------- | ------- | --------------------------------------------------------------- |
| `disabled` | `boolean` | `false` | Disables the item — skipped by keyboard nav, emits no `select`. |
| `class`    | `string`  | —       | Classes merged onto the item.                                   |

Emits `select` when chosen. Exposes `active` (boolean) via its slot.

## Accessibility

- Built on Headless UI's `Menu`, so arrow-key navigation, type-ahead, `Enter` to
  select, `Escape` to close, focus trapping, and `role="menu"`/`menuitem` wiring
  are all handled.
- The active item (hover or keyboard) is exposed via the `active` slot prop and
  styled with `data-active`.
- Disabled items are correctly skipped by keyboard navigation.
