const gulp = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const { series, parallel } = require('gulp')
const del = require('del')


// gulp.task('default', (done) => {
//     console.log('default task')
//     done()
// })
// 清除
async function cleanTask () {
    await del.sync('build')
}

// 解析less
function lessTask () {
    return gulp.src('src/**/*.less')
        .pipe(less()) // less转换成css 
        .pipe(autoprefixer({
            cascade: false
        })) // 补全css
        .pipe(cleanCss()) // 压缩css
        .pipe(gulp.dest('build'))
}

async function defaultTask () {
    await console.log('default task2')
}

function build (done) {
    gulp.src(['src/**/*'])
        .pipe(gulp.dest('build'))
    done()
}

const seriesTask = series(cleanTask, lessTask, defaultTask) 
function watchTask (done) {

    const watcher = gulp.watch('src/**/*', seriesTask);

    watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
    });
    
    watcher.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
    });
    
    watcher.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
    });
    
    // watcher.close();
    done()
}

exports.default = defaultTask
exports.build = series(cleanTask, lessTask, defaultTask) 
exports.watch = watchTask