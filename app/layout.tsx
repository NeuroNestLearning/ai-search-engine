import './globals.css';

export const metadata = {
    title: "NeuroNest: Google's Search Engine",
    description: 'A stylish search engine powered by Google',
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-black">
        {children}
        <footer className="text-center py-4 text-white font-thin">
            Created Using Google's Gen AI App Builder
        </footer>
        </body>
        </html>
    );
}