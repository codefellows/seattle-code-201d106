# A11y and Animation

This demo allows students to review key usability concepts. The start code has several broken features.

Start by displaying the start code in Chrome and running a Lighthouse test on it. See the low scores, especially note the Accessiblity score. Rather than allow Lighthouse to give students the answers as to what needs to be fixed ask them what things on the site appear to be a problem. They shouldn't think too hard about this. What obviously looks wrong?

Fix those features and then run the test again. Lighthouse Accessiblity score should be 100% after all the changes.

## HTML to fix

The below code is corrected to fix the problems.

### Image Accessibility

Images need alt text and they need width and heigh to prevent layout shift.

```html
<!-- !!!!! Add Alt text, width and height -->
<img src="img/candy-table-display.jpg" alt="Table full of candy. The Candy Shop is your one stop shop for all your candy desires" width=550 height=309>
<p>Photo by PetitPlat - Stephanie Kilgast</p>
```

### Form Element Attributes

Use the `for` attribute in labels to target the input with a matching `id` attribute.

```html
<form>
  <fieldset>
    <legend>Contact Us!</legend>

    <!-- !!!!! Add "for" attributes to lables -->
    <label for="yourName">Your Name</label>
    <input id="yourName" type="text" name="userName">
    <label for="yourComments">Comments</label>
    <textarea id="yourComments" name="userComment"></textarea>
```

### Add Tab Indexes

Make sure all clickable elements are tabbable. Add `tabindex=0` to the ones that need it. Never add a number other than `0`.

```html
<!-- Add tabindex - AND add the keypress event listener to app.js -->
<div class="cta" tabindex=0>
  Random Deal
</div>
```

## Event Handling

Since the "Random Deal" `cta` is now tabbable, it should have an additional event listener, so screen readers can access the event.

```js
cta.addEventListener('click', handleClick);

// Add a keypress event listener for accessibility.
cta.addEventListener('keypress', handleClick);
```

## Accessible Styles

### Color Contrast

```css
body {
  background-color: #F9E1E1;
  /* Below: color has been changed to provide adaquate contrast. */
  color: #682C2C;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
```

### Navigation Fixes

Demo what happens when the user hovers on the nav in Chrome. Note the layout shift that occurs and how the user has to navigate exactly only the tiny link text before it becomes clickable.

The fix is 3 fold:
- Padding should go on link tags to give a larger selectable area. 
- Font size should be larger — both to add readability but also to make it easier for users to navigate their cursor to the link.
- Avoid layout shift by cancelling out styles added on hover. Below we are doing it by adding a transparent border to the non-hovered state.

```css
nav li {
  margin: 1rem;

  /* Remove the padding. Put it on the 'nav li a' instead. To make it easy to hover over the link, we want the a tag to have the padding, not the li  */
  /* padding: 0.2rem 1rem; */
}

nav li a {

  /* Add a transparent border to cancel out the layout shift when you hover. */
  border: 10px solid transparent; 
  
  /* Make the font-size larger. */
  font-size: 1rem;
  
  /* Add padding. Padding should go on the a tag, the thing the user needs to navigate their mouse to and hover over it. */
  padding: 0.2rem 1rem;
  
  text-decoration: none;
}
```

### Fancy Fonts Shouldn't Be Used For Body Text

```css
article p {
  /* Remove the font-family. Fancy fonts shouldn't be used on body text */
  /* font-family: 'Cookie', cursive; */

  font-size: 1rem;
  line-height: 150%;  
}
```

## CSS Transitions

The "Random Deal" `cta` isn't quite clear what it is for. Hover over it; there is no pointer cursor change. How is the user to know it is meant to be clicked on? Let's make it clear to the user what they are suppose to do. Add a hover state and then enhance it with a transition.

```css
.cta {
  align-items: center;
  background-color: #57473A;
  color: #DBC9BA;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  margin: 1rem 0;
  padding: .5rem 2rem;
  
  /* 
    CSS TRANSITIONS
    Add transition:
  */
  transition: background-color 2s ease;
  /* Cancel out the hover change: */
    border: 10px solid transparent;
}

/* 
  CSS TRANSITIONS
  Add hover styles so there is something to transition
*/
.cta:hover {
  background-color: #f5e9e9;
  border: 10px solid #9B0303;
  color: #9B0303;
  cursor: pointer;
}
```

### CSS Animations

Two different animations can be demoed on the "Today's Deal" element that is loaded into the DOM when the user clicks the "Random Deal" cta.

Remind students that when elements in the UI move, it usually implies that the user is suppose to interact with them in some way. Use that to direct users to what we want them to do.

Be intentional about animations. Remember that with great power comes great responsibility. Animations can be distracting and overwhelming to users when misapplied.

```css
.deals {
  background-color: FloralWhite;
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  position: relative;

  /* 
    CSS ANIMATIONS
    Add the animations
  */
  animation-name: bounce;
  /* use "3s" for loadFromRight animation */
  /* use "1s" for bounce animation */
  animation-duration: 1s;
}

/* 
  CSS ANIMATIONS
  define the animation:
  This one conveys the basic concept in an easy to understand way:
*/
@keyframes loadFromRight {
  from {
    margin-left: 100%;
    width: 100%;
  }
  to {
    margin-left: 0%;
    width: 100%;
  }
}

/* 
  CSS ANIMATIONS
  Another one to try on the same element if there is time. This one is slightly more complicated since we haven't covered transform in class previously.
  Credit: https://www.tutorialspoint.com/css/css_animation_bounce.htm
*/
@keyframes bounce { 
  20%, 50%, 80%, 100% {transform: translateY(0);} 
  0% {transform: translateY(-8px);}
  40% {transform: translateY(-8px);} 
  60% {transform: translateY(-5px);} 
}
```
