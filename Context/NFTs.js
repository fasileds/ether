import React,{useState,useEffect,useContext,createContext} from "react";

import axios from "axios";

import {
    useAddress,
    useContract,
    useMetamask,
    useDisconnect,
    useSigner,
} from "@thirdweb-dev/react"
import { Contract, ethers } from "ethers";
const SateContext = createContext()
export const StateContextProvider= ({children})=>{
    const {contract}= useContract(
        "0x4C4363EbBCE8d6dEd25372c68B63642Bb8b9a972"
    )
    
 const address = useAddress();
 const connect = useMetamask()

 const disconect = useDisconnect()
 const signer=useSigner()
 const [userBalance,setUserBalance]= useState()
 const [loding,setloding]= useState(false)

 const fechData = async()=>{
    try {
        const balance  = await signer?.getBalance()
        const userBalance = address?ethers.utils.formatEther(balance?.toString()):""
        setUserBalance(userBalance)
    } catch(error) {
        console.log(error)
    }

 }

 useEffect(()=>{
    fechData()
 },[])

 const uplodeImage= async(imageInfo)=>{
    const {title,description,emaile,catagori,image}=imageInfo
    try {
        const listingPrice = await contract.call("listtingPrice")
        const createNFTs= await Contract.call(
            "uploadIPFS",
            [address,image,title,description,emaile,catagori],
            {
                value:listingPrice.toString(),
            }
        );
        const respons = await axios({
            method:"POST",
            url:`/api/v1/NFTs`,
            data:{
                title:title,
                description:description,
                catagori:catagori,
                image:image,
                address:address,
                emaile:emaile,

            },
        })
        console.log(respons);
        console.info("contract call succesfully")
        setloding(false)
        window.location.reload()
    } catch (error) {
    console.log(error)
        
    }
 }

 //get contract data
 const getUplodeDtata=async()=>{
    const image = await Contract.call("getAllNFTs")
    //total uplode
    const totalUplode = await Contract.call("imageCount")
    //listing price
    const listingPrice = await Contract.call("listingPrice")
    const allImages = image.map((image,i)=>({
        owner:image.creator,
        title:image.title,
        description:image.description,
        emaile:image.emaile,
        catagori:image.catagori,
        fundraised:image.fundraised,
        image:image.image,
        imageId:image.id.toNumber(),
        createdAt:image.timestamp.toNumber(),
        listedAmount : ethers.utils.formatEther(listingPrice.toString()),
        totalUplode:totalUplode.toNumber(),

    }))
     return allImages
 }

//get single image
 const singeleImage= async(id)=>{
    try {
        const data = await contract.call("getImage",[id])
        const image = {
            title:data[0],
            description:data[1],
            emaile:data[2],
            catagori:data[3],
            fundraised:ethers.utils.formatEther(data[4].toString()),
            creator:data[5],
            imageURL:data[6],
            createdAt:data[7].toNumber(),
            imageId:data[8].toNumber(),

        }
        return image
    } catch (error) {
        console.log(error)
    }
 }


 const donateFund =  async ({amount,id})=>{
 try {
    const transaction = await Contract.call("donateToImage",[id],{
        value:amount.toString(),

    })
    console.log(transaction);
    window.location.reload()
 } catch (error) {
    console.log(error)
 }
 }
 //get api data
 const getAllNftsApi = async()=>{
    const respons = await axios({
        method:"GET",
        URL:"/api/v1/NFTs",
    })

 }

 //single nft 
 const getSingleNftsApi= async(id)=>{
    const responce = await axios({
        method:"GET",
        url:`/api/v1/NFTs${id}`
    })
    console.log(responce)
 }


 return(
    <SateContext.Provider
    value={{
        address,
        contract,
        connect,
        disconect,
        userBalance,
        setloding,
        loding,
        uplodeImage,
        getUplodeDtata,
        donateFund,
        singeleImage,
        getAllNftsApi,
        getSingleNftsApi,
    }}>
        {children}
    </SateContext.Provider>

 )
}
export const useStateContext = ()=> useContext(SateContext)


