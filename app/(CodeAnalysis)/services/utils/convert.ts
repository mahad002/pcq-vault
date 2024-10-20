import csv from 'csv-parser';
import fs from 'fs';

function convertCsvToDict(filePath:any) {
  const algorithmDict:any = {};

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const algorithm = row['Algorithm'].toLowerCase(); // Convert algorithm name to lowercase

      if (!algorithmDict[algorithm]) {
        algorithmDict[algorithm] = [];
      }

      const variant = row['Variant'] || '';
      const mode = row['Mode'] || '';
      const algType = row['Type'] || '';
      const rounds = parseInt(row['Rounds']) || 0;
      const outputSize = parseInt(row['OutputSize']) || 0;
      const blockSize = parseInt(row['BlockSize']) || 0;
      const preqSecurity = parseInt(row['PreQSecurity']) || 0;
      const preqScore = parseFloat(row['PreQ-Score']) || 0;
      const postqSecurity = parseInt(row['PostQSecurity']) || 0;
      const postqScore = parseFloat(row['PostQ-Score']) || 0;

      algorithmDict[algorithm].push({
        Variant: variant,
        Mode: mode,
        Type: algType,
        Rounds: rounds,
        OutputSize: outputSize,
        BlockSize: blockSize,
        PreQSecurity: preqSecurity,
        'PreQ-Score': preqScore,
        PostQSecurity: postqSecurity,
        'PostQ-Score': postqScore,
      });
    })
    .on('end', () => {
      console.log(algorithmDict); // Do something with the converted dictionary
    });
}




