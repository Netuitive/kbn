# kbn <img src="https://travis-ci.org/Netuitive/kbn.svg?branch=master"/>

Library to scale and format numbers with common units. In very early stages of development, probably not generally useful yet.

### install
```
bower install https://github.com/Netuitive/kbn#master
```

### testing
```
gulp
```

### production build
```
gulp production
```

## api
```
kbn.findUnitFormat(unit)
```
Given a string will attempt to find a unit.

```
kbn.formatValue(value, unit)
```
Given a value and unit will scale the value by the unit, round to 4 significant digits, and return a string representation of the value with the scaled units.

## Supported Units

Supported unit codes recognized by the formatValue api call.

<table>
  <tr>
    <th>code</th>
    <th>unit</th>
  </tr>
  <tr>
    <th colspan="2"><div align="center"><em>general</em></div></th>
  </tr>
  <tr>
    <td>short</td><td>short</td>
  </tr>
  <tr>
    <td>percent</td><td>percent (0-100)</td>
  </tr>  
  <tr>
    <td>percentunit</td><td>percent (0.0-1.0)</td>
  </tr>
  <tr>
    <td>humidity</td><td>Humidity (%H)</td>
  </tr>
  <tr>
    <td>ppm</td><td>ppm</td>
  </tr>
  <tr>
    <td>dB</td><td>decibel</td>
  </tr>

  <tr>
    <th colspan="2"><div align="center"><em>data</em></div></th>
  </tr>
  <tr>
    <td>bits</td><td>bits</td>
  </tr>
  <tr>
    <td>bytes</td><td>bytes</td>
  </tr>
  <tr>
    <td>kbytes</td><td>kilobytes</td>
  </tr>
  <tr>
    <td>mbytes</td><td>megabytes</td>
  </tr>
  <tr>
    <td>gbytes</td><td>gigabytes</td>
  </tr>

  <tr>
    <th colspan="2"><div align="center"><em><a href="https://en.wikipedia.org/wiki/Data_rate_units">data rate</a></em></div></th>
  </tr>
  <tr>
    <td>pps</td><td>packets/sec</td>
  </tr>
  <tr>
    <td>bps</td><td>bits/sec</td>
  </tr>
  <tr>
    <td>Bps</td><td>bytes/sec</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>time</em></div></td>
  </tr>
  <tr>
    <td>hertz</td><td>Hertz (1/s)</td>
  </tr>
  <tr>
    <td>ns</td><td>nanoseconds (ns)</td>
  </tr>
  <tr>
    <td>µs</td><td>microseconds (µs)</td>
  </tr>
  <tr>
    <td>ms</td><td>milliseconds (ms)</td>
  </tr>
  <tr>
    <td>s</td><td>seconds (s)</td>
  </tr>
  <tr>
    <td>m</td><td>minutes (m)</td>
  </tr>
  <tr>
    <td>h</td><td>hours (h)</td>
  </tr>
  <tr>
    <td>d</td><td>days (d)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>throughput</em></div></td>
  </tr>
  <tr>
    <td>ops</td><td>ops/sec (ops)</td>
  </tr>
  <tr>
    <td>rps</td><td>reads/sec (rps)</td>
  </tr>
  <tr>
    <td>wps</td><td>writes/sec (wps)</td>
  </tr>
  <tr>
    <td>iops</td><td>I/O ops/sec (iops)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>memory</em></div></td>
  </tr>
  <tr>
    <td>fps</td><td>faults/sec (fps)</td>
  </tr>
  <tr>
    <td>Pps</td><td>pages/sec (Pps)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>currency</em></div></td>
  </tr>
  <tr>
    <td>currencyUSD</td><td>Dollars ($)</td>
  </tr>
  <tr>
    <td>currencyGBP</td><td>Pounds (£)</td>
  </tr>
  <tr>
    <td>currencyEUR</td><td>Euro (€)</td>
  </tr>
  <tr>
    <td>currencyJPY</td><td>Yen (¥)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>length</em></div></td>
  </tr>
  <tr>
    <td>lengthmm</td><td>millimetre (mm)</td>
  </tr>
  <tr>
    <td>lengthm</td><td>meter (m)</td>
  </tr>
  <tr>
    <td>lengthkm</td><td>kilometer (km)</td>
  </tr>
  <tr>
    <td>lengthmi</td><td>mile (mi)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>velocity</em></div></td>
  </tr>
  <tr>
    <td>velocityms</td><td>m/s</td>
  </tr>
  <tr>
    <td>velocitykmh</td><td>km/h</td>
  </tr>
  <tr>
    <td>velocitymph</td><td>mph</td>
  </tr>
  <tr>
    <td>velocityknot</td><td>knot (kn)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>volume</em></div></td>
  </tr>
  <tr>
    <td>mlitre</td><td>millilitre</td>
  </tr>
  <tr>
    <td>litre</td><td>litre</td>
  </tr>
  <tr>
    <td>m3</td><td>cubic metre</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>energy</em></div></td>
  </tr>
  <tr>
    <td>watt</td><td>watt (W)</td>
  </tr>
  <tr>
    <td>kwatt</td><td>kilowatt (kW)</td>
  </tr>
  <tr>
    <td>watth</td><td>watt-hour (Wh)</td>
  </tr>
  <tr>
    <td>kwatth</td><td>kilowatt-hour (kWh)</td>
  </tr>
  <tr>
    <td>joule</td><td>joule (J)</td>
  </tr>
  <tr>
    <td>ev</td><td>electron volt (eV)</td>
  </tr>
  <tr>
    <td>amp</td><td>Ampere (A)</td>
  </tr>
  <tr>
    <td>volt</td><td>Volt (V)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>temperature</em></div></td>
  </tr>
  <tr>
    <td>celsius</td><td>Celcius (°C)</td>
  </tr>
  <tr>
    <td>farenheit</td><td>Farenheit (°F)</td>
  </tr>
  <tr>
    <td>kelvin</td><td>Kelvin (K)</td>
  </tr>

  <tr>
    <td colspan="3"><div align="center"><em>pressure</em></div></td>
  </tr>
  <tr>
    <td>pressurembar</td><td>Millibars</td>
  </tr>
  <tr>
    <td>pressurehpa</td><td>Hectopascals</td>
  </tr>
  <tr>
    <td>pressurehg</td><td>Inches of mercury</td>
  </tr>
  <tr>
    <td>pressurepsi</td><td>PSI</td>
  </tr>
</table>


originally imported from Graphana: https://github.com/grafana/grafana/blob/8ee0e5d11f8427b5a68aab69c73c6d4809bdf5bb/public/app/core/utils/kbn.js
