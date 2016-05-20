KBN
=====

<img src="https://travis-ci.org/Netuitive/kbn.svg?branch=master"/>

KBN is a library that was created to scale and format numbers with common units. KBN is still in the early stages of development, so it may not be useful yet.

For more information, contact Netuitive support at [support@netuitive.com](mailto:support@netuitive.com).

Installing and Building KBN
----------------------------

### Install

    bower install https://github.com/Netuitive/kbn#master


### Production Build

    gulp production


Testing KBN
------------

    gulp


Using KBN
----------

### API

* The below command will attempt to find a unit based on a given string.

        kbn.findUnitFormat(unit)

* The below command will scale the given value by the given unit, round to 4 significant digits, and return a string representation of the value with the scaled units.

        kbn.formatValue(value, unit)

### Supported Units

Supported unit codes recognized by the formatValue api call:

#### General

| Code | Unit |
|------|------|
| short | short |
| percent | percent (0-100) |
| percentunit | percent (0.0-1.0) |
| humidity | Humidity (%H) |
| ppm | ppm |
| dB | decibel |

#### Data

| Code | Unit |
|------|------|
| bits | bits |
| bytes | bytes |
| kbytes | kilobytes |
| mbytes | megabytes |
| gbytes | gigabytes |

#### Data Rate

| Code | Unit |
|------|------|
| pps | packets/sec |
| bps | bits/sec |
| Bps | bytes/sec |
| kBps | kilobytes/sec |
| mBps | megabytes/sec |
| gBps | gigabytes/sec |

#### Time

| Code | Unit |
|------|------|
| hertz | Hertz (1/s) |
| ns | nanoseconds (ns) |
| µs | microseconds (µs) |
| ms | milliseconds (ms) |
| s | seconds (s) |
| m | minutes (m) |
| hours | (h) |
| d | days (d) |

#### Throughput

| Code | Unit |
|------|------|
| ops | ops/sec (ops) |
| rps | reads/sec (rps) |
| wps | writes/sec (wps) |
| iops | I/O ops/sec (iops) |

#### Memory

| Code | Unit |
|------|------|
| fps | faults/sec (fps) |
| Pps | pages/sec (Pps) |

#### Currency

| Code | Unit |
|------|------|
| currencyUSD | Dollars ($) |
| currencyGBP | Pounds (£) |
| currencyEUR | Euro (€) |
| currencyJPY | Yen (¥) |

#### Length

| Code | Unit |
|------|------|
| lengthmm | millimetre (mm) |
| lengthm | meter (m) |
| lengthkm | kilometer (km) |
| lengthmi | mile (mi) |

#### Velocity

| Code | Unit |
|------|------|
| velocityms | m/s |
| velocitykmh | km/h |
| velocitymph | mph |
| velocityknot | knot (kn) |

#### Volume

| Code | Unit |
|------|------|
| mlitre | millilitre |
| litre | litre |
| m3 | cubic metre |

#### Energy

| Code | Unit |
|------|------|
| watt | watt (W) |
| kwatt | kilowatt (kW) |
| watth | watt-hour (Wh) |
| kwatth | kilowatt-hour (kWh) |
| joule | joule (J) |
| ev | electron volt (eV) |
| amp | Ampere (A) |
| volt | Volt (V) |

#### Temperature

| Code | Unit |
|------|------|
| celsius | Celcius (°C)  |
| farenheit | Farenheit (°F) |
| kelvin | Kelvin (K) |

#### Pressure

| Code | Unit |
|------|------|
| pressurembar | Millibars |
| pressurehpa | Hectopascals |
| pressurehg | Inches of mercury |
| pressurepsi | PSI |

Additional Information
-----------------------

KBN was originally imported from [Graphana](https://github.com/grafana/grafana/blob/8ee0e5d11f8427b5a68aab69c73c6d4809bdf5bb/public/app/core/utils/kbn.js).
