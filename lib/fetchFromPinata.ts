export async function fetchFromPinata(cid: string) {
    const ipfsResp = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
    // console.log(ipfsResp)
    const ipfsData = await ipfsResp.json();
    // console.log(ipfsData)
    return ipfsData
}