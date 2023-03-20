const main = async () => {

  const payCampaignFee = 3 
  const NeftexFund = await hre.ethers.getContractFactory('NeftexFund'); 
  const neftexfund  = await NeftexFund .deploy(payCampaignFee);

  await neftexfund .deployed();

 

  console.log("NeftexFund  deployed to:", neftexfund .address);
  
  console.log('Sleeping.....')
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(40000)

  // Verify the contract after deploying
  await hre.run('verify:verify', {
    address: neftexfund.address,
    constructorArguments: [payCampaignFee],
  }) 
  
}


  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
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
