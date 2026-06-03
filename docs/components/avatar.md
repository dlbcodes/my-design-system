# Avatar

A compact visual representation of a user. An avatar shows the person's image
when available, gracefully falling back to their initial, then to a neutral
placeholder — so it always renders something sensible even with missing data.

Use avatars wherever you need to identify a person at a glance: comment threads,
member lists, navigation bars, profile headers, and assignee indicators.

## Usage

The only thing an avatar needs is a `name` (used for the initial fallback and as
the image's alt text). Pass a `src` to show a photo.

<preview path="../demos/avatar/avatar-basic.vue" title="Basic" description="An avatar with an image and a name."></preview>

## Fallbacks

When no `src` is provided — or the image fails to load — the avatar shows the
first letter of `name`. This means you can render avatars for users who haven't
uploaded a photo without any extra handling.

<preview path="../demos/avatar/avatar-fallback.vue" title="Initial fallback" description="No image: the first letter of the name is shown."></preview>

## Sizes

Three sizes are available via the `size` prop: `sm`, `base` (default), and `lg`.

<preview path="../demos/avatar/avatar-sizes.vue" title="Sizes" description="sm, base, and lg."></preview>

## Customizing

Every avatar accepts a `class` prop that merges onto the root element, so you can
override the shape, add a ring, or adjust spacing without touching the component.
This is the primary extension point — reach for it before wrapping the component.

<preview path="../demos/avatar/avatar-custom.vue" title="Custom shape and ring" description="A square avatar, and one with a brand-colored ring."></preview>

## Avatar group

Avatars compose into an overlapping stack with a little negative margin and a
ring to separate them — handy for showing a set of collaborators. The last item
can be an initials-only avatar acting as an overflow count.

<preview path="../demos/avatar/avatar-group.vue" title="Group" description="An overlapping stack with an overflow count."></preview>

## Props

| Prop    | Type                     | Default  | Description                                                                                                                           |
| ------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `name`  | `string \| null`         | `null`   | The person's name. Its first letter is the fallback when there's no image, and it's used as the image's `alt` text for accessibility. |
| `src`   | `string \| null`         | `null`   | Image URL. When present (and it loads), the photo is shown; otherwise the avatar falls back to the initial.                           |
| `size`  | `"sm" \| "base" \| "lg"` | `"base"` | The avatar's size.                                                                                                                    |
| `class` | `string`                 | —        | Classes merged onto the root element. Use this to change shape (e.g. `rounded-lg`), add a ring, or adjust layout.                     |

## Accessibility

- The image's `alt` text is set from `name`, so screen readers announce who the
  avatar represents.
- When showing the initial fallback, the avatar still conveys the person via
  `name` — keep `name` meaningful rather than passing initials directly.
