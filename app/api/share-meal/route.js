// app/api/share-meal/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.json();

  // Save to database or log for now
  console.log('Received meal:', data);

  return NextResponse.json({ message: 'Meal shared successfully!' });
}
