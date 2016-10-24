const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('inject', gulp.series(gulp.parallel('styles', 'scripts'), 'inject'));
gulp.task('build:e2e', gulp.series('partials', 'styles', 'scripts', 'inject:e2e', 'other', 'build'));
gulp.task('build', gulp.series('partials', gulp.parallel('inject', 'other'), 'build'));
gulp.task('test', gulp.series('scripts', 'karma:single-run'));
gulp.task('test:auto', gulp.series('watch', 'karma:auto-run'));
gulp.task('test:unit', gulp.series('scripts', 'karma:single-run'));
gulp.task('test:e2e', gulp.series('clean', 'build:e2e', 'protractor:chrome'));
gulp.task('test:e2e:headless', gulp.series('clean', 'build:e2e', 'protractor:phantomjs'));
gulp.task('serve', gulp.series('inject', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function reloadBrowserSync(cb) {
    browserSync.reload();
    cb();
}

function watch(done) {
    gulp.watch([
        conf.path.src('index.html'),
        'bower.json'
    ], gulp.parallel('inject'));

    gulp.watch(conf.path.src('components/**/*.html'), reloadBrowserSync);
    gulp.watch([
        conf.path.src('**/*.less'),
        conf.path.src('**/*.css')
    ], gulp.series('styles'));
    gulp.watch(conf.path.src('**/*.js'), gulp.series('inject'));
    done();
}
