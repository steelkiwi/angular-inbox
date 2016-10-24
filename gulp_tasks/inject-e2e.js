// Use dedicated inject task for e2e testing to exclude angular-presence config initialization
// that caused webdriver issues
const gulp = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');
const gulpInject = require('gulp-inject');

const conf = require('../conf/gulp.conf');

gulp.task('inject:e2e', inject);

function inject() {
    const injectScripts = gulp.src([
            conf.path.tmp('**/*.js'),
            `!${conf.path.tmp('**/*.spec.js')}`,
            `!${conf.path.tmp('./conf/presence.js')}`
        ])
        .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

    const injectOptions = {
        ignorePath: [conf.paths.src, conf.paths.tmp],
        addRootSlash: false
    };

    return gulp.src(conf.path.src('index.html'))
        .pipe(gulpInject(injectScripts, injectOptions))
        .pipe(wiredep(Object.assign({}, conf.wiredepDev)))
        .pipe(gulp.dest(conf.paths.tmp))
}
