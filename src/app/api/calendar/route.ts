import {calendarFile} from '@/lib/calendar';
export function GET(){return new Response(calendarFile(),{headers:{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="wedding-reception.ics"','X-Content-Type-Options':'nosniff'}});}
