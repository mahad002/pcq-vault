
"use client";

import { useEffect, useRef, useState } from 'react';

export default function CalculateResults(mappedResults: any) {
  console.log('mappedResults', mappedResults.mappedResults);
  const lines = calcline(mappedResults.mappedResults);
  const detectedAlgoTable = getAlgoTable(mappedResults.mappedResults);
  const detectedAlgoCount = getAlgoCount(mappedResults.mappedResults);
  const riskLevels = getRiskLevels(detectedAlgoTable);
  const grade = grades(riskLevels);
  const detectedAlgo = algoDetected(detectedAlgoTable);
  const vulnerability = vulnerabilityDetected(riskLevels);
  const files = calcFiles(mappedResults.mappedResults);
  const card = { detectedAlgo, grade, vulnerability, lines, files };
  const results = { detectedAlgoCount, detectedAlgoTable, riskLevels, card };

  const email = localStorage.getItem('username');

  // useRef ensures that it persists across renders
  const hasExecuted = useRef(false);

  useEffect(() => {
    const url = localStorage.getItem('url');
    console.log('URL: ', url);

    // Ensure the block only runs once
    if (!hasExecuted.current && email) {
      hasExecuted.current = true; // Mark as executed so it doesn't run again

      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!url) {
        console.log('Storing Code Analysis');

        const apiUrl = `${baseUrl}/api/users/code-analysis`;
        const analysisResult = results;

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, codeSnippet: mappedResults, analysisResult }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Code analysis result added', data);
          })
          .catch(error => {
            console.error('Error adding code analysis result', error);
          });
      } else {
        console.log('Storing Repository Analysis');

        const apiUrl = `${baseUrl}/api/users/github-repo-analysis`;

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, repoUrl: url, findings: results }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Repository analysis result added', data);
            localStorage.removeItem('url'); // Remove URL after processing
          })
          .catch(error => {
            console.error('Error adding repository analysis result', error);
          });
      }
    }
  }, [email, mappedResults, results]); // Dependencies ensure correct values are used

  return { detectedAlgoCount, detectedAlgoTable, riskLevels, card };
}

function calcFiles(mappedResults: any) {
  console.log("mappedResults",mappedResults.length)
  return mappedResults.length
}
function calcline(mappedResults: any) {
  console.log("mappedResults",mappedResults)
  let lines = 0;
  for (const item of mappedResults) {
    lines += item.lines;
  }
  console.log("lines",lines)
  return lines;
}


function vulnerabilityDetected(riskLevels: any) {
  console.log("riskLevels", riskLevels);

  const { preQ, postQ } = riskLevels;

  const PreQRisk = preQ.high > 0 ? "Yes" : "No";
  const PostQRisk = postQ.high > 0 ? "Yes" : "No";

  console.log("PreQRisk", PreQRisk);
  console.log("PostQRisk", PostQRisk);
  return { PreQRisk, PostQRisk };
}

function algoDetected(mappedResults: any) {
  console.log("mappedResults",mappedResults)
  let preQDetected = "No";
  let postQDetected = "No";

  for (const item of mappedResults) {
    if (item.type === "PQC_PKE" || item.type === "PQC_Sig") {
      postQDetected = "Yes";
    } else {
      preQDetected = "Yes";
    }
  }
  console.log("preQDetected", preQDetected, postQDetected);
  return { preQDetected, postQDetected };
}


interface RiskLevels {
  preQ: {
    low: number;
    medium: number;
    high: number;
  };
  postQ: {
    low: number;
    medium: number;
    high: number;
  };
}

