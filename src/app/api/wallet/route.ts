import {makePass,walletConfigured} from '@/lib/wallet';
export const runtime='nodejs';
export const dynamic='force-dynamic';
let cached:Buffer|undefined;
export async function GET(request:Request){
 if(new URL(request.url).searchParams.has('status'))return Response.json({available:walletConfigured()},{headers:{'Cache-Control':'no-store'}});
 if(!walletConfigured())return Response.json({error:'Apple Wallet is not available yet. Please save the event to your calendar instead.'},{status:503});
 try{cached??=await makePass();return new Response(new Uint8Array(cached),{headers:{'Content-Type':'application/vnd.apple.pkpass','Content-Disposition':'attachment; filename="wedding-invitation.pkpass"','Cache-Control':'private, max-age=300','X-Content-Type-Options':'nosniff'}});}catch{return Response.json({error:'We could not prepare your Wallet pass. Please use Add to Calendar.'},{status:500});}
}
