import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as z from 'zod';

const prisma = new PrismaClient();

const formSchema = z.object({
  name: z.string().min(2),
  gender: z.string().min(1),
  city: z.string().min(1), // Now stored in DB
  dob: z.string().min(1),  // Will be converted to Date
  phone: z.string()
    .min(10)
    .regex(/^[+]?\d[0-9\s\-()]+$/),
  email: z.string().email(),
  linkedin: z.string().url(),
  country: z.string().min(1), // Added country as required
});

function isPrismaKnownError(error: unknown): error is { code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const {
      name,
      gender,
      dob,
      phone,
      email,
      city,
      country,
      linkedin: linkedinProfile,
    } = validatedData;

    const dobDate = new Date(dob);

    const newUser = await prisma.user.create({
      data: {
        name,
        gender,
        dob: dobDate,
        phone,
        email,
        city,
        country,
        linkedinProfile,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', issues: error.errors },
        { status: 400 }
      );
    }
  
    if (isPrismaKnownError(error) && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with this phone or email already exists' },
        { status: 409 }
      );
    }
  
    console.error('Internal Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
