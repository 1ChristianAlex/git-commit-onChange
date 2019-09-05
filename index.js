const { exec } = require('child_process');
const chokidar = require('chokidar');
const argv = require('yargs').argv;

const ArgvPath = argv.path;
const ticketN = argv.t;
const watcher = chokidar.watch(ArgvPath, {
  ignored: /.git/
});

const goToDirCommit = () => {
  exec(`cd ${ArgvPath}`, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    exec('git add .', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      exec(`git commit -m "${ticketN} - Modification"`, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
    });
  });
};

watcher
  .on('change', path => {
    goToDirCommit();

    console.log(`File ${path} has been changed`);
  })
  .on('unlink', path => {
    goToDirCommit();

    console.log(`File ${path} has been removed`);
  });
console.log(ArgvPath, ticketN);
