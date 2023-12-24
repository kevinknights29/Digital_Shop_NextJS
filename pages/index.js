import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <Link href="/about">
                <span>About Us</span>
            </Link>
        </div>
    );
}