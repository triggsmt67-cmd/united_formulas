import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import Navbar from '@/components/Navbar';
import SDSList from '@/components/SDSList';
import { ProductNode } from '@/types';
import { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Safety Data Sheets (SDS) | Technical Documentation | United Formulas',
    description: 'Access our complete library of Safety Data Sheets (SDS) and TDS documentation for United Formulas industrial chemicals. High-performance compliance data from Great Falls & Billings, MT.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GET_SDS_PRODUCTS = gql`
  query GetSDSProducts {
    products(first: 100) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
        productData {
          sdssheet
        }
      }
    }
  }
`;

export default async function SDSPage() {
    let products: ProductNode[] = [];

    try {
        const { data } = await client.query<{ products: { nodes: any[] } }>({
            query: GET_SDS_PRODUCTS,
            fetchPolicy: 'no-cache',
        });

        // Fetch all products and normalize the data
        const nodes = data?.products?.nodes || [];

        products = nodes.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            image: p.image,
            productData: {
                sdssheet: p.productData?.sdssheet || null
            }
        })) as ProductNode[];

    } catch (error) {
        console.error('Error fetching SDS products:', error);
    }

    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-24 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Header */}
                <div className="pt-16 pb-20 border-b border-slate-100 mb-20 relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-cyan-50/50 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                            Compliance Documentation
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-none">
                            Safety Data <span className="text-slate-400">Sheets</span>
                        </h1>
                        <div className="h-2 w-32 bg-slate-900 rounded-full mb-8"></div>
                        <p className="max-w-2xl text-xl text-slate-500 leading-relaxed font-medium">
                            Access our full library of SDS and TDS documentation for your industrial chemical compliance. Every formula we ship includes audit-ready technical data.
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <SDSList products={products} />

                {/* Support Section */}
                <div className="mt-32 p-12 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:30px_30px]"></div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Can't find a document?</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Our technical support team is standing by in Great Falls and Billings to assist with specific formulation data or compliance audits.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-end">
                            <a
                                href="/contact"
                                className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-cyan-400 transition-colors text-center"
                            >
                                Contact Support
                            </a>
                            <a
                                href="tel:4067274144"
                                className="px-8 py-4 bg-slate-800 text-white rounded-xl font-bold border border-slate-700 hover:border-slate-500 transition-colors text-center"
                            >
                                Call 406.727.4144
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
