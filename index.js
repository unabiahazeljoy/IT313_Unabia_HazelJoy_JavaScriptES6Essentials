import isPassing, { computeAverage } from './gradeUtils.js';

const enrollees = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

function getEnrollees(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
}

async function generateReport() {
    try{
        const data = await getEnrollees();

        const reportData = data.map(({name, prelim, midterm, final}) => {
            const average = computeAverage(prelim, midterm, final);
            const status = isPassing(average);
            return { name, average, status };
        });

        const passingList = reportData.filter(s => s.status === "PASSING");

        const totalAvg = reportData.reduce((sum,student) => {
            return sum + student.average;
        }, 0);
        const classAvg = totalAvg / reportData.length;

        console.log("=== IT313 Enrollment Eligibility Report ===");
        reportData.forEach(s =>{
            console.log(`${s.name} - Average: ${s.average.toFixed(2)} - Status: ${s.status}`);
        });
        console.log(`Class Average: ${classAvg.toFixed(2)}`);
        console.log(`Passing: ${passingList.length}/${reportData.length}`);

    } catch (error) {
        console.log("Connection error: Could not load enrollee data.");
    }
}

generateReport();