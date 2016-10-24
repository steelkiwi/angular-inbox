'use strict'

const path = require('path');
const conf = require('../conf/gulp.conf');
const gulp = require('gulp');
const angularProtractor = require('gulp-angular-protractor');
const e2eTestsPaths = [conf.path.e2e('**/*.js')];
const webserverConf =  require('../conf/gulp-webserver.conf');
const webserver = require('gulp-webserver');

let webserverStream;

gulp.task('protractor:chrome', protractorChrome);
gulp.task('protractor:phantomjs', protractorPhantomjs);

function protractorChrome(done) {
    const configFile = path.join('conf', 'protractor-chrome.conf.js');
    webserverStream = gulp
        .src([
                conf.paths.dist
            ])
        .pipe(webserver(webserverConf));

    gulp
        .src(e2eTestsPaths)
        .pipe(angularProtractor({
            configFile,
            debug: false,
            autoStartStopServer: true
        }))
        .on('error', e => {
            if (webserverStream && webserverStream.emit) {
                webserverStream.emit('kill');
            }
            console.error(e);
            done(new Error(e));
        })
        .on('end', () => {
            if (webserverStream && webserverStream.emit) {
                webserverStream.emit('kill');
            }
            done();
        });
}

function protractorPhantomjs(done) {
    const configFile = path.join('conf', 'protractor-phantomjs.conf.js');
    webserverStream = gulp
        .src([
                conf.paths.dist
            ])
        .pipe(webserver(webserverConf));

    gulp
        .src(e2eTestsPaths)
        .pipe(angularProtractor({
            configFile,
            debug: false,
            autoStartStopServer: true
        }))
        .on('error', e => {
            if (webserverStream && webserverStream.emit) {
                webserverStream.emit('kill');
            }
            console.error(e);
            done(new Error(e));
        })
        .on('end', () => {
            if (webserverStream && webserverStream.emit) {
                webserverStream.emit('kill');
            }
            done();
        });
}
