import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal';
import { providers, Contract } from 'ethers';
import { useEffect,useRef, useState } from 'react';
import {WHITELIST_CONTRACT_ADDRESS, abi} from '../constants/index'

export default function Home() {

  const [walletConnected, setWalletConnected] = useState(false);

  const [joinedWhitelist, setJoinedWhitelist] = useState(false);

  const [loading , SetLoading] = useState(false);

  const [numberofWhitelisted, setNumberofWhiteliseted] = useState(0);

  const web3ModalRef = useRef();

 
 


  const getProviderOrSigner = async (needSigner = false) =>{

    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);



    const { chainId}  = await web3Provider.getNetwork();
    if( chainId !== 4) {
     window.alert(" network need to change  Found ")
     throw new Error("please change network to rinkeby  ");
    }


  if(needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }

  return web3Provider;

  }


  const addAddressToWhitelist = async () =>{

    try{
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(WHITELIST_CONTRACT_ADDRESS
        ,abi,
        signer);

        const tx = await whitelistContract.addAddressWhitelist();
        SetLoading(true);

        await tx.wait();
        SetLoading(false);

        await getNumberOfWhitelisted();
        setJoinedWhitelist(true);

    }catch(err){
      console.log(err);

    }

  };

  const getNumberOfWhitelisted = async () =>{
    try{
      const provider = await getProviderOrSigner();

      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );

      const _numberofWhitelisted = await whitelistContract.numAddressWhitelisted();
      setNumberofWhiteliseted(_numberofWhitelisted);

    }catch(err){
      console.error(err);
    }

  }

  const checkIfAdressInWhitelist = async () =>{

    try{

      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      )
        const address = await signer.getAddress();
        const _joinedWhitelist = await whitelistContract.whitelistedAddress(
          address
        );
        setJoinedWhitelist(_joinedWhitelist);
    }catch(err){
      console.error(err)
    }
  }


  const connectWallet = async () =>{
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAdressInWhitelist()
      getNumberOfWhitelisted()
    } catch(err) {
      console.error(err)
    }
  }



  const renderButton = () =>{
    if(walletConnected){
      if(joinedWhitelist){
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist
          </div>
        )
      } else if (loading){
        return (
          <button className={styles.button}>Loading...</button>
        )
      } else{
        return(
          <button onClick={addAddressToWhitelist} className={styles.button}>
            Join the Whitelist
          </button>
        )
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      )
    }
  } 


  useEffect(()=>{
    if(!walletConnected){
      web3ModalRef.current = new Web3Modal({
        network:"rinkeby",
        providerOptions:{},
        disableInjectedProvider: false,

      })
      connectWallet()
    }
  },[walletConnected])

  return(
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name='description' content='Whitelist-Dapp'/>
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
              Its an Nft Collection for Developers in Crypto .

          </div>
          <div>
            {numberofWhitelisted} have already joined the Whitelist
          </div>
         {renderButton()}
        </div>
        <div>
          <img className={styles.name} src="./crypto-devs.svg"/>
        </div>
      </div>
      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>

    </div>
  )

}
