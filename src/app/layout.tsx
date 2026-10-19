import type {Metadata,Viewport} from 'next';
import {wedding,eventTitle,eventDescription,receptionDate} from '@/lib/wedding-config';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(wedding.websiteUrl),title:eventTitle,description:`${eventDescription} ${receptionDate} at ${wedding.venue.name}, Kerala.`,alternates:{canonical:'/'},openGraph:{title:eventTitle,description:`${receptionDate} · ${wedding.venue.name} · With love, faith & togetherness`,type:'website',url:'/',images:[{url:'/opengraph-image',width:1200,height:630}]},twitter:{card:'summary_large_image',title:eventTitle,images:['/opengraph-image']}};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:wedding.theme.emerald};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
