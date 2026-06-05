# Select

A single-choice dropdown — the user picks one option from a list. It supports
optional search for long lists, binds the chosen value with `v-model`, and is
built on Headless UI's listbox so keyboard navigation and accessibility come for
free.

Reach for `Select` when the user picks **one** value from a defined set. Use
[MultiSelect](/components/multiselect) when they can choose several, and
[Dropdown](/components/dropdown) for a menu of _actions_ rather than choosing a
value.

## Anatomy

\```Select               ← root: holds v-model, provides context, sets placement
├── SelectTrigger    ← the field-like button showing the current selection
└── SelectContent    ← the floating panel (matches the trigger's width)
    ├── SelectSearch  ← optional search input (needs`searchable` on the root)
└── SelectItem ← one per option; its content is the label
\```

Each option is a `SelectItem` with a `value` prop; whatever you put **inside** it
is the label. The trigger shows the chosen option's text once selected.

## Usage

Give each `SelectItem` a `value` and put the label inside it.

<preview path="../demos/select/select-basic.vue" title="Basic" description="Pick one option from a list."></preview>

## Searchable

For long lists, add `searchable` to the root and include a `SelectSearch`. Items
filter themselves by their text as the user types.

<preview path="../demos/select/select-searchable.vue" title="Searchable" description="Filter options as you type."></preview>

## Rich items

Because the label is slot content, an item can hold more than text — an icon, a
color dot, a formatted row. The trigger displays the item's text once selected.

<preview path="../demos/select/select-rich.vue" title="Rich content" description="Items with icons or custom markup."></preview>

## Disabled options

Mark an item `disabled` to make it non-selectable — it's skipped by keyboard
navigation and can't be chosen.

<preview path="../demos/select/select-disabled-item.vue" title="Disabled option" description="A non-selectable item."></preview>

## Inside a Field

Wrap it in a `Field` for a label and description with the accessibility wiring,
just like the other form controls.

<preview path="../demos/select/select-in-field.vue" title="With Field" description="Labelled select with a description."></preview>

## Props

### Select

| Prop         | Type                                                                              | Default          | Description                                           |
| ------------ | --------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------- |
| `modelValue` | `string`                                                                          | —                | The selected value. Use with `v-model`. **Required.** |
| `searchable` | `boolean`                                                                         | `false`          | Enables filtering (include a `SelectSearch`).         |
| `placement`  | `"bottom-start" \| "bottom-end" \| "bottom" \| "top-start" \| "top-end" \| "top"` | `"bottom-start"` | Where the panel opens relative to the trigger.        |
| `offset`     | `number`                                                                          | `4`              | Gap (px) between trigger and panel.                   |
| `class`      | `string`                                                                          | —                | Classes merged onto the root.                         |

### SelectTrigger

| Prop          | Type                      | Default              | Description                            |
| ------------- | ------------------------- | -------------------- | -------------------------------------- |
| `placeholder` | `string`                  | `"Select an option"` | Shown when nothing is selected.        |
| `variant`     | `"primary" \| "contrast"` | `"primary"`          | Field style (shares Input's variants). |
| `size`        | `"base" \| "sm"`          | `"base"`             | Field size.                            |
| `class`       | `string`                  | —                    | Classes merged onto the trigger.       |

`SelectTrigger` exposes `selected` (the value) and `label` (the display text) via
its default slot, so you can render the selection however you like.

### SelectContent

| Prop    | Type                                                                | Default  | Description                                                           |
| ------- | ------------------------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| `width` | `"fit" \| "full" \| "3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg"` | `"full"` | Panel width. `full` matches the trigger; a token gives a fixed width. |
| `class` | `string`                                                            | —        | Classes merged onto the panel.                                        |

### SelectSearch

| Prop          | Type     | Default       | Description                                      |
| ------------- | -------- | ------------- | ------------------------------------------------ |
| `placeholder` | `string` | `"Search..."` | Search input placeholder. Requires `searchable`. |

### SelectItem

| Prop       | Type      | Default | Description                                                  |
| ---------- | --------- | ------- | ------------------------------------------------------------ |
| `value`    | `string`  | —       | The option's value (what `v-model` receives). **Required.**  |
| `disabled` | `boolean` | `false` | Makes the option non-selectable and skipped by keyboard nav. |

The item's **slot content is its label** — put text, or text with an icon, inside.
It exposes `active` and `selected` via its default slot for custom rendering.

## Accessibility

- Built on Headless UI's `Listbox`, so arrow-key navigation, type-ahead, `Enter`
  to select, `Escape` to close, and `role="listbox"`/`option` wiring are handled.
- The selected option shows a check and is marked selected for assistive tech.
- Disabled options are skipped by keyboard navigation.
- Wrap in a `Field` (or pair with a `Label`) so the control has an accessible name.

## Notes

The trigger displays the selected option's text, captured when the option is
chosen. A select that's **pre-filled** with a `modelValue` before the user opens
it will show the raw value until a choice is made — if you need a specific
initial display, render it via the `SelectTrigger` default slot using the
`selected`/`label` slot props.
