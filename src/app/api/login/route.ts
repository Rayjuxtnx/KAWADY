import { NextResponse } from 'next/server';
import { verifyPassword } from '@/app/admin/actions';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const isValid = await verifyPassword(password);

    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    // Set a cookie that the server-side page can read
    response.cookies.set('admin-password', password, {
      httpOnly: true, // Make it httpOnly for better security
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred.' }, { status: 500 });
  }
}