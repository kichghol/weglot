const freeSchedule = require('../src/index.js');
const fs = require("fs");
const testing = './data/'

// const content = fs.readFileSync(process.cwd() + "/data/input1.txt");


it('adds 1 + 2 to equal 3', () => {
    fs.readdir(testing ,(error,files)=> {
			if(error){
				
				console.log(error);
			}
		const	inPutFiles= files.slice(5)
		const	outPutFiles= files.slice(-5)
			for (const i= 0; i< 5 ; i++) {
				const file = inPutFiles[i]
				const outPutFile = fs.readFileSync(process.cwd() + "/data/"+outPutFiles[i]);
				const outPut = outPutFile.toString().split("\r\n")
				const content = fs.readFileSync(process.cwd() + "/data/"+file);
				const schedules = content.toString().split("\r\n")
				expect(freeSchedule(schedules)).toBe(outPut[0])
			};
		});
  });

