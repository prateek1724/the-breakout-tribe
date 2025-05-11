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
    .regex(/^\+?[0-9\s\-()]+$/),
  email: z.string().email(),
  linkedin: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const {
      name,
      gender,
      dob,
      city,
      phone,
      email,
      linkedin: linkedinProfile,
    } = validatedData;

    const dobDate = new Date(dob);

    const newUser = await prisma.user.create({
      data: {
        name,
        gender,
        dob: dobDate,
        city,
        phone,
        email,
        linkedinProfile,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 201 }
    );

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', issues: error.errors },
        { status: 400 }
      );
    }

    if (error.code === 'P2002') {
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
