# Gear curves in p5.js

I am using the formula for the gear curve from [Wolfram Mathworld](https://mathworld.wolfram.com/GearCurve.html) and the formula for the hyperbolicTan function from [here](https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table).

`let r =a +(1/b) * hyperbolicTan(b * sin(m * theta));`

`hyperbolicTan(theta) {`  
`let e = 2.71828;`  
`let l = pow(e, 2 * theta);`  
`return (l - 1) / (l + 1);`  
`}`

In the first row of images, I am rendering the gear curves in 2D. In the first version, I am rendering 120 curves with 10 spokes and a = 1, b = 10 (which were the parameters suggested by Mathword). In the second version, I am rendering 30 curves with 6 spokes with a and b the same. In the third version, I am rendering 10 curves with 8 spokes with random a and b. In all versions, I vary the scale of the curves.

In the second row, I have created a grid of gears and am varying the parameters to create a pattern. Note that this is not technically a tiling because the gears are overlapping. I am using Daniel Shiffman's code from the [Lissajous Challenge](https://thecodingtrain.com/challenges/116-lissajous-curve-table) to create the grid.

In the third row, I am experimenting with 3D. In the first two images, I have adapted Daniel Shiffman's code from the [3d Supershape challenge](https://thecodingtrain.com/challenges/26-3d-supershapes) to create a 3d shape. The first one uses beginShape() and endShape() with triangle strips, while the second one uses the [p5.Geometry](https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html). The stripes are created by adding two directional lights coming from opposite directions with different colors.

`directionalLight(146, 201, 177, 0, 0, -1);`  
`directionalLight(93, 81, 121, 0, 0, 1);`

The last image draws the gear in 3D by varying z when the curves are created.

In the last row, I am renderig shader versions of the gear. The first image shows a solid 2D gear, the second is a mix of the gear and a cube, and the third is a mix of the gear and a sphere. If you would like to learn more about mixing shapes, I recommend watching The Art of Code's Martijn Steinrucken youtube tutorial [How to turn your 2d fractal into 3d!](https://www.youtube.com/watch?v=__dSLc7-Cpo).

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://editor.p5js.org/kfahn/full/CawNObTwp"> <img class="img" src="assets/gear-1.jpg" alt="rotating gears" style="vertical-align:top;" width="500" /><br /><sub><b>Rotating Gears<br/></b>p5 sketch</sub></a></td>
      <td align="center"><a href="https://editor.p5js.org/kfahn/sketches/qa-bzNldz"> <img class="img" src="assets/gear-2.jpg" alt="rotating knob" style="vertical-align:top;" width="500" /><br /><sub><b>Rotating Knob<br/></b>p5 sketch</sub></a></td>
     <td align="center"><a href="https://editor.p5js.org/kfahn/full/DBEYmRv_b"> <img class="img" src="assets/gear-3.jpg" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>Random Rotating Gears<br/></b>p5 sketch</sub></a></td>
    </tr>
     <tr>
      <td align="center"><a href="https://editor.p5js.org/kfahn/full/1iuRoYBcR"> <img class="img" src="assets/grid-1.jpg" alt="overlapping grid" style="vertical-align:top;" width="500" /><br /><sub><b>Overlapping Grid<br/></b>p5 sketch</sub></a></td>
      <td align="center"><img class="img" src="assets/grid-2.jpg" alt="overlapping grid" style="vertical-align:top;" width="500" /><br /><sub><b>Overlapping Grid<br/></b></sub></a></td>
     <td align="center"><a href="https://editor.p5js.org/kfahn/sketches/KVyr6_EA7"> <img class="img" src="assets/grid-4.jpg" alt="overlapping grid" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>Overlapping Grid<br/></b></sub></a></td>
    </tr>
    </tr>
     <tr>
      <td align="center"><a href="https://editor.p5js.org/kfahn/full/Snumj-AgS"> <img class="img" src="assets/3d-1.jpg" alt="3D spherical shape" style="vertical-align:top;" width="500" /><br /><sub><b>3D spherical shape<br/></b>p5 sketch</sub></a></td>
      <td align="center"><a href="https://editor.p5js.org/kfahn/sketches/8cAOIsYzT"><img class="img" src="assets/3doffset.jpg" alt="striped 3D Geometry" style="vertical-align:top;" width="500" /><br /><sub><b>3D Geometry<br/></b>p5 sketch</sub></a></td>
     <td align="center"><a href="https://editor.p5js.org/kfahn/sketches/sI7UvptoV"> <img class="img" src="assets/3d-3.jpg" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>Gear curves rendered in 3D<br/></b>p5 sketch</sub></a></td>
    </tr>
     <tr>
      <td align="center"><a href=""> <img class="img" src="assets/shader-1.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b>2D shape - shader<br/></b>p5 sketch</sub></a></td>
      <td align="center"><img class="img" src="assets/shader-2.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b>Gear curve mixed with a cube<br/></b></sub></a></td>
     <td align="center"><a href="https://editor.p5js.org/kfahn/full/S8rDxeC1K"> <img class="img" src="assets/shader-3.jpg" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>Gear curve mixed with a sphere<br/></b>p5 sketch</sub></a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

## Animations

In the first two animations, the gear curves are rendered in a grid pattern and then the scale (or size) of the gear curves are changed to create the animation. I am using Daniel's trick to render the animation. To learn more about how to create a perfect GIF loop, watch Daniel Shiffman's short [p5.js saveGif() changes everything!](https://www.youtube.com/shorts/CEnfKhs6wLg).

`inc += 360 / frames;`  
`sc = map(sin(inc), -1, 1, 50, 150);`

[p5.j sketch](https://editor.p5js.org/kfahn/sketches/_N3eGG5yQ)

![](assets/grid_animation.gif)
![](assets/grid_animation2.gif)

In the third animation, I replaced the hyperbolicTan() function with a the hyperbolicCos() function and am using the same trick to vary b. (The curve is not a gear.)

`let r = a + (1 / b) * hyperbolicCos(b * sin(spokes * theta));`

![animation](https://github.com/kfahn22/gears/assets/65121394/d13a1863-0580-49e7-981c-b9d97ee94ad5)

[code](https://github.com/kfahn22/gears/tree/main/ANIMATIONS/animation_v1)

In this animation, I am using p5.Geometry to create this crazy star shape that reminds me of origami. 

![](assets/star.gif)  
[code](ANIMATIONS/3D_geometry_star_animation)