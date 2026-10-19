import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calendarFile,calendarLinks,fold} from '../src/lib/calendar';
import {cleanGuest} from '../src/lib/wedding-config';
test('event covers exactly 11:30–14:30 IST in UTC',()=>{const ics=calendarFile();assert.match(ics,/DTSTART:20261229T060000Z/);assert.match(ics,/DTEND:20261229T090000Z/);assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,1);assert.ok(ics.endsWith('\r\n'));for(const line of ics.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75)});
test('calendar providers receive matching times and venue',()=>{const google=new URL(calendarLinks().google),outlook=new URL(calendarLinks().outlook);assert.equal(google.searchParams.get('dates'),'20261229T060000Z/20261229T090000Z');assert.equal(outlook.searchParams.get('startdt'),'2026-12-29T06:00:00.000Z');assert.match(google.searchParams.get('location')!,/KKMS/)});
test('fold preserves unicode without splitting UTF-8 characters',()=>{const original='SUMMARY:'+ 'ع'.repeat(80);assert.equal(fold(original).replace(/\r\n /g,''),original);for(const line of fold(original).split('\r\n'))assert.ok(Buffer.byteLength(line)<=75)});
test('guest names remove control characters and remain bounded',()=>{assert.equal(cleanGuest('  A\u202e\nB '),'AB');assert.equal(cleanGuest('a'.repeat(100)).length,80)});
