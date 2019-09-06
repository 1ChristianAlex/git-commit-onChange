const { exec } = require('child_process');
const chokidar = require('chokidar');
const argv = require('yargs').argv;

const ArgvPath = argv.path;
const ticketN = argv.t;
const commitName = argv.cm;
const watcher = chokidar.watch(ArgvPath, {
  ignored: /.git/
});
let CommitVersion = 1;
const goToDirCommit = pathFile => {
  exec(
    `cd ${ArgvPath} & git add . & git commit -m "${ticketN} - Modification ${commitName} v${CommitVersion}" & git push origin master`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      console.log(`Commit version: V${CommitVersion}`);
      CommitVersion++;
    }
  );
};

watcher
  .on('change', path => {
    goToDirCommit(path);

    console.log(`File ${path} has been changed`);
  })
  .on('unlink', path => {
    goToDirCommit(path);

    console.log(`File ${path} has been removed`);
  })
  .on('add', path => console.log(`Loading...`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes'));
