# Creating User Experiences with Users in Mind

- Browser is a black box

- Creating inferior experience

## What is a browser?

## How do the pixels render?

![](https://lh5.googleusercontent.com/mTQIYRturbWjgHKL2dRFEKPLXQd479b5X9kK5u_udyfr9WT8nR3gNdWm803v-OFL9gACxyZ8s4M2JwjtLk0jqLEpl9JV5X_PUID19QNPpSvrWEmdULg)


## Layout/Reflow

Calculation of information required to display visible DOM nodes.

## When does it happen?
- Style changes
- Fetching of layout values/scroll values
- Adding/removing elements


## How to detect?

[Demo]

## Avoid it like a plague

## How to minimize Layout?

- Move content away from the flow. [Demo]
- Use only on the smallest possible element. [Demo]
- Avoid reading/writing [layout values](http://gent.ilcore.com/2011/03/how-not-to-trigger-layout-in-webkit.html)
- Apply layout changes on `requestAnimationFrame`

## `requestAnimationFrame`

## Frame?

## Framerate

## 60fps

## new frame every 16.67ms

## `setInterval`, `setTimeout`
Drops frames if it is not synced to Browser refresh rate.

## Minimize Style Changes (Nitpicking)
### Avoid
- Sibling Selectors
- Generic Selectors

### Use
- Specific classes (optimized)


## Paints
Browser changes the pixel values of an area of the viewport

## When does it happen?
- Scrolling
- Hover, Mouse moves
- Anything and everything

## WebKit/Blink Only

## Typical Painting
### Go through Stacking contexts

## Stacking Contexts?!
- Root Object (html)
- `transform`, `position: relative`, `position: absolute`
- opacity < 1
- CSS Filter
- overflow is set

### Create Render Layers

## Render Layers
- Each Stacking context creates a Render Layer
- WebGL has own Render Layer
- So does Video or Accelerated Canvas Element

## Paint to a Bitmap
- One Bitmap

## Hardware Acceleration!
- MORE TREES!
- Many bitmaps
- Each Bitmap renders a bunch of Render Layers

## How do you know how many bitmaps?
[Demo]

## Some bitmaps handled by GPU

## GPU?!

![](http://images2.fanpop.com/image/photos/14200000/CS-source-wallpaper-counter-strike-14231626-1024-768.jpg)

## Like CPU but optimized for processing large blocks of data in parallel

## GPU controls rendering of all bitmaps it is responsible for
- No Repaints, relayouts [Demo]

### Which is why sometimes content suddenly turned into a GPU-rendered bitmap flicker

### Sometimes fonts look terrible

## GPU reduces burden on CPU

## Limited by Memory

## Memory?
RAM where Browser stores data, including textures that GPU works on

## Memory on Devices vs Memory on Desktop
- Android & iOS can force quit Safari or WebView App to free memory
- More apps open, the smaller the size of memory available to your page

## How to reduce memory usage?!
- Smaller images (remember, images are dimensions * 4 bytes for each pixel)
- Lesser DOM objects
- Lesser GPU layers
- Smaller textures to the GPU

## Reduce CPU/GPU switching
- Do animations only in HW layer [Demo]
- Don't animate z-index [Demo]
- Use Opacity to toggle visibility of GPU-accelerated content

### Why Opacity?
- Textures still in GPU

### How about `visibility:hidden`
- Removes textures from GPU (flickrs happen when CPU rendering switches to GPU)

### `display: none'?
- Lead to repaints

### Remove element from the DOM?
- Worst performance
- Fire events
- Calculate new set of elements that match `nth-child` or `odd` or `even` or sibling selectors
- Layout & Repaint

## In Summary
- Rendering is a beat
- Use specific class names
- Change layout sparingly
- Use CPU to repaint sparingly
- Use GPU acceleration where possible
- But be careful of memory size
- Test! Test! Test!
















