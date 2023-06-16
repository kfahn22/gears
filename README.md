# Gear curves in p5.js

I am using the formula for the gear curve from [Wolfram Mathworld](https://mathworld.wolfram.com/GearCurve.html) and the formula for the hyperbolicTan function from [here](https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table).

`let r =a +(1/b) * hyperbolicTan(b * sin(m * theta));`

`hyperbolicTan(theta) {`  
`let e = 2.71828;`  
`let l = pow(e, 2 * theta);`  
`return (l - 1) / (l + 1);`  
`}`

In the first row of images, I am rendering the gear curves in 2D. In the first version, I am rendering 120 curves with 10 spokes and a = 1, b = 10 (which were the parameters suggested by Mathword). In the second version, I am rendering 30 curves with 6 spokes with a and b the same. In the third version, I am rendering 10 curves with 8 spokes with random a and b. In all versions, I vary the scale of the curves. If you open the link to the p5 sketch, it will rotate but I was not able to get a good GIF (they were too pixelated).

In the second row, I have created a grid of gears and varying the parameters to create a pattern. Note that this is not technically a tiling because the gears are overlapping. I am using Daniel Shiffman's code from the [Lissajous Challenge](https://thecodingtrain.com/challenges/116-lissajous-curve-table) to create the grid.

In the third row, I am experimenting with 3D. In the first two images, I have adapted Daniel Shiffman's code from the [3d Supershape challenge](https://thecodingtrain.com/challenges/26-3d-supershapes) to create a 3d shape. The last image draws the gear in 3d by varying z when the curves are created.

In the last row, I am renderig shader versions of the gear. The first image shows a solid 2D gear, the second is a mix of the gear and a cube, and the third is a mix of the gear and a sphere. If you would like to learn more about mixing shapes, I recommend watching The Art of Code's Martijn Steinrucken youtube tutorial [How to turn your 2d fractal into 3d!](https://www.youtube.com/watch?v=__dSLc7-Cpo).

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://editor.p5js.org/kfahn/full/CawNObTwp"> <img class="img" src="assets/gear-1.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b>p5 sketch<br/></b></sub></a></td>
      <td align="center"><img class="img" src="assets/gear-2.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b><br/></b></sub></a></td>
     <td align="center"><a href="https://editor.p5js.org/kfahn/full/DBEYmRv_b"> <img class="img" src="assets/gear-3.jpg" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>Random Rotating Gears<br/></b>p5 sketch</sub></a></td>
    </tr>
     <tr>
      <td align="center"><a href="https://editor.p5js.org/kfahn/full/1iuRoYBcR"> <img class="img" src="assets/grid-1.jpg" alt="overlapping grid" style="vertical-align:top;" width="500" /><br /><sub><b>Overlapping Grid<br/></b>p5 sketch</sub></a></td>
      <td align="center"><img class="img" src="assets/grid-2.jpg" alt="overlapping grid" style="vertical-align:top;" width="500" /><br /><sub><b>Overlapping Grid<br/></b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/grid-3.jpg" alt="overlapping grid" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>Overlapping Grid<br/></b></sub></a></td>
    </tr>
    </tr>
     <tr>
      <td align="center"><a href="https://editor.p5js.org/kfahn/full/Snumj-AgS"> <img class="img" src="assets/3d-1.jpg" alt="3D spherical shape" style="vertical-align:top;" width="500" /><br /><sub><b>3D spherical shape<br/></b>p5 sketch</sub></a></td>
      <td align="center"><a href="https://editor.p5js.org/kfahn/sketches/YceFKpQ8F"><img class="img" src="assets/3dge0metry.jpg" alt="3D Geometry showing normals" style="vertical-align:top;" width="500" /><br /><sub><b>3D Geometry showing normals<br/></b>p5 sketch</sub></a></td>
     <td align="center"><a href="https://editor.p5js.org/kfahn/sketches/sI7UvptoV"> <img class="img" src="assets/3d-3.jpg" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>Gear curves rendered in 3D<br/></b>p5 sketch</sub></a></td>
    </tr>
     <tr>
      <td align="center"><a href=""> <img class="img" src="assets/shader-1.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b>2D shape - shader<br/></b>p5 sketch</sub></a></td>
      <td align="center"><img class="img" src="assets/shader-2.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b><br/></b></sub></a></td>
     <td align="center"><a href="https://editor.p5js.org/kfahn/full/S8rDxeC1K"> <img class="img" src="assets/shader-3.jpg" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b>3D shape - shader<br/></b>p5 sketch</sub></a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

## Animations

To learn how to create a looping GIF, watch this short by [Daniel Siffman](https://www.youtube.com/shorts/CEnfKhs6wLg)

[p5.j sketch](https://editor.p5js.org/kfahn/sketches/_N3eGG5yQ)

![](assets/grid_animation.gif)
![](assets/grid_aninmation2.gif)
