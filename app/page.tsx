import SearchWidget from '../components/search-widget';
import ApiSearchWidget from '../components/api-search-widget';

export default function Home() {
    return (
        <main className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8">
                My Search Engine
            </h1>
            <div className="mb-12">
                <h2 className="text-xl mb-4 text-center">Widget Search</h2>
                <SearchWidget />
            </div>
            <div>
                <h2 className="text-xl mb-4 text-center">API Search</h2>
                <ApiSearchWidget />
            </div>
        </main>
    );
}