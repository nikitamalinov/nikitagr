function connect() {
  if(window.ethereum) {
    window.ethereum.request({method: 'eth_requestAccounts'})
    .then(result => {
      accountChangedHandler(result[0]);
    })

  } else {
    console.log('Install MetaMask');
  }
}

const accountChangedHandler = (newAccount) => {
  console.log("new acc: " + newAccount)
}
