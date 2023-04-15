async function main() {

    // make an API call to the ABIs endpoint 
    const response = await fetch('https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0x5FbDB2315678afecb367f032d93F642f64180aa3&apikey=5UBK3J6WT9WCJ2NZCYHZ53GB69P81TA3V8');
    const data = await response.json();

    // print the JSON response 
    let abi = data.result;
    console.log(abi);
}

main();