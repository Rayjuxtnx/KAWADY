import { cookies } from 'next/headers';
import { getImages, verifyPassword } from './actions';
import { ImageUploader } from './image-uploader';
import { Login } from './login';

export const metadata = {
    title: 'Admin Dashboard',
    robots: 'noindex, nofollow',
};

export default async function AdminPage() {
    const cookieStore = cookies();
    const password = cookieStore.get('admin-password')?.value || '';
    const isAuthenticated = await verifyPassword(password);

    if (!isAuthenticated) {
        return <Login />;
    }
    
    // Fetch images on the server and pass them to the client component
    const images = await getImages();

    return (
        <div className="container max-w-7xl py-12">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <ImageUploader initialImages={images} />
        </div>
    );
}
