import type {Metadata,Viewport} from 'next';
import {wedding,eventTitle,eventDescription,receptionDate} from '@/lib/wedding-config';
import './globals.css';
const socialDescription=`Join us for the wedding reception of ${wedding.couple.groomDisplay} & ${wedding.couple.bride} on ${receptionDate} at ${wedding.venue.name}, Kerala.`;
export const metadata:Metadata={
  metadataBase:new URL(wedding.websiteUrl),
  applicationName:'Mohammed Mishal & Sidhra Wedding Invitation',
  title:eventTitle,
  description:socialDescription,
  alternates:{canonical:'/'},
  openGraph:{
    title:eventTitle,
    description:socialDescription,
    type:'website',
    url:'/',
    siteName:'Mohammed Mishal & Sidhra Wedding Invitation',
    locale:'en_IN',
    images:[{url:'/opengraph-image',width:1200,height:630,alt:`Wedding reception invitation for ${wedding.couple.groomDisplay} and ${wedding.couple.bride}`}],
  },
  twitter:{
    card:'summary_large_image',
    title:eventTitle,
    description:socialDescription,
    images:[{url:'/opengraph-image',alt:`Wedding reception invitation for ${wedding.couple.groomDisplay} and ${wedding.couple.bride}`}],
  },
  robots:{index:true,follow:true},
};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:wedding.theme.emerald};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
