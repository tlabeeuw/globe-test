# Spinning Globes

Playing around with spinning Globes.

## Development

1. Run `npm install`.
1. Run `grunt` to run all the build process whenever a change occurs.
1. Go to [http://localhost:9000/_SpecRunner.html](http://localhost:9000/_SpecRunner.html) to run the tests.
1. Run `npm start` to run the app on [http://localhost:3000](http://localhost:3000).

### Other Grunt commands

* `grunt build`: Does a one time build. Same as `grunt concurrent:dev` but does not watch for changes.
* `grunt test`: To run JSHint and the Jasmine specs on PhantomJS. Must have a sever running with `grunt connect:specs:keepalive`.

  > Note: The tests do not currently work in PhantomJS, only in the browser due to the heavy usage of WebGL

## Production

### CloundFoundry

```bash
cf push globe-test -m 512
```
