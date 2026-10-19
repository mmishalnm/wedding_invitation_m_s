import 'server-only';
import {PKPass} from 'passkit-generator';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {wedding,receptionDate,receptionTime,eventDescription} from './wedding-config';
const required=['APPLE_PASS_TYPE_ID','APPLE_TEAM_ID','APPLE_WWDR_CERT_BASE64','APPLE_SIGNER_CERT_BASE64','APPLE_SIGNER_KEY_BASE64'] as const;
export function walletConfigured(){return required.every(k=>Boolean(process.env[k]));}
export async function makePass(){
 const decode=(key:string)=>Buffer.from(process.env[key]!, 'base64');
 const images:Record<string,Buffer>={};
 for(const name of ['icon.png','icon@2x.png','icon@3x.png','logo.png','logo@2x.png']) images[name]=await readFile(path.join(process.cwd(),'public/wallet',name));
 const pass=new PKPass(images,{wwdr:decode('APPLE_WWDR_CERT_BASE64'),signerCert:decode('APPLE_SIGNER_CERT_BASE64'),signerKey:decode('APPLE_SIGNER_KEY_BASE64'),signerKeyPassphrase:process.env.APPLE_SIGNER_KEY_PASSPHRASE},{passTypeIdentifier:process.env.APPLE_PASS_TYPE_ID!,teamIdentifier:process.env.APPLE_TEAM_ID!,serialNumber:'mishal-sidhra-reception-20261229',organizationName:wedding.couple.short,description:'Wedding reception invitation',logoText:wedding.couple.initials,backgroundColor:'rgb(18, 61, 50)',foregroundColor:'rgb(248, 244, 234)',labelColor:'rgb(197, 164, 109)'});
 pass.type='eventTicket';
 pass.primaryFields.push({key:'event',label:'WEDDING RECEPTION',value:wedding.couple.short});
 pass.secondaryFields.push({key:'date',label:'DATE',value:receptionDate},{key:'time',label:'TIME · IST',value:receptionTime});
 pass.auxiliaryFields.push({key:'venue',label:'VENUE',value:wedding.venue.name});
 pass.backFields.push({key:'couple',label:'WITH JOY & GRATITUDE',value:`${wedding.couple.groom} & ${wedding.couple.bride}`},{key:'address',label:'ADDRESS',value:wedding.venue.address},{key:'invitation',label:'INVITATION',value:eventDescription},{key:'directions',label:'DIRECTIONS',value:wedding.venue.maps},{key:'website',label:'WEBSITE',value:wedding.websiteUrl});
 pass.setRelevantDate(new Date(wedding.reception.start));pass.setExpirationDate(new Date(wedding.reception.end));
 pass.setBarcodes({format:'PKBarcodeFormatQR',message:wedding.websiteUrl,messageEncoding:'iso-8859-1',altText:'Open our invitation'});
 return pass.getAsBuffer();
}
