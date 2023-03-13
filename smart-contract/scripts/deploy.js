const main = async () => {

  const runFee = 3 
  const NeftexFund = await hre.ethers.getContractFactory('NeftexFund'); 
  const neftexfund  = await NeftexFund .deploy(runFee);

  await neftexfund .deployed();

 

  console.log("NeftexFund  deployed to:", neftexfund .address);
  
  
  
}


const runMain = async () =>{
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();