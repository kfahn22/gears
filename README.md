# P5 sketches with visualizations of gears

I am using the formula for the gear curve from [Wolfram Mathworld](https://mathworld.wolfram.com/GearCurve.html) and the formula for the hyperbolicTan function from [here](https://help.tc2000.com/m/69445/l/755460-hyperbolic-functions-table).

`let r =a +(1/b) * hyperbolicTan(b * sin(m * theta));`

`hyperbolicTan(theta) {`
    `let e = 2.71828;`
    `let l = pow(e, 2 * theta);`
    `return (l - 1) / (l + 1);`
`}`

<!-- IMAGE-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href=""> <img class="img" src="assets/gear-1.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b><br/></b></sub></a></td>
      <td align="center"><img class="img" src="assets/gear-2.jpg" alt="" style="vertical-align:top;" width="500" /><br /><sub><b><br/></b></sub></a></td>
     <td align="center"><a href=""> <img class="img" src="assets/gear-3.jpg" alt="" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="500" /><br /><sub><b><br/></b></sub></a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- IMAGE-LIST:END -->

![]()
