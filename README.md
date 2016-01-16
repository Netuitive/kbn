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


originally imported from Graphana: https://github.com/grafana/grafana/blob/8ee0e5d11f8427b5a68aab69c73c6d4809bdf5bb/public/app/core/utils/kbn.js
