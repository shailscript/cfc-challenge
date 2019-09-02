/* Author: Shailendra Shukla (shailendrashuklapro@gmail.com)
 * Project: [Cohort 4]Code for Canada skills challenge 2019 - Web Developers
 */

const fs = require('fs');
const R = require('ramda');

const csvData = fs.readFileSync('data.csv', 'utf-8')
                .split('/n')    
                .map(line => line.split('\n'))[0]
                .map(line => line.replace('\r', ""))
                .map(line => line.split(','));

const keys = csvData[0];
const rawData = csvData.slice(1);

const allViolations = rawData.map(values => R.zipObj(keys, values))
                             .map(obj => {
                                    obj.violation_date = new Date(obj.violation_date);
                                    return obj;
                                 });

const sortByViolationCategory = R.groupBy(x => x.violation_category);

const violationsByCategory = sortByViolationCategory(allViolations);

const diffDate = (a, b) => a.violation_date - b.violation_date;

const sortByDate = R.sort(diffDate);

const violationsByDate = R.map(sortByDate, violationsByCategory);

Object.keys(violationsByDate).map((key) => {
    console.log(`Category: ${key} \nTotal Violations: ${violationsByDate[key].length}`);
    console.log(`Earliest violation date: ${violationsByDate[key][0].violation_date}`);
    console.log(`Latest violation date: ${violationsByDate[key][violationsByDate[key].length-1].violation_date}\n\n`);
});
