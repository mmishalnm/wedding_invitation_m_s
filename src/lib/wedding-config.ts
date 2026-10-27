export const wedding = {
  couple: {groom:'Mohammed Mishal N M',groomDisplay:'Mohammed Mishal',bride:'Sidhra',short:'Mohammed Mishal N M & Sidhra',initials:'M & S'},
  hosts:'MR. MUNAVIRUDHEEN N M & MRS. RAFEENA P K',
  hostAddress:'Nambipunnilath House, Padiyoor P.O., Thrissur – 680688',
  groomFamily:[{names:'Mr. Mohammed N K (Late) & Mrs. Kadheeja (Late)',address:'Nambipunnilath House, Padiyoor, Irinjalakuda'},{names:'Mr. Kareem (Late) & Mrs. Aleema',address:'Pottekattil House, Edayakkunnam, Cheranalloor'}],
  brideFamily:{names:'Mr. Nasar & Mrs. Sufeera',address:'Kodamangalthel House, Veliyankode, Malapuram'},
  nikah:{date:'2026-12-27',hijri:'18 Rajab 1448 AH',locallyConfirmed:false},
  reception:{start:'2026-12-29T11:30:00+05:30',end:'2026-12-29T14:30:00+05:30',timezone:'Asia/Kolkata'},
  venue:{name:'KKMS Auditorium',address:'Valavanangadi, Padiyoor, Thrissur, Kerala',maps:'https://maps.app.goo.gl/8jTQ4SJYr3kn5srj9'},
  regards:['Shameer Musthafa','Fathima Maharban','Aysha','Aami'],contacts:['+91 9846074348','+91 9645528280'],
  websiteUrl:process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  audioUrl:process.env.NEXT_PUBLIC_AUDIO_URL || '',
  theme:{emerald:'#234F43',gold:'#B58627',ivory:'#FFFDF9',champagne:'#F5EFE4',sage:'#66806D'},
};
export const eventTitle = `Wedding Reception – ${wedding.couple.short}`;
export const eventDescription = `You are cordially invited to celebrate the wedding reception of ${wedding.couple.groom} and ${wedding.couple.bride}.`;
export const receptionDate = new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:wedding.reception.timezone}).format(new Date(wedding.reception.start));
export const receptionDay = new Intl.DateTimeFormat('en-GB',{weekday:'long',timeZone:wedding.reception.timezone}).format(new Date(wedding.reception.start));
export const receptionTime = [wedding.reception.start,wedding.reception.end].map(d=>new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:wedding.reception.timezone}).format(new Date(d))).join(' – ');
export function cleanGuest(value:string){return value.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g,'').trim().slice(0,80);}