function grades(risks: RiskLevels) {
  console.log("risks", risks);
  const { preQ, postQ } = risks;

  const low = preQ.low || 0;
  const medium = preQ.medium || 0;
  const high = preQ.high || 0;

  const lowPost = postQ.low || 0;
  const mediumPost = postQ.medium || 0;
  const highPost = postQ.high || 0;

  const score = (((0.9 * low) + (0.8 * medium) + (0.1 * high)) / (low + medium + high)) * 100;
  const scorePost = (((0.9 * lowPost) + (0.8 * mediumPost) + (0.1 * highPost)) / (lowPost + mediumPost + highPost)) * 100;

  const gradePre = getGrade(score);
  const gradePost = getGrade(scorePost);

  console.log("gradePre", gradePre);
  console.log("gradePost", gradePost);
  return { gradePre, gradePost };
}



const checkSecurityType = (score: number, flag: boolean) => {
    let high = 0;
    let medium = 0;
    let low = 0;
    if (flag === true) {
      if (score <= 127) {
        return 'high';
      } else if (score <= 191) {
        return 'medium';
      } else if (score <= 256) {
        return 'low';
      }
    } else {
      if (score <= 127) {
        high++;
      } else if (score <= 191) {
        medium++;
      } else if (score <= 256) {
        low++;
      }
    }
  };

  const getGrade = (score: number) => {
    const gradeBoundaries = [
      { score: 95, grade: 'A+' },
      { score: 90, grade: 'A' },
      { score: 85, grade: 'B+' },
      { score: 80, grade: 'B' },
      { score: 75, grade: 'C+' },
      { score: 70, grade: 'C' },
      { score: 65, grade: 'D+' },
      { score: 60, grade: 'D' },
      { score: 55, grade: 'E+' },
      { score: 50, grade: 'E' },
      { score: 0, grade: 'F' },
    ];

    for (const boundary of gradeBoundaries) {
      if (score >= boundary.score) {
        return boundary.grade;
      }
    }

    return 'F';
  };
function getAlgoTable(mappedResults: any) {
    const results = [];
    console.log('mappedResults', mappedResults);
    for (const item of mappedResults) {
      for (const [key, value] of Object.entries(item.filteredResults)) {
        console.log('value', value);
        // const grade = JSON.parse(value.grade)[0];
        let grade;
        if (typeof (value as any).grade === "string") {
          grade = JSON.parse((value as any).grade)[0];
        } else {
          grade = (value as any).grade;
        }
        console.log('grade', grade);
        const algorithm = (value as any).algorithm;
        const updatedGrade = {
          ...grade,
          PreQScore: checkSecurityType(grade.PreQSecurity, true),
          PostQScore: checkSecurityType(grade.PostQSecurity, true),
        };
        results.push({
          algorithm: algorithm,
          variant: updatedGrade.Variant,
          type: updatedGrade.Type,
          filename: item.fileName,
          PreQSecurity: updatedGrade.PreQSecurity,
          PreQScore: updatedGrade.PreQScore,
          PostQSecurity: updatedGrade.PostQSecurity,
          PostQScore: updatedGrade.PostQScore,
        });
      }
    }
    console.log('results', results);

    
    
    return results;
  }

  function getAlgoCount(mappedResults: any) {
    // iterate over mappedResults and get the count of each algorithm
    const algoCount: { [key: string]: number } = {};
    for (const item of mappedResults) {
      for (const [key, value] of Object.entries(item.filteredResults)) {
        const algorithm = (value as any).algorithm;
        if (algorithm in algoCount) {
          algoCount[algorithm] += 1;
        } else {
          algoCount[algorithm] = 1;
        }
      }
    }
    console.log('algoCount', algoCount);
    return algoCount;
  }

  function getRiskLevels(mappedResults: any) {
    console.log('mappedResults', mappedResults);
    const counts = mappedResults.reduce(
      (acc: { preQ: { [x: string]: number; }; postQ: { [x: string]: number; }; }, { PreQScore, PostQScore }: any) => {
        acc.preQ[PreQScore]++;
        acc.postQ[PostQScore]++;
        return acc;
      },
      {
        preQ: { low: 0, medium: 0, high: 0 },
        postQ: { low: 0, medium: 0, high: 0 },
      }
    );
    console.log('counts', counts);
    return counts;
  }