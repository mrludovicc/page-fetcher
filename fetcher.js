const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const args = process.argv.slice(2);

request(args[0], (error, response, body) => {
  if (!args[0] || !args[1]) {
    return false;
  }
  if (error) {
    console.log(error)
    process.exit()
  }
  if (!response) {
    console.log('No response')

  }
  const content = body;

  if (fs.existsSync(args[1])) {
    rl.question("file exists: would you like to overwrite? ", (answer) => {
      if (answer.toLowerCase() !== 'y') {
        rl.close()
        process.exit()
      } else {
        writeFile(args[1], content)
      }
    })
  } else {
    writeFile(args[1], content)
  }
})
const writeFile = (local, content) => {
  fs.writeFile(local, content, err => {
    if (err) {
      console.error(err);
      process.exit()
    }
    const stats = fs.statSync(local)
    const size = stats.size;
    console.log(`Downloaded and saved ${size} bytes to ${local}`)
    process.exit()
  });
}
