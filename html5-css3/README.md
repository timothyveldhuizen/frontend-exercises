# HTML5 & CSS3 useful and new elements

This is used to display the new features / elements in HTML5

## HTML5 content elements

Content elements that can be used are `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`.

## HTML5 form elements

Form elements now include the type and have support for displaying correct formatting or validation of the value like `<input type="email>"`,

Also on mobile it displays the correct keyboard.

More information: 
- http://nativeformelements.com/
- https://www.smashingmagazine.com/2018/08/ux-html5-mobile-form-part-2/

## CSS3 Layout elements

There are 2 ways to layout your html, Flexbox or either with Grid.

More information about the differences: 
- https://medium.freecodecamp.org/the-main-differences-between-flexbox-and-css-grid-667c03461d2b
- https://medium.com/youstart-labs/beginners-guide-to-choose-between-css-grid-and-flexbox-783005dd2412 

### Flexbox layout
You can use the `display: flex;` to create a *flex container*.
And within the *flex container* you can use `flex-direction: column;` to align the direction vertical for the items in the *flex container*.

You can also use `flex-wrap: wrap;` (initial value is nowrap). Wrap will fit the items in the container.

By using `flex: 1 1 auto;` you set the `flex-grow`, `flex-shrink` and `flex-basis`.
Basis is used to determine the width of the item, grow is used to grow along the available space that is left in the *flex container* and shrink is to shrink and become smaller than the basis.

#### Predefined shorthand values

There are also some predefined shorthand values which cover most of the use cases. You will often see these used in tutorials, and in many cases these are all you will need to use. The predefined values are as follows:
```
flex: initial
flex: auto
flex: none
flex: <positive-number>
```
Setting `flex: initial` resets the item to the initial values of Flexbox. This is the same as `flex: 0 1 auto`. In this case the value of `flex-grow` is 0, so items will not grow larger than their `flex-basis` size. The value of `flex-shrink` is 1, so items can shrink if they need to rather than overflowing. The value of `flex-basis` is auto. Items will either use any size set on the item in the main dimension, or they will get their size from the content size.

Using `flex: auto` is the same as using `flex: 1 1 auto;` everything is as with `flex:initial` but in this case the items can grow and fill the container as well as shrink if required.

Using `flex: none` will create fully inflexible flex items. It is as if you wrote `flex: 0 0 auto`. The items cannot grow or shrink but will be laid out using flexbox with a `flex-basis` of auto.

The shorthand you often see in tutorials is `flex: 1` or `flex: 2` and so on. This is as if you used `flex: 1 1 0`. The items can grow and shrink from a `flex-basis` of 0.


More information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox

### Grid layout

A grid is an intersecting set of horizontal and vertical lines – one set defining columns, and the other, rows. Elements can be placed onto the grid, within these column and row lines. CSS grid layout has the following features:
- Fixed and flexible track sizes
- Item placement
- Creation of additional tracks to hold contentSection
- Alignment control
- Control of overlapping content

You can create a *grid container* by declaring `display: grid` or `display: inline-grid` on an element.

More information: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout
