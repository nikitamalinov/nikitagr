function connect() {
  if(window.ethereum) {
    window.ethereum.request({method: 'eth_requestAccounts'})
    .then(result => {
      
      accountChangedHandler(result[0]);

    })

  } else {
    window.open("https://metamask.io/", "_blank")
    
   
  }
}

const accountChangedHandler = (newAccount) => {
  let btn = document.getElementById("connectWallet")
  if (ethereum.chainId != 1){
    btn.innerHTML = "Please change to Eth Network"
  }
  else
  {
    btn.innerHTML = "ETH | " + newAccount.substring(0,6) + "..." + newAccount.slice(-4); //display the network too 
  }
  btn.classList.remove("connect-wallet")
  btn.classList.add("connected-wallet")
}




//make then stay on the USDC chain
ethereum.on('chainChanged', (_chainId) => window.location.reload());


